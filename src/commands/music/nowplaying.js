import { EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import progressbar from 'string-progressbar';

export default {
    data: new SlashCommandBuilder().setName('nowplaying').setDescription('nowplaying.'),
    description: {
        usage: 'nowplaying',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');

        const current = player.position;
        const total = player.current.info.length;
        const bar = progressbar.splitBar(total, current, (size = 8));
        const progress = Math.round((current / total) * 100);

        const thumbnail = await player.current.info.thumbnail;
        const embed = new EmbedBuilder()
            .setColor(client.config.color.main)
            .setAuthor({
                name: 'Now Playing',
                iconURL: client.config.icons[player.current.info.sourceName] ?? client.user.displayAvatarURL(),
            })
            .setThumbnail(thumbnail)
            .setDescription(
                `[${player.current.info.title}](${player.current.info.uri}) - ${player.current.info.author}\n\n\`[${client.utils.formatTimeMusic(player.position)}/${client.utils.formatTimeMusic(player.current.info.length)}] - ${progress}%\`\n${bar[0]}`,
            );

        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
};
