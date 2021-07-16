/*kod parçalara ayrılmıştır. dikkat edin.*/

//DİKKAT: komutlar/panel-kur.js dosyası
const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
exports.run = async(client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("yetkin yok")
let theartist = args[0]
let theartistt = args[1]
let theartisttt = args[2]
if(!theartist) return message.channel.send(`
Yanlış kullanım. Kılavuz:
Öncelikle bir kategoride üç tane ses kanalı aç. Sonra, ${ayarlar.prefix}panel-kur ID1 ID2 ID3 yaz.
Orada, ID1 yazan yere, birinci ses kanalının ID'sini; ID2 yazan yere ikinci kurduğun ses kanalının ID'sini yaz. ID3 yazan yere ise, üçüncü kurduğun ses kanalının ID'sini yaz.
Sunucuya biri katıldığında kanal devreye girecek.
Örnek Kullanım: \`.panel-kur 844471519911739402 847439621952110633 808799171762454530\`
`)
if(!theartistt || !theartisttt) return message.channel.send(`
Yanlış kullanım. Kılavuz:
Öncelikle bir kategoride üç tane ses kanalı aç. Sonra, ${ayarlar.prefix}panel-kur ID1 ID2 ID3 yaz.
Orada, ID1 yazan yere, birinci ses kanalının ID'sini; ID2 yazan yere ikinci kurduğun ses kanalının ID'sini yaz. ID3 yazan yere ise, üçüncü kurduğun ses kanalının ID'sini yaz.
Sunucuya biri katıldığında kanal devreye girecek.
Örnek Kullanım: \`.panel-kur 844471519911739402 847439621952110633 808799171762454530\`
`)
let kontrol = await db.fetch(`sescikcik_${message.guild.id}`)
let kontrol2 = await db.fetch(`sescikcikk_${message.guild.id}`)
let kontrol3 = await db.fetch(`sescikcikkk_${message.guild.id}`)
if(kontrol && kontrol2 && kontrol3) return message.channel.send("zaten ayarlı ID'ler.")

db.set(`sescikcik_${message.guild.id}`, theartist)
db.set(`sescikcikk_${message.guild.id}`, theartistt)
db.set(`sescikcikkk_${message.guild.id}`, theartisttt)
message.channel.send("hallettim! sunucuya biri katıldığında kanallar güncellenecek.")
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};

exports.help = {
    name: "panel-kur"
};
