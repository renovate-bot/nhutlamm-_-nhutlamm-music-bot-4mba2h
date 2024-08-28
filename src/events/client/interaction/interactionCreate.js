import { Collection, Events, EmbedBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    execute: async (interaction, client) => {
        if (interaction.isCommand()) {
            if (interaction.user.bot) return;
            const { commandName } = interaction;
            const command = client.slashCommands.get(interaction.commandName);
            if (command.ownerOnly) {
                if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.Administrator))
                    return await interaction.reply({
                        content:
                            "❌ **I don't have **`Administrator`** permission**.\n\n> Please add **`Administrator`** permission for me so I can use it.\n> *I only manage channels.*",
                        ephemeral: true,
                    });
            }

            if (!client.cooldown.has(commandName)) {
                client.cooldown.set(commandName, new Collection());
            }
            const now = Date.now();
            const timestamps = client.cooldown.get(commandName);
            const cooldownAmount = Math.floor(command.cooldown || 5) * 1000;
            if (!timestamps.has(interaction.user.id)) {
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            } else {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                const timeLeft = (expirationTime - now) / 1000;
                if (now < expirationTime && timeLeft > 0.9) {
                    return await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(
                                    `**Please wait \`${timeLeft.toFixed(1)}\` more second before reusing the \`/${commandName}\` command.**`,
                                )
                                .setColor(client.config.color.info),
                        ],
                        ephemeral: true,
                    });
                }
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            }
            try {
                await command.run(client, interaction);
            } catch (error) {
                console.log(error);
            }
        }
    },
};
