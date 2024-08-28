import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('autoplay').setDescription('autoplay to track.'),
    description: {
        usage: 'autoplay',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is join channel for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');
        console.log(player.isAutoplay);
        if (!player.isAutoplay) {
            player.autoplay(player);
            interaction.reply('Autoplay is now enabled.');
        } else {
            //player.autoplay(player);
            interaction.reply('Autoplay is now disabled.');
        }
    },
};
