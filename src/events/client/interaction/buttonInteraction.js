import { Collection, Events, EmbedBuilder } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    execute: async (interaction, client) => {
        if (interaction.isButton()) {
            const button = client.buttonsComponents.get(interaction.customId);
            if (!button) return;

            const buttonName = interaction.customId;
            if (!client.cooldown.has(buttonName)) {
                client.cooldown.set(buttonName, new Collection());
            }
            const now = Date.now();
            const timestamps = client.cooldown.get(buttonName);
            const cooldownAmount = Math.floor(button.cooldown || 5) * 1000;
            if (!timestamps.has(interaction.user.id)) {
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            } else {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                const timeLeft = (expirationTime - now) / 1000;
                if (now < expirationTime && timeLeft > 0.9) {
                    return await interaction
                        .reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(
                                        `**Please wait \`${timeLeft.toFixed(1)}\` seconds before using the button again.**`,
                                    )
                                    .setColor(client.config.color.info),
                            ],
                            ephemeral: true,
                        })
                        .then(async (msg) => {
                            setTimeout(() => {
                                msg.delete();
                            }, 2000);
                        });
                }
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            }
            try {
                await button.run(client, interaction);
            } catch (error) {
                console.log(error);
            }
        }
    },
};
