const Discord = require('discord.js');
const dotenv = require('dotenv');
const https = require('https');
dotenv.config();
const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);


client.on('message', message => {
    switch (message.content.split(" ")[0]) {
        case "!ping":
            ping(message);
            break;
        case "!manga":
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
                //message.reply(rawData);
                message.channel.send(rawData);
            } catch (e) {
                console.error(e.message);
            }
        });
    });
}

//Goes from parsedData to results to each result to data
function manga(message) {
    https.get("https://api.mangadex.org/manga?title=" + message.content.split(" ")[1], (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
                console.log(parsedData.results);
                parsedData.results.forEach((result) => {
                    console.log(result.data);
                    message.channel.send(result.data.attributes.title.en);
                })
            } catch (e) {
                console.error(e.message);
            }
        });
    })
}