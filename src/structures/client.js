import { Client, Collection, GatewayDispatchEvents } from 'discord.js';
import { ClusterClient } from 'discord-hybrid-sharding';
import { Riffy } from 'riffy';
import { Spotify } from 'riffy-spotify';

import config from '#config';
import logger from '#logger';
import utils from '#utils';

export default class BotClient extends Client {
    constructor(option) {
        super(option);
        this.config = config;
        this.cooldown = new Collection();
        this.commandAliases = new Collection();
        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.buttonsComponents = new Collection();
        this.modalComponents = new Collection();
        this.slashDatas = [];
        this.cluster = new ClusterClient(this);
        this.cluster
            .broadcastEval(`this.guilds.cache.size`)
            .then((results) => logger.log(`${results.reduce((prev, val) => prev + val, 0)} total guilds`, 'client'));
        this.utils = utils;
        this.riffy = new Riffy(this, this.config.nodes, {
            send: (payload) => {
                const guild = this.guilds.cache.get(payload.d.guild_id);
                if (guild) guild.shard.send(payload);
            },
            defaultSearchPlatform: 'ytmsearch',
            restVersion: 'v3',
            plugins: [
                new Spotify({
                    clientId: this.config.spotify.clientId,
                    clientSecret: this.config.spotify.clientSecret,
                }),
            ],
        });
        this.on('raw', (d) => {
            if (![GatewayDispatchEvents.VoiceStateUpdate, GatewayDispatchEvents.VoiceServerUpdate].includes(d.t))
                return;
            this.riffy.updateVoiceState(d);
        });
    }
    async start(token) {
        await this.login(token);

        ['slash', 'riffy', 'buttons', 'events', 'plugins'].map(async (files) => {
            await import(`../handlers/${files}.js`).then((c) => c.default(this));
        });
    }
}
