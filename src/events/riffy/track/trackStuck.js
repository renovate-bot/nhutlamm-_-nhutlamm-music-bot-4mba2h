export default {
    name: 'trackStuck',
    execute: async (player, track, payload, client) => {
        console.log(`Track stuck in ${player.guildId}`);
        player.stop();
    },
};
