import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
    id: 'SHUFFLE',
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

        if (player.queue.size === 0) return interaction.reply('There is no queue music to shuffle.');
        player.queue.shuffle();
        await interaction.reply({ content: 'Shuffled the queue.', ephemeral: true }).then(async (msg) => {
            setTimeout(() => {
                msg.delete();
            }, 5000);
        });
    },
};
