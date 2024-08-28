import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('seek to track.')
        .addStringOption((option) => option.setName('duration').setDescription('ex: 1:30 & 1:30:30').setRequired(true)),
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

        const durationInput = interaction.options.getString('duration');
        const duration = client.utils.parseTime(durationInput);
        if (duration < 0 || duration > player.current.info.length) return interaction.reply('Invalid duration.');

        player.seek(duration);
        await interaction.reply('Seeked to the track.');
    },
};
