import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
    id: 'VOLDOWN',
    cooldown: 3,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply({ content: '❌ | No music is being played!', ephemeral: true });
        if (!interaction.member.voice.channel)
            return interaction.reply({ content: '❌ | You must be in a voice channel!', ephemeral: true });
        if (
            interaction.guild.members.me.voice.channel &&
            interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id
        )
            return interaction.reply({ content: '❌ | You must be in the same voice channel as me!', ephemeral: true });

        const msg = player.message;
        if (!msg) return;

        const { volume } = player;
        if (volume === 10) return interaction.reply({ content: '❌ | Volume is already at minimum!', ephemeral: true });

        player.setVolume(volume - 10);
        await interaction.reply({ content: `Volume set to ${volume - 10}%`, ephemeral: true }).then(async (msg) => {
            setTimeout(() => {
                msg.delete();
            }, 5000);
        });
    },
};
