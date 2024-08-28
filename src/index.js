import 'dotenv/config';
import { ClusterManager, HeartbeatManager } from 'discord-hybrid-sharding';
import logger from '#logger';
import config from '#config';

const manager = new ClusterManager(`./src/client.js`, {
    totalShards: config.totalShards,
    shardsPerClusters: config.shardsPerClusters,
    mode: 'process',
    token: config.token,
    restarts: {
        max: 5,
        interval: 60000 * 60,
    },
});

manager.on('clusterCreate', (cluster) => {
    logger.log(`- Launched Cluster ${cluster.id}`, 'client');
});

manager.spawn({ timeout: -1 });

manager.extend(
    new HeartbeatManager({
        interval: 2000,
        maxMissedHeartbeats: 5,
    }),
);
