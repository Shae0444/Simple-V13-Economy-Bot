const {MessageEmbed} = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m!'))return;  

    const embed = new MessageEmbed()
    .setDescription(`**Input a Leaderboard Option**\n\nCoin Leaderboard: m!leaderboard coins\nFresh Nikes Leaderboard: m!leaderboard nikes\nCar Leaderboard: m!leaderboard car\nMansion Leaderboard: m!leaderboard mansion`)
    .setColor("#FFFFFF")


  if(!args[0]) return message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})

    if (args[0] == 'coins') {
    let money = db.all().filter(data => data.ID.startsWith(`money_${message.guild.id}`)).sort((a, b) => b.data - a.data);
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = `${money.indexOf(money[i]) + 1}. ${bot.users.cache.get(money[i].ID.split('_')[1]) ? bot.users.cache.get(money[i].ID.split('_')[1]).username : "Unknown User#0000"}`

      

        content += `${user} ~ ${money[i].data}\n`
    
      }

    const embed = new MessageEmbed()
    .setDescription(`**${message.guild.name}'s Coin Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
  } else if(args[0] == 'nikes') {
    let nike = db.all().filter(data => data.ID.startsWith(`nikes_${message.guild.id}`)).sort((a, b) => b.data - a.data);
    let content = "";

    for (let i = 0; i < nike.length; i++) {
      let user = `${nike.indexOf(nike[i]) + 1}. ${bot.users.cache.get(nike[i].ID.split('_')[1]) ? bot.users.cache.get(nike[i].ID.split('_')[1]).username : "Unknown User#0000"}`

        content += `${user} ~ ${nike[i].data}\n`
    }

    const embed = new MessageEmbed()
    .setDescription(`**${message.guild.name}'s Fresh Nikes Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
  } else if(args[0] == 'car') {
    let cars = db.all().filter(data => data.ID.startsWith(`car_${message.guild.id}`)).sort((a, b) => b.data - a.data);
    let content = "";

    for (let i = 0; i < cars.length; i++) {
        let user = `${cars.indexOf(cars[i]) + 1}. ${bot.users.cache.get(cars[i].ID.split('_')[1]) ? bot.users.cache.get(cars[i].ID.split('_')[1]).username : "Unknown User#0000"}`

        content += `${user} ~ ${cars[i].data}\n`
    }

    const embed = new MessageEmbed()
    .setDescription(`**${message.guild.name}'s Car Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
  } else if(args[0] == 'mansion') {
    let mansions = db.all().filter(data => data.ID.startsWith(`house_${message.guild.id}`)).sort((a, b) => b.data - a.data);
    let content = "";

    for (let i = 0; i < mansions.length; i++) {
        let user = `${mansions.indexOf(mansions[i]) + 1}. ${bot.users.cache.get(mansions[i].ID.split('_')[1]) ? bot.users.cache.get(mansions[i].ID.split('_')[1]).username : "Unknown User#0000"}`

        content += `${user} ~ ${mansions[i].data}\n`
    }

    const embed = new MessageEmbed()
    .setDescription(`**${message.guild.name}'s Mansion Leaderboard**\n\n${content}`)
    .setColor("#FFFFFF")

    message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})
  }

}
module.exports.help = {
  name:"leaderboard",
  aliases: ["leader"]
}