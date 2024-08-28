export default {
    name: 'nodeError',
    execute: async (error, client) => {
        console.log(`Node "${node.name}".`, error);
    },
};
