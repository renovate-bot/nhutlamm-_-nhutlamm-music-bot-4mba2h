import { GatewayIntentBits, Partials } from 'discord.js';
import { getInfo } from 'discord-hybrid-sharding';
import BotClient from '#src/structures/client.js';
import config from '#config';

const clientOptions = {
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
};

const client = new BotClient(clientOptions);
client.start(config.token);
