import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('volume.')
        .addIntegerOption((option) =>
            option.setName('volume').setDescription('volume track').setMinValue(10).setMaxValue(200).setRequired(true),
        ),
    description: {
        usage: 'volume',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');
        const volume = interaction.options.getInteger('volume');
        player.setVolume(volume);
        await interaction.reply(`Set the volume to ${volume}%.`);
    },
};
