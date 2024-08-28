import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('shuffle').setDescription('shuffle to track.'),
    description: {
        usage: 'shuffle',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');
        if (player.queue.size === 0) return interaction.reply('There is no music to shuffle.');
        player.queue.shuffle();
        await interaction.reply('Shuffled the queue.');
    },
};
