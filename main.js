const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);