const {MessageEmbed} = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m!'))return;  

    let user = message.author;

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    const Embed = new MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:Cross:618736602901905418> You need 2000 coins to purchase Bronze VIP`);

    if (args[0] == 'bronze') {
        if (author < 3500) return message.reply({embeds: [Embed], allowedMentions: {repliedUser: false}})
        
        db.fetch(`bronze_${message.guild.id}_${user.id}`);
        db.set(`bronze_${message.guild.id}_${user.id}`, true)

        const Embed2 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Purchased Bronze VIP For 3500 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 3500)
        message.reply({embeds: [Embed2], allowedMentions: {repliedUser: false}})
    } else if(args[0] == 'nikes') {
        const Embed2 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> You need 600 coins to purchase some Nikes`);

        if (author < 600) return message.reply({embeds: [Embed2], allowedMentions: {repliedUser: false}})
       
        db.fetch(`nikes_${message.guild.id}_${user.id}`)
        db.add(`nikes_${message.guild.id}_${user.id}`, 1)

        const Embed3 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Purchased Fresh Nikes For 600 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 600)
        message.reply({embeds: [Embed3], allowedMentions: {repliedUser: false}})
    } else if(args[0] == 'car') {
        const Embed2 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> You need 800 coins to purchase a new car`);

        if (author < 800) return message.reply({embeds: [Embed2], allowedMentions: {repliedUser: false}})
       
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.add(`car_${message.guild.id}_${user.id}`, 1)

        const Embed3 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Purchased a New Car For 800 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 800)
        message.reply({embeds: [Embed3], allowedMentions: {repliedUser: false}})
    } else if(args[0] == 'mansion') {
        const Embed2 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> You need 1200 coins to purchase a Mansion`);

        if (author < 1200) return message.reply({embeds: [Embed2], allowedMentions: {repliedUser: false}})
       
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.add(`house_${message.guild.id}_${user.id}`, 1)

        const Embed3 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Purchased a Mansion For 1200 Coins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1200)
        message.reply({embeds: [Embed3], allowedMentions: {repliedUser: false}})
    } else {
        const embed3 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription('<:Cross:618736602901905418> Enter an item to buy')
        message.reply({embeds: [embed3], allowedMentions: {repliedUser: false}})
    }

}
  
  module.exports.help = {
    name:"buy",
    aliases: [""]
  }