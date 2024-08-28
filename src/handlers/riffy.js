import { readdirSync } from 'node:fs';
import logger from '#logger';

export default async (client) => {
    for (const folder of readdirSync('./src/events/riffy')) {
        for (const file of readdirSync(`./src/events/riffy/${folder}`)) {
            const event = await import(`../events/riffy/${folder}/${file}`).then((c) => c.default);
            if (event.name) {
                logger.log(`${file} Loaded!`, 'events');
            }
            client.riffy.on(event.name, (...args) => event.execute(...args, client));
        }
    }
};
