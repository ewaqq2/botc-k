
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const util = require('minecraft-server-util');
exports.run = async (client, message, args) => { 
let prefix = ayarlar.prefix; 
let db = require("quick.db").get(`sunucumc.${message.guild.id}`)

if(!db) return message.channel.send("Sunucu ayarlı değil. Lütfen Kurulum Yapınız! \n")
  

util.status(db.ip) 
    .then((response) => { //console.log(response);
    
                         
    
  const embed = new Discord.MessageEmbed()
  .setAuthor(`MC Server Status | Bilgi Menüsü`)
  .setTitle(db.name)
  .addField(`IP`, `\`\`\` `+response.host+` \`\`\``,true)
  .addField(`Port`,`\`\`\` `+ response.port +` \`\`\``,true)
  .addField(`Versiyon`,`\`\`\` `+ response.version +` \`\`\``,true)
  .addField(`Oyuncu Sayısı`,`\`\`\` `+ response.onlinePlayers + `/` + response.maxPlayers + ` \`\`\``,true)
  .addField(`Açıklama`,`\`\`\` `+ response.description +` \`\`\``,false)
message.channel.send(embed)
  
});
};                
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['b','']
  }
  exports.help = {
    name: 'bilgi'
  }