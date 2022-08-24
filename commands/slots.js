const slotItems = ["<:Grape:618765748940177421>", "<:Watermelon:618765904318038027>", "<:Orange:618765805596835880>", "<:Apple:618765871862513695>", "<:7_:618765717499805706>", "<:Strawberry:618765828929617930>", "<:Cherry:618765778094784513>"];
const db = require("quick.db");
const {MessageEmbed} = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m!'))return;  

    let user = message.author;
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:Cross:618736602901905418> You are betting more than you have`);

    let moneyhelp = new MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:Cross:618736602901905418> Specify an amount`);

    if (!money) return message.reply({embeds: [moneyhelp], allowedMentions: {repliedUser: false}});
    if (money > moneydb) return message.reply({embeds: [moneymore], allowedMentions: {repliedUser: false}});

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("#FFFFFF")
        message.reply({embeds: [slotsEmbed1], allowedMentions: {repliedUser: false}})
        db.add(`money_${message.guild.id}_${user.id}`, money)
    } else {
        let slotsEmbed = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("#FFFFFF")
        message.reply({embeds: [slotsEmbed], allowedMentions: {repliedUser: false}})
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
    }

}
  
  module.exports.help = {
    name:"slots",
    aliases: ["sl"]
  }