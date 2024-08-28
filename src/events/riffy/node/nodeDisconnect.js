export default {
    name: 'nodeDisconnect',
    execute: async (node, reason, client) => {
        console.log(`Node "${node.name}" nodeDisconnect.`, reason);
    },
};
