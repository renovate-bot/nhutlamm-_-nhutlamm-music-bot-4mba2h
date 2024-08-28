import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('ping').setDescription('See bot latency.'),
    description: {
        usage: 'ping',
    },
    cooldown: 5,
    category: 'info',
    ownerOnly: false,
    run: async (client, interaction) => {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: 'Pong', iconURL: client.user.displayAvatarURL() })
                    .setColor(client.config.color.main)
                    .addFields([
                        {
                            name: `Shard`,
                            value: `\`[ID #${interaction.guild.shardId}\`]`,
                            inline: true,
                        },
                        {
                            name: 'Shard Latency',
                            value: `\`[${Math.round(interaction.client.ws.ping).toFixed(0)}ms]\``,
                            inline: true,
                        },
                    ])
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                    .setTimestamp(),
            ],
        });
    },
};
