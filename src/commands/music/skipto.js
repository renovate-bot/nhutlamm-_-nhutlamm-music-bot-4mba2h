import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('skipto')
        .setDescription('skip to track.')
        .addIntegerOption((option) =>
            option.setName('position').setDescription('position track').setMinValue(1).setRequired(true),
        ),
    description: {
        usage: 'skipto',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');
        if (player.queue.size === 0) return interaction.reply('There is no music to skip.');
        const position = interaction.options.getInteger('position');
        if (position < 1 || position > player.queue.size) return interaction.reply('Invalid position.');
        player.queue.splice(0, position - 1);
        player.stop();
        await interaction.reply('Skipped to the track.').then((msg) => {
            setTimeout(() => {
                msg.delete();
            }, 3000);
        });
    },
};
