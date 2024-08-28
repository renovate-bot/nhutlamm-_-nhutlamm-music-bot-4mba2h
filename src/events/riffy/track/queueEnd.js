export default {
    name: 'queueEnd',
    execute: async (player, client) => {
        const channel = client.channels.cache.get(player.textChannel);
        if (player.message) await player.message.delete().catch((e) => {});

        const autoplay = false;
        if (autoplay) {
            player.autoplay(player);
        } else {
            channel.send('roi sau 30s');
            setTimeout(() => {
                player.destroy();
                channel.send('Queue has ended.');
            }, 30000);
        }
    },
};
