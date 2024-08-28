import { readdirSync } from 'node:fs';
import logger from '#logger';

export default async (client) => {
    readdirSync('./src/plugins').map(async (files) => {
        const plugin = await import(`../plugins/${files}`).then((c) => c.default);
        if (plugin.initialize) plugin.initialize(client);
        logger.log(`${files} Loaded!`, 'plugins');
    });
};
