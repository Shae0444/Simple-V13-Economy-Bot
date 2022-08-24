const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const { Client, Collection, Intents, Routes } = Discord;

const bot = new Client({ 
  intents: 
  [Intents.FLAGS.GUILD_INVITES, 
      Intents.FLAGS.GUILD_INTEGRATIONS, 
      Intents.FLAGS.GUILD_VOICE_STATES, 
      Intents.FLAGS.GUILD_WEBHOOKS, 
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
      Intents.FLAGS.GUILD_BANS, 
      Intents.FLAGS.DIRECT_MESSAGES, 
      Intents.FLAGS.GUILDS, 
      Intents.FLAGS.GUILD_MESSAGES, 
      Intents.FLAGS.GUILD_MEMBERS, 
      Intents.FLAGS.GUILD_PRESENCES, 
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
      Intents.FLAGS.DIRECT_MESSAGE_TYPING]
  },
  {partials: ["MESSAGE", "REACTION", "GUILD_MEMBER", "USER", "CHANNEL"]}
)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});
})
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers !`); 
  bot.user.setActivity(`In Development`);
  bot.user.setStatus('online');

  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = botconfig.prefix
    let messageArray = message.content.split(" ");
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;

    if (bot.commands.has(cmd)) {
      commandfile = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    commandfile = bot.commands.get(bot.aliases.get(cmd));
  }
  
      if (!message.content.startsWith(prefix)) return;

          
  try {
    commandfile.run(bot, message, args);
  
  } catch (e) {
  }}
  )})


bot.login("Your bot token here");
