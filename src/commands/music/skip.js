import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('skip').setDescription('skip track.'),
    description: {
        usage: 'skip',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');
        if (player.queue.size === 0) return interaction.reply('There is no music to skip.');
        player.stop();
        await interaction.reply('Skipped the music.').then((msg) => {
            setTimeout(() => {
                msg.delete();
            }, 3000);
        });
    },
};
