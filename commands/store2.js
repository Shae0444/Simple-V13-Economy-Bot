const {MessageEmbed} = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m!'))return;
    
    if(!args[0]) {
      let embed = new MessageEmbed()
    .setDescription("**Choose an option between bronze, nikes, car, mansion**")
    .setColor("#FFFFFF")
      return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
    }
  
    if (args[0] == 'bronze') {
    
      let embed = new MessageEmbed()
      .setDescription("**Bronze Rank**\n\nBenefits: Chance to get more coins from robbing someone")
      .setColor("#FFFFFF")
      message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
    } else if(args[0] == 'nikes') {
      let embed = new MessageEmbed()
      .setDescription("**Fresh Nikes**\n\nBenefits: Chance to win coins, roles on our Discord Server + More by leading the leaderboard")
      .setColor("#FFFFFF")
      message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
    } else if(args[0] == 'car') {
      let embed = new MessageEmbed()
      .setDescription("**Car**\n\nBenefits: Chance to win coins, roles on our Discord Server + More by leading the leaderboard")
      .setColor("#FFFFFF")
      message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
  } else if(args[0] == 'mansion') {
    let embed = new MessageEmbed()
    .setDescription("**Mansion**\n\nBenefits: Chance to win coins, roles on our Discord Server + More by leading the leaderboard")
    .setColor("#FFFFFF")
    message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
  }

  }

  module.exports.help = {
    name:"storeinfo",
    aliases: ["si"]
  }