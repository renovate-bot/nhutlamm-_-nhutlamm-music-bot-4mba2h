import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder().setName('shards').setDescription('Shards information.'),
    description: {
        usage: 'shards',
    },
    cooldown: 5,
    category: 'info',
    ownerOnly: false,
    run: async (client, interaction) => {
        const res = await client.cluster.broadcastEval((c) => {
            return {
                clusterId: c.cluster.id,
                shardIds: [...c.cluster.ids.keys()],
                totalGuilds: c.guilds.cache.size,
                totalMembers: c.guilds.cache.map((g) => g.memberCount).reduce((a, b) => a + b, 0),
                ping: c.ws.ping,
                uptime: c.uptime,
                memoryUsage: Object.fromEntries(
                    Object.entries(process.memoryUsage()).map((d) => {
                        d[1] = Math.floor((d[1] / 1024 / 1024) * 100) / 100;
                        return d;
                    }),
                ),
                allGuildsData: c.guilds.cache.map((guild) => {
                    return {
                        id: guild.id,
                        name: guild.name,
                        ownerId: guild.ownerId,
                        memberCount: guild.memberCount,
                        channels: guild.channels.cache.map((c) => {
                            return { id: c.id, name: c.name };
                        }),
                    };
                }),
                perShardData: [...c.cluster.ids.keys()].map((shardId) => {
                    return {
                        shardId: shardId,
                        ping: c.ws.shards.get(shardId)?.ping,
                        uptime: Date.now() - (c.ws.shards.get(shardId)?.connectedAt || 0),
                        guilds: c.guilds.cache.filter((x) => x.shardId === shardId).size,
                        members: c.guilds.cache
                            .filter((x) => x.shardId === shardId)
                            .map((g) => g.memberCount)
                            .reduce((a, b) => a + b, 0),
                    };
                }),
            };
        });

        const shardEmbed = new EmbedBuilder()
            .setAuthor({ name: 'Shard', iconURL: client.user.displayAvatarURL() })
            .setColor(client.config.color.main)
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
        res.map((shardData) => {
            shardData.perShardData.map((shard) => {
                shardEmbed.addFields({
                    name: `\`Shard ID  #${shard.shardId}\``,
                    value: `\`\`\`md\nPing    :: ${shard.ping}ms\nGuilds  :: ${shard.guilds}\nMembers :: ${shard.members}\`\`\``,
                    inline: true,
                });
            });
        });

        await interaction.reply({ embeds: [shardEmbed] });
    },
};
