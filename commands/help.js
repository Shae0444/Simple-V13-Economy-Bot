const {MessageEmbed} = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m!'))return;  


    const embed = new MessageEmbed()
    .setTitle("Money Man Help Centre [Prefix m!]")
    .addField("Economy Commands", "`work` `beg` `rob` `pay` `balance` `profile` `withdraw` `deposit` `daily` `weekly` `store` `buy` `sell`")
    .addField("Gambling Commmands", "`roulette` `slots`")
    .addField("Economy Extra Commands", "`storeinfo [item]`")
    .setColor("#FFFFFF")
    message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})

}

module.exports.help = {
  name:"help",
  aliases: [""]
}