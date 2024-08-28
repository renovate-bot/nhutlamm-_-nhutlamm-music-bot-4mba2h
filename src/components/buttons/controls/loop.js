import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import editButton from '#helpers/editButton.js';

export default {
    id: 'LOOP',
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

        await editButton.Button(msg, 'LOOP', '🔂', 'QUEUE', ButtonStyle.Success);

        player.setLoop('track');
        await interaction.reply({ content: `Loop set to current track.`, ephemeral: true }).then(async (msg) => {
            setTimeout(() => {
                msg.delete();
            }, 5000);
        });
    },
};
