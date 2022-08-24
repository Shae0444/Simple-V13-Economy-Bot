const {MessageEmbed} = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('m!'))return;  

  let user = message.mentions.members.first() 

  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

  const embed1 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> Mention someone to pay`);

  if (!user) {
      return message.reply({embeds: [embed1], allowedMentions: {repliedUser: false}})
  }
  const embed2 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> Specify an amount to pay`);
  
  if (!args[1]) {
      return message.reply({embeds: [embed2], allowedMentions: {repliedUser: false}})
  }
  const embed3 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> You can't pay someone negative money`);

  if (message.content.includes('-')) { 
      return message.reply({embeds: [embed3], allowedMentions: {repliedUser: false}})
  }
  const embed4 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> You don't have that much money`);

  if (member < args[1]) {
      return message.reply({embeds: [embed4], allowedMentions: {repliedUser: false}})
  }

  const embed5 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Check:618736570337591296> You have payed ${user.user.username} ${args[1]} coins`);

  message.reply({embeds: [embed5], allowedMentions: {repliedUser: false}})
  db.add(`money_${message.guild.id}_${user.id}`, args[1])
  db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])

}

module.exports.help = {
  name:"pay",
  aliases: [""]
}