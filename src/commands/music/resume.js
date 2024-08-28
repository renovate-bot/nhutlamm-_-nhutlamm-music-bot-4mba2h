import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('resume').setDescription('resume track.'),
    description: {
        usage: 'resume',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.paused) return interaction.reply('The music is already resume.');
        player.pause(false);
        await interaction.reply('Resumed the music.');
    },
};
