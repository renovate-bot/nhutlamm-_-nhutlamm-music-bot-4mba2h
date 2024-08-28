import { EmbedBuilder, SlashCommandBuilder, ButtonStyle } from 'discord.js';
import { Pagination } from 'pagination.djs';

export default {
    data: new SlashCommandBuilder().setName('queue').setDescription('Hiển thị danh sách nhạc chờ.'),
    description: {
        usage: 'queue',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');

        const { queue } = player;
        if (!queue.size) return interaction.reply('Queue is empty.');

        const queueList = [];
        for (let i = 0; i < queue.size; i++) {
            const track = queue[i];
            const contents = `${i + 1}. [${track.info.title}](${track.info.uri}) - [${client.utils.formatTimeMusic(track.info.length)}]`;
            queueList.push([contents]);
        }

        const nowplay = `Now Playing:\n> [${player.current.info.title}](${player.current.info.uri}) - ${player.current.info.author}\n`;
        const pagination = new Pagination(interaction, {
            firstEmoji: '⏮',
            prevEmoji: '◀️',
            nextEmoji: '▶️',
            lastEmoji: '⏭',
            limit: 10,
            idle: 60000,
            ephemeral: true,
            prevDescription: nowplay,
        });
        pagination.setDescriptions(queueList);
        pagination.setAuthor({ name: 'Queue', iconURL: client.user.displayAvatarURL({ extension: 'png' }) });
        pagination.setColor(client.config.color.main);
        pagination.render();
    },
};
