import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('stop').setDescription('stopnhac.'),
    description: {
        usage: 'stop',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');
        player.destroy();
        interaction.channel.messages.fetch(player?.message).then((x) => x.delete());
        await interaction.reply('Stopped the music.');
    },
};
