import { ActivityType, Events } from 'discord.js';
import logger from '#logger';

export default {
    name: Events.ClientReady,
    execute: async (client) => {
        client.riffy.init(client.user.id);

        logger.log(`${client.user.tag} is now online!`, 'client');
        client.user.setPresence({
            activities: [
                {
                    name: 'Music Bot Dev',
                    state: '/help | /play',
                    type: ActivityType.Watching,
                },
            ],
            status: 'online',
        });
    },
};
