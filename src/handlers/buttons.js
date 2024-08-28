import { readdirSync } from 'node:fs';
import logger from '#logger';

export default async (client) => {
    for (const folder of readdirSync('./src/components/buttons')) {
        for (const file of readdirSync(`./src/components/buttons/${folder}`)) {
            const buttons = await import(`../components/buttons/${folder}/${file}`).then((c) => c.default);
            if (!buttons) return;
            client.buttonsComponents.set(buttons.id, buttons);
            logger.log(`Loaded Button: ${buttons.id.toLowerCase()}.js`, 'buttons');
        }
    }
};
