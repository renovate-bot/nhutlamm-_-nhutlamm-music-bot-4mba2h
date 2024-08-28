import { readdirSync } from 'node:fs';
import { REST, Routes } from 'discord.js';
import config from '#config';
import logger from '#logger';

export default async (client) => {
    let slashCommands = [];
    for (const folder of readdirSync('./src/commands/')) {
        for (const file of readdirSync(`./src/commands/${folder}`)) {
            const command = await import(`../commands/${folder}/${file}`).then((c) => c.default);
            if (command.data.name) {
                logger.log(`${file} Loaded!`, 'slash');
            }
            client.slashDatas.push(command.data.toJSON());
            client.slashCommands.set(command.data.name, command);
        }
    }
    const rest = new REST({ version: '10' }).setToken(config.token);
    await rest
        .put(Routes.applicationCommands(config.clientId), {
            body: client.slashDatas,
        })
        .then(() => logger.log('Successfully reloaded application (/) commands.', 'client'));
};
