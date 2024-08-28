import { readdirSync } from 'node:fs';
import logger from '#logger';

export default async (client) => {
    for (const folder of readdirSync('./src/events/client')) {
        for (const file of readdirSync(`./src/events/client/${folder}`)) {
            const event = await import(`../events/client/${folder}/${file}`).then((c) => c.default);
            if (event.name) {
                logger.log(`${file} Loaded!`, 'events');
            }
            if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
            else client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
};
