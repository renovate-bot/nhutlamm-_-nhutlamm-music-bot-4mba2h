export default {
    name: 'trackEnd',
    execute: async (player, track, payload, client) => {
        if (!player) return;

        if (player.message) await player.message.delete().catch((e) => {});
    },
};
