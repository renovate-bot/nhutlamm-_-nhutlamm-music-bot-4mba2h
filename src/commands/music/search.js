import {
    EmbedBuilder,
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('skip track.')
        .addStringOption((option) => option.setName('query').setDescription('Phrase to search for').setRequired(true)),
    description: {
        usage: 'search',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        await interaction.deferReply();
        let player = client.riffy.players.get(interaction.guild.id);
        const query = interaction.options.getString('query');
        const resolve = await client.riffy.resolve({ query: query, requester: interaction.member });

        const { tracks } = resolve;
        let searchResult = [];
        for (const track of tracks) {
            searchResult.push({
                name: client.utils.truncate(track.info.title, 80),
                value: track.info.uri,
                author: client.utils.truncate(track.info.author, 80),
            });
        }

        const embeds = new EmbedBuilder()
            .setColor(client.config.color.main)
            .setAuthor({ name: 'Search Results', iconURL: client.user.displayAvatarURL() })
            .setDescription(
                searchResult
                    .map((x) => `**${searchResult.indexOf(x) + 1}.** [${x.name}](${x.value}) - ${x.author}`)
                    .join('\n'),
            );

        const select = new StringSelectMenuBuilder()
            .setCustomId('search')
            .setPlaceholder('Select a song to play')
            .setMinValues(1)
            .setMaxValues(20)
            .addOptions(
                searchResult.map((info) =>
                    new StringSelectMenuOptionBuilder()
                        .setLabel(`${searchResult.indexOf(info) + 1}. ${info.name}`)
                        .setValue(info.value)
                        .setDescription(info.author),
                ),
            );

        const row = new ActionRowBuilder().addComponents(select);
        await interaction
            .editReply({
                embeds: [embeds],
                components: [row],
            })
            .then(async (msg) => {
                const filter = (i) => i.user.id === interaction.user.id;
                const collector = msg.createMessageComponentCollector({ filter, time: 60000 });
                collector.on('collect', async (i) => {
                    if (i.customId === 'search') {
                        const selectedValues = i.values;

                        if (!player) {
                            player = client.riffy.createConnection({
                                guildId: interaction.guild.id,
                                voiceChannel: interaction.member.voice.channel.id,
                                textChannel: interaction.channel.id,
                                deaf: true,
                            });
                        }

                        for (let matchTrack of selectedValues) {
                            const resultsTrack = tracks.find((x) => x.info.uri === matchTrack);
                            resultsTrack.info.requester = interaction.member;
                            player.queue.add(resultsTrack);
                        }

                        let title;
                        let thumbnail = null;

                        if (selectedValues.length > 1) {
                            title = `Added **${selectedValues.length}** tracks to queue`;
                        } else if (selectedValues.length === 1) {
                            const track = tracks.find((x) => x.info.uri === selectedValues[0]);
                            title = `Added [${track.info.title}](${track.info.uri}) to the queue`;
                            thumbnail = await track.info.thumbnail;
                        }

                        await i.update({
                            embeds: [embeds.setDescription(title).setThumbnail(thumbnail)],
                            components: [],
                        });

                        if (!player.playing && !player.paused) return player.play();
                    }
                });

                collector.on('end', async (collected) => {
                    if (collected.size === 0) {
                        await interaction.editReply({
                            embeds: [embeds.setDescription('Search was time out')],
                            components: [],
                        });
                    }
                });
            });
    },
};
