const {MessageEmbed} = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('m!'))return;  

  let user = message.author;

  let timeout = 180000;
  let amount = 5;

  let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    const timeEmbed = new MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
    message.reply({embeds: [timeEmbed], allowedMentions: {repliedUser: false}})
  } else {
    const moneyEmbed = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You've begged and received ${amount} coins`);
  message.reply({embeds: [moneyEmbed], allowedMentions: {repliedUser: false}})
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`beg_${message.guild.id}_${user.id}`, Date.now())
  }
};


module.exports.help = {
  name:"beg",
  aliases: [""]
}