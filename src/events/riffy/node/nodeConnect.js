export default {
    name: 'nodeConnect',
    execute: async (node, client) => {
        console.log(`Node "${node.name}" connected.`);
    },
};
