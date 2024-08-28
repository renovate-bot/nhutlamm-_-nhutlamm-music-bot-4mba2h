import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('lavalink').setDescription('See lavalink status.'),
    description: {
        usage: 'lavalink',
    },
    cooldown: 5,
    category: 'info',
    ownerOnly: false,
    run: async (client, interaction) => {
        const name = client.riffy.nodes[0].host;
        const stats = client.riffy.nodeMap.get(name).stats;
        console.log(stats);
    },
};
