import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('replay').setDescription('replay to track.'),
    description: {
        usage: 'replay',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');

        player.seek(0);
        await interaction.reply('Replaying the track.');
    },
};
