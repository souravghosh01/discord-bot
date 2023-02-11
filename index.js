const {Client ,GatewayIntentBits,ActivityType } = require('discord.js');
const isurlhttp = require('is-url-http')
const fetch = require('node-fetch');
require("dotenv").config();



const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ,GatewayIntentBits.GuildPresences],
})

client.on("ready",()=>{
    
    console.log("bot is live")
    client.user.setPresence({
        activities: [{ name: `NPCs`, type: ActivityType.Watching }],
        status: 'online',
      });
})

client.on("messageCreate", async message=>{

    if(message.author.bot) return

    if(message.content.startsWith("Hi") ||(message.content.startsWith("hi"))) {
        const id = message.author.id
             message.reply("Hello! "+ `<@${id}>`)
        }
    if(message.content.startsWith("!gen")){
    const link = message.content.split(" ")[1]

        if(link.length == 0)
        return message.reply('please provide a url')

        if(!isurlhttp(link))
        return message.reply('please provide a valid url e.g: https://www.youtube.com')
        
        const urlObj = { url:link };

        const result = await fetch('api url',{
            method: 'post',
	        body: JSON.stringify(urlObj),
	        headers: {'Content-Type': 'application/json'}
            })
        shortLink = await result.json()
        // console.log(JSON.stringify(urlObj));
         console.log(shortLink);
        return message.reply('Generated link : '+'api url/'+shortLink.id)
    }
    // console.log(message.content);
})

client.login(process.env.TOKEN)