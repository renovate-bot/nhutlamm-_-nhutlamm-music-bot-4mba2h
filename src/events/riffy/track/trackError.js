export default {
    name: 'trackError',
    execute: async (player, track, payload, client) => {
        console.log(`Track "${track.info.title}" has encountered an error.`);
    },
};
