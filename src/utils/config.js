import 'dotenv/config';

export default {
    token: process.env.TOKEN,
    port: Number(process.env.PORT),
    clientId: process.env.CLIENT_ID,
    devId: process.env.DEV_ID.split(',') || undefined,
    mongodb: process.env.DATABASE_URL,
    totalShards: parseInt(process.env.TOTAL_SHARDS) || 1,
    shardsPerClusters: parseInt(process.env.SHARDS_PER_CLUSTERS) || 6,
    color: {
        main: '#2c2d31',
        info: '#f0ad4e',
        success: '#22bb33',
        danger: '#bb2124',
    },
    icons: {
        youtube: 'https://cdn.discordapp.com/attachments/852316384289619968/1142853793822822551/3670147.png',
        spotify: 'https://media.discordapp.net/attachments/963097935820750878/1054333449252655104/spotify.png',
        soundcloud: 'https://media.discordapp.net/attachments/963097935820750878/1054333449638526986/145809.png',
        applemusic:
            'https://media.discordapp.net/attachments/963097935820750878/1054333450368340018/apple-music-icon.png',
        deezer: 'https://media.discordapp.net/attachments/963097935820750878/1054333450024394802/5968803.png',
    },
    spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID || null,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET || null,
    },
    nodes: [
        {
            identifier: 'Lavalink Server',
            password: 'horizxon.tech',
            host: 'v3.lavalink.rocks',
            port: 443,
            secure: true,
        },
    ],
};
