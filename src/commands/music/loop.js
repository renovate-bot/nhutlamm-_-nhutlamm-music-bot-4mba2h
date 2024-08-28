import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('loop.')
        .addStringOption((option) =>
            option
                .setName('mode')
                .setDescription('mode')
                .setRequired(true)
                .addChoices({ name: 'Track', value: 'track' }, { name: 'Queue', value: 'queue' }),
        ),
    description: {
        usage: 'loop',
    },
    cooldown: 5,
    category: 'music',
    ownerOnly: false,
    run: async (client, interaction) => {
        const player = client.riffy.players.get(interaction.guild.id);
        if (!player) return interaction.reply('There is no player for this guild.');
        if (!player.playing) return interaction.reply('There is no music playing.');
        const mode = interaction.options.getString('mode');
        switch (mode) {
            case 'track':
                if (player.playing === 'track') {
                    player.setLoop('none');
                    return await interaction.reply('Loop track mode is now disabled.');
                } else {
                    player.setLoop('track');
                    return await interaction.reply('Loop track mode is now enabled.');
                }
                break;
            case 'queue':
                if (player.loop === 'queue') {
                    player.setLoop('none');
                    return await interaction.reply('Loop queue mode is now disabled.');
                } else {
                    player.setLoop('queue');
                    return await interaction.reply('Loop queue mode is now enabled.');
                }
                break;
        }
    },
};
