import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('pause').setDescription('pause track.'),
    description: {
        usage: 'pause',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (player.paused) return interaction.reply('The music is already paused.');
        player.pause(true);
        await interaction.reply('Paused the music.');
    },
};
