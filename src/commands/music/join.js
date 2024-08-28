import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('join').setDescription('join to channel.'),
    description: {
        usage: 'join',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (player) return interaction.reply('There is join channel for this guild.');
        const vc = interaction.member.voice.channel;
        if (!vc) return interaction.reply('You need to be in a voice channel.');
        const permissions = vc.permissionsFor(interaction.guild.members.me);
        if (!permissions.has('Connect') || !permissions.has('Speak'))
            return interaction.reply('I need permission to join and speak in your voice channel.');

        client.riffy.createConnection({
            guildId: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            deaf: true,
        });

        await interaction.reply('Joined to the voice channel.');
    },
};
