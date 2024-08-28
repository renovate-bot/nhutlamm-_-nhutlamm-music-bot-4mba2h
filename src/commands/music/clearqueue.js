import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('clearqueue').setDescription('clearqueue to track.'),
    description: {
        usage: 'clearqueue',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');
        if (player.queue.size === 0) return interaction.reply('There is no music to clear.');
        player.queue.clear();
        await interaction.reply('Cleared the queue.');
    },
};
