import { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play ')
        .addStringOption((option) =>
            option.setName('song').setDescription('song wueue').setAutocomplete(true).setRequired(true),
        ),
    description: {
        usage: 'play',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    autocomplete: async (interaction, client) => {
        const value = interaction.options.getFocused();
        const searchResults = await client.riffy.resolve({ query: value, requester: interaction.member });
        const { loadType, tracks } = searchResults;
        if (loadType === 'NO_MATCHES' || loadType === 'LOAD_FAILED') return await interaction.respond([]);
        if (loadType === 'SEARCH_RESULT') {
            const results = [];
            for (const track of tracks) {
                const title = client.utils.truncate(track.info.title, 30);
                const author = client.utils.truncate(track.info.author, 20);
                results.push({
                    name: `${title} (${client.utils.formatTimeMusic(track.info.length)}) - ${author}`,
                    value: track.info.uri,
                });
            }
            await interaction.respond(results);
        }
    },
    run: async (client, interaction) => {
        const songInput = interaction.options.getString('song');
        const vc = interaction.member.voice.channel;
        if (!vc) return interaction.reply('You need to be in a voice channel to use this command.');

        const player = client.riffy.createConnection({
            guildId: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            deaf: true,
        });
        const embed = new EmbedBuilder().setColor(client.config.color.main);
        const resolve = await client.riffy.resolve({ query: songInput, requester: interaction.member });
        const { loadType, tracks, playlistInfo } = resolve;

        if (loadType === 'PLAYLIST_LOADED') {
            for (const track of resolve.tracks) {
                track.info.requester = interaction.member;
                player.queue.add(track);
            }
            await interaction.reply({
                embeds: [
                    embed.setDescription(
                        `Added **${resolve.tracks.length}** tracks from [${playlistInfo.name}](${songInput})`,
                    ),
                ],
            });
            if (!player.playing && !player.paused) return player.play();
        } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
            const track = tracks.shift();
            track.info.requester = interaction.member;

            player.queue.add(track);
            const title = `[${track.info.title}](${track.info.uri})`;
            const thumbnail = await track.info.thumbnail;
            await interaction.reply({
                embeds: [embed.setDescription(`Added ${title} to the queue`).setThumbnail(thumbnail)],
            });
            if (!player.playing && !player.paused) return player.play();
        } else {
            return await interaction.reply('There are no results found.');
        }
    },
};
