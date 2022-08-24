const {MessageEmbed} = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('m!'))return;  

  let user = message.author;

  let member = db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)

    const embedbank = new MessageEmbed()
    .setColor('#FFFFFF')
    .setDescription("<:Cross:618736602901905418> You don't have any money to deposit")

    if(money === 0) return message.reply({embeds: [embedbank], allowedMentions: {repliedUser: false}})

    db.add(`bank_${message.guild.id}_${user.id}`, money)
    db.subtract(`money_${message.guild.id}_${user.id}`, money)
    const embed5 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Check:618736570337591296> You have deposited all your coins into your bank`);
  message.reply({embeds: [embed5], allowedMentions: {repliedUser: false}})
  
  } else {
  
  const embed2 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> Specify an amount to deposit`);
  
  if (!args[0]) {
      return message.reply({embeds: [embed2], allowedMentions: {repliedUser: false}})
      .catch(err => console.log(err))
  }
  const embed3 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> You can't deposit negative money`);

  if (message.content.includes('-')) { 
      return message.reply({embeds: [embed3], allowedMentions: {repliedUser: false}})
  }
  const embed4 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> You don't have that much money`);

  if (member < args[0]) {
      return message.reply({embeds: [embed4], allowedMentions: {repliedUser: false}})
  }

  const embed5 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Check:618736570337591296> You have deposited ${args[0]} coins into your bank`);

  message.reply({embeds: [embed5], allowedMentions: {repliedUser}})
  db.add(`bank_${message.guild.id}_${user.id}`, args[0])
  db.subtract(`money_${message.guild.id}_${user.id}`, args[0])
  }
}
module.exports.help = {
  name:"deposit",
  aliases: ["dep"]
}