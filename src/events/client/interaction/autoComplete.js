import { Events } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    execute: async (interaction, client) => {
        if (interaction.isAutocomplete()) {
            const command = client.slashCommands.get(interaction.commandName);
            await command.autocomplete(interaction, client);
        }
    },
};
