const Discord = require('discord.js');// gerekli yerleri doldurun.
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const Shard = new Discord.ShardingManager('./index.js', {// main dosyanız
totalShards: 10,//shard sayısı
token: (process.env.token)
}); 



Shard.on('shardCreate', shard => { console.log(`${shard.id+1} IDli Shard Başlatıldı ve Kullanıma Hazır.`)
const webhook = new Discord.WebhookClient("865364103363166248","81msGNYT8QahrK34ctdqAUl1HGWw3bKy4Rch-TjvEAQ_UJmBj2Tkakd4fUcD3xJULDvr")

let embed = new Discord.MessageEmbed()
.setDescription(`${shard.id+1} idli shard bağlanıyo`)
webhook.send(embed)

setTimeout(() => {
const webhook = new Discord.WebhookClient("865364103363166248","81msGNYT8QahrK34ctdqAUl1HGWw3bKy4Rch-TjvEAQ_UJmBj2Tkakd4fUcD3xJULDvr")
let embed = new Discord.MessageEmbed()
.setDescription(`${shard.id+1} idli shard bağlandı`)
webhook.send(embed)
}, 9000)
});

setTimeout(() => {
Shard.broadcastEval("process.exit()");
}, 860000);
Shard.spawn();