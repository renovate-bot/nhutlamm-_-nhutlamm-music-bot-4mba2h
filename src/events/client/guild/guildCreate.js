import { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import config from '#config';

export default {
    name: Events.GuildCreate,
    execute: async (guild) => {
        const owner = await guild.fetchOwner();

        const embed = new EmbedBuilder()
            .setColor(config.color.main)
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ extension: 'jpeg' }) })
            .setDescription(
                `🎉 Thank you, <@${owner.user.id}>, for using **test Bot** on the **${guild.name}** server. Use the command \`/setup create\` to create a confession channel for your server. We hope you have a great experience on your server with our confession bot!`,
            )
            .setThumbnail(guild.iconURL({ extension: 'jpeg' }))
            .setTimestamp();

        const dmOwner = await guild.members.cache.get(owner.user.id);
        return await dmOwner.send({ embeds: [embed] });
    },
};
