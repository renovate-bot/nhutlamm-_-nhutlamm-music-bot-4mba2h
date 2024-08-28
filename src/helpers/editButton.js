import { ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

export default class editButton {
    static async Button(msg, id, icon, idEdit, buttonStyle) {
        const newButtons = msg.components[0].components.map((button) => {
            if (button.customId === id) {
                return ButtonBuilder.from(button).setEmoji(icon).setStyle(buttonStyle).setCustomId(idEdit);
            }
            return button;
        });

        const newActionRow = new ActionRowBuilder().addComponents(newButtons);
        await msg.edit({
            components: [newActionRow],
        });
    }

    static async Mode(player) {
        let mode;
        switch (player.loop) {
            case 'track':
                mode = new ButtonBuilder().setCustomId('QUEUE').setEmoji('🔂').setStyle(ButtonStyle.Success);
                break;
            case 'queue':
                mode = new ButtonBuilder().setCustomId('NONE').setEmoji('🔁').setStyle(ButtonStyle.Success);
                break;
            case 'none':
                mode = new ButtonBuilder().setCustomId('LOOP').setEmoji('🔂').setStyle(ButtonStyle.Secondary);
                break;
            default:
                throw new Error(`Unknown loop mode: ${player.loop}`);
        }

        return mode;
    }
}
