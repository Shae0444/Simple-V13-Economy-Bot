const {MessageEmbed} = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('m!'))return;  

  let user = message.author;

  let member = db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    
    db.subtract(`bank_${message.guild.id}_${user.id}`, money)
    db.add(`money_${message.guild.id}_${user.id}`, money)
    let embed5 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Check:618736570337591296> You have withdrawn all your coins from your bank`);
  message.reply({embeds: [embed5], allowedMentions: {repliedUser: false}})
  
  } else {

  let embed2 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> Specify an amount to withdraw`);
  
  if (!args[0]) {
      return message.reply({embeds: [embed2], allowedMentions: {repliedUser: false}})
  }
  let embed3 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> You can't withdraw negative money`);

  if (message.content.includes('-')) { 
      return message.reply({embeds: [embed3], allowedMentions: {repliedUser: false}})
  }
  let embed4 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> You don't have that much money in the bank`);

  if (member2 < args[0]) {
      return message.reply({embeds: [embed4], allowedMentions: {repliedUser: false}})
  }

  let embed5 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Check:618736570337591296> You have withdrawn ${args[0]} coins from your bank`);

  message.reply({embeds: [embed5], allowedMentions: {repliedUser: false}})
  db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
  db.add(`money_${message.guild.id}_${user.id}`, args[0])
  }
}

module.exports.help = {
  name:"withdraw",
  aliases: ["wd"]
}