import express from 'express';
import logger from '#logger';
import config from '#config';

const app = express();
const port = config.port;

export default {
    name: 'Server Plugin',
    version: '1.0.0',
    author: 'nhutlamm',
    initialize: (client) => {
        // Route
        /*app.get('/', (req, res) => {
            res.send(`Total ${client.guilds.cache.size} guilds. Shard ID: ${client.ws.ping}`);
        });

        // Start Server Bot
        app.listen(port, () => {
            logger.log(`Server API Plugin is running ${port}`, 'server');
        });*/
    },
};
