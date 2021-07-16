const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
exports.run = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("koççum yetkin yok")

let kontrol = await db.fetch(`sescikcik_${message.guild.id}`)
let kontrol2 = await db.fetch(`sescikcikk_${message.guild.id}`)
let kontrol3 = await db.fetch(`sescikcikkk_${message.guild.id}`)
if(!kontrol && !kontrol2 && !kontrol3) return message.channel.send("zaten ayarlı **DEĞİL** ID'ler.")

db.delete(`sescikcik_${message.guild.id}`)
db.delete(`sescikcikk_${message.guild.id}`)
db.delete(`sescikcikkk_${message.guild.id}`)
message.channel.send("hallettim! sıfırlandı.")
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};

exports.help = {
    name: "panel-sıfırla"
};