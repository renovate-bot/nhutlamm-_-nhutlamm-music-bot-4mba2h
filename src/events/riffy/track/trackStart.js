import { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import editButton from '#helpers/editButton.js';

export default {
    name: 'trackStart',
    execute: async (player, track, payload, client) => {
        const channel = client.channels.cache.get(player.textChannel);
        if (!channel) return;
        await channel.sendTyping();

        const thumbnail = await track.info.thumbnail;

        const embed = new EmbedBuilder()
            .setColor(client.config.color.main)
            .setAuthor({
                name: `Now Playing`,
                iconURL: client.config.icons[track.info.sourceName] ?? client.user.displayAvatarURL(),
                url: track.info.uri,
            })
            .setThumbnail(thumbnail)
            .setDescription(`[${track.info.title}](${track.info.uri})`)
            .addFields(
                {
                    name: 'Duration',
                    value: track.info.stream ? 'LIVE' : client.utils.formatTimeMusic(track.info.length),
                    inline: true,
                },
                {
                    name: 'Author',
                    value: track.info.author,
                    inline: true,
                },
            );

        const bShuffle = new ButtonBuilder().setCustomId('SHUFFLE').setEmoji('🔀').setStyle(ButtonStyle.Secondary);
        const bVDown = new ButtonBuilder().setCustomId('VOLDOWN').setEmoji('🔉').setStyle(ButtonStyle.Secondary);
        const bPause = new ButtonBuilder().setCustomId('PAUSE').setEmoji('⏸️').setStyle(ButtonStyle.Secondary);
        const bVUp = new ButtonBuilder().setCustomId('VOLUP').setEmoji('🔊').setStyle(ButtonStyle.Secondary);
        const bLoop = await editButton.Mode(player);

        const button = new ActionRowBuilder().addComponents(bShuffle, bVDown, bPause, bVUp, bLoop);

        await channel
            .send({
                embeds: [embed],
                components: [button],
            })
            .then((x) => (player.message = x));
    },
};
