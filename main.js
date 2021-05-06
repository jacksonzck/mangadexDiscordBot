const Discord = require('discord.js');
const dotenv = require('dotenv');
const https = require('https');
dotenv.config();
const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);
https.get('https://api.mangadex.org/ping', (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            //const parsedData = JSON.parse(rawData);
            console.log(rawData);
        } catch (e) {
            console.error(e.message);
        }
    });
});