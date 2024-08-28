import { ChannelType, Collection, Events, EmbedBuilder } from 'discord.js';

export default {
    name: Events.MessageCreate,
    execute: async (message, client) => {
        if (message.author.bot) return;
        if (message.channel.type === ChannelType.DM) return;
        const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(mention)) {
            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                        .setDescription(
                            `Hey ${message.author}, I'm **${client.user.username}**.\nMy command for this server is \`/\``,
                        )
                        .setColor(client.config.color.main),
                ],
            });
        }
    },
};
