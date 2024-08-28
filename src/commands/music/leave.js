import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('leave').setDescription('leave to channel.'),
    description: {
        usage: 'leave',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        player.disconnect();
        await interaction.reply('Left the voice channel.');
    },
};
