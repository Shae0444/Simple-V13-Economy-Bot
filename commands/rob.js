const {MessageEmbed} = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('m!'))return;  

let user = message.mentions.members.first()

if(!user) {
  const nouser = new MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:Cross:618736602901905418> You need to mention someone ! `);
    message.reply({embeds: [nouser], allowedMentions: {repliedUser: false}})
}

let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`)
let author = await db.fetch(`rob_${message.guild.id}_${user.id}`)
let author2 = await db.fetch(`money_${message.guild.id}_${user.id}`)

let timeout = 600000;

if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    const timeEmbed = new MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:Cross:618736602901905418> You have already robbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s `);
    message.reply({embeds: [timeEmbed], allowedMentions: {repliedUser: false}})
  } else {

const moneyEmbed = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> You need atleast 200 coins in your wallet to rob someone`);

if (author2 < 200) {
    return message.reply({embeds: [moneyEmbed], allowedMentions: {repliedUser: false}})

}
const moneyEmbed2 = new MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`<:Cross:618736602901905418> ${user.user.username} does not have anything you can rob`);
if (targetuser < 0) {
    return message.reply({embeds: [moneyEmbed2], allowedMentions: {repliedUser: false}})
}



let vip = await db.fetch(`bronze_${user.id}`)
if(vip === true) random = Math.floor(Math.random() * 200) + 1;
if (vip === null) random = Math.floor(Math.random() * 100) + 1;

const embed = new MessageEmbed()
.setDescription(`<:Check:618736570337591296> You robbed ${user} and got away with ${random} coins`)
.setColor("#FFFFFF")
message.reply({embeds: [embed], allowedMentions: {repliedUser: false}})

db.subtract(`money_${message.guild.id}_${user.id}`, random)
db.add(`money_${message.guild.id}_${user.id}`, random)
db.set(`rob_${message.guild.id}_${user.id}`, Date.now())
  
};
}

module.exports.help = {
  name:"rob",
  aliases: [""]
}