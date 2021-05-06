const Discord = require('discord.js');
const dotenv = require('dotenv');
const https = require('https');
dotenv.config();
const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);


client.on('message', message => {
    switch (message.content) {
        case "pingmebaby":
            ping(message);
            break;
        case "manga":
            manga(message);
            break;
    }
})

function ping(message) {
    https.get('https://api.mangadex.org/ping', (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                //const parsedData = JSON.parse(rawData);
                console.log(rawData);
                message.reply(rawData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
}

function manga(message) {
    https.get("https://api.mangadex.org/manga?title=Beatrice", (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
                console.log(parsedData.result)
            } catch (e) {
                console.error(e.message);
            }
        });
    })
}