import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('remove to track.')
        .addIntegerOption((option) =>
            option.setName('position').setDescription('position track').setMinValue(1).setRequired(true),
        ),
    description: {
        usage: 'seek',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');
        if (player.queue.size === 0) return interaction.reply('There is no music to remove.');
        const position = interaction.options.getInteger('position');
        if (position < 1 || position > player.queue.size) return interaction.reply('Invalid position.');
        player.queue.remove(position - 1);
        await interaction.reply('Removed the track.');
    },
};
