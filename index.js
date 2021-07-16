
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const ytdl = require('ytdl-core');



var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};





client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON
client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};





Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 24) hours -= 24;
    if (hours === 0) hours = 24;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

//ready
client.on('ready', () => {

  client.user.setActivity(`  -yardım | ${client.shard.ids}/10 Shards | Shards RAM: Offline Data Base! Error `)

})


//status
client.on("guildMemberAdd", async member => {
     let tarihh = new Date().getTime()
   let kontrol = await db.fetch(`sescikcik_${member.guild.id}`)
 let kontrol2 = await db.fetch(`sescikcikk_${member.guild.id}`)
let kontrol3 = await db.fetch(`sescikcikkk_${member.guild.id}`)
if(!kontrol && !kontrol2 && !kontrol3) return;
  let bott = member.guild.members.cache.filter(b => b.user.bot).size;
  let uyee = member.guild.memberCount - bott
  client.channels.cache.get(kontrol).setName(`${uyee} Tane Üye Var.`)
  client.channels.cache.get(kontrol2).setName(`Tarih: ${moment.utc(tarihh).format('DD/MM/YYYY')}`)
  client.channels.cache.get(kontrol3).setName(`Son Üye: ${member.user.tag}`)
  });
//



//
process.on('unhandledRejection', error => {
    console.error('API Hatası:', error);
  });


  client.on('error', error => {
    console.error('WebSocket bir hatayla karşılaştı:', error);
});
//

client.login('ODUxODkyMjAyODE5OTQ0NDYx.YL-4cA.anOBgZhMHnaU_hQTZwnn_sC8kPo')


//-----------------------KOMUTLAR-----------------------\\

client.on("message", async message => {
  const Database = require("plasma-db");
const db = new Database("./database.json"); 
  const ai = require('@codare/codare.ai')
let kanal = db.fetch(`yapayzekakanal_${message.guild.id}`)
if(!kanal) return;
if(message.channel.id !== kanal) return;
if(message.author.bot == true) return;
let soru = message.content;
ai.sor(soru).then(enginar => {
return message.channel.send(enginar) 
});
})

//sayaç
client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucuya Katıldı :tada:! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});

//çekiliş

//
client.on("message", async msg => {
  const Database = require("plasma-db");
  const db = new Database("./database.json"); 
    const gereksiz = await db.fetch(`komutsistem_${msg.guild.id}`);
    let engin = db.fetch(`komut_${msg.guild.id}`)
    let enginar = db.fetch(`komutrol_${msg.guild.id}`)
    if (gereksiz === "aktif") {
      if (
        msg.content.toLowerCase() == `!${engin}`
      )
      {
  msg.channel.send('Rolü verdim!')
  msg.member.roles.add(enginar)
      }
      } else if (gereksiz === "deaktif") {
    }
    if (!gereksiz) return;
  });




























  client.on("message", async message => {
    if(message.author.bot) return;
    var spl = message.content.split(" ");
    if(spl[0] === ".emoji-rol-ayarla") {
    var args = spl.slice(1);
    var msg, emoji, rol, ee = "";
    try {
      msg = await message.channel.messages.fetch(args[0])
      emoji = args[1]
      rol = message.guild.roles.cache.get(args[2]) || message.mentions.roles.first();
      await msg.react(emoji)
      if(!rol) throw new Error("Düzgün bir rol yaz")
    } catch(e) {
      if(!e) return;
      e = (""+e).split("Error:")[1]
      if(e.includes("Cannot read property") || e.includes("Invalid Form Body")) {
        message.channel.send(`Mesaj id hatalı!`)
      } else if(e.includes("Emoji")) {
        message.channel.send(` Girdiğiniz emoji mesaja eklenemiyor!`)
      } else if(e.includes("ROLÜ")) {
        message.channel.send(`Girdiğiniz rol geçersiz!`)
      }
      ee = e
    }
     if(ee) return;
     message.channel.send(`:white_check_mark: | Emoji rol, **${msg.content}** içerikli mesaja atandı!`)
     db.push(`tepkirol.${message.guild.id}`, {
       kanal: msg.channel.id,
       rol: rol.id,
       mesaj: msg.id,
       emoji: emoji
     })
    } else if(spl[0] === ".emoji-rol-log") {
      var args = spl.slice(1)
      var chan = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first()
      if(!chan) return message.channel.send(`:warning: | Kanal etiketle veya id gir`)
      db.set(`tepkirolkanal.${message.guild.id}`, chan.id)
      message.channel.send(":white_check_mark: | Tepkirol log kanalı "+ chan+ " olarak ayarlandı!")
    }
  })
client.on("raw", async event => {
    if(event.t === "MESSAGE_REACTION_ADD") {
      var get = db.get(`tepkirol.${event.d.guild_id}`)
      if(!get) return;
      var rol = get.find(a => a.emoji === event.d.emoji.name && a.mesaj === event.d.message_id)
      if(!rol) return;
      rol = rol.rol
   
      var member = await client.guilds.cache.get(event.d.guild_id).members.fetch(event.d.user_id)
      member.roles.add(rol);
      var kanal = db.get(`tepkirolkanal.${event.d.guild_id}`)
      if(kanal) {
        var kanal = client.channels.cache.get(kanal)
        kanal.send(member  + " kullanıcısına, **" + kanal.guild.roles.cache.get(rol).name + "** adlı rol verildi! ")
      }
    } else if(event.t === "MESSAGE_REACTION_REMOVE") {
      var get = db.get(`tepkirol.${event.d.guild_id}`)
      if(!get) return;
      var rol = get.find(a => a.emoji === event.d.emoji.name && a.mesaj === event.d.message_id)
      if(!rol) return;
      rol = rol.rol
      var member = await client.guilds.cache.get(event.d.guild_id).members.fetch(event.d.user_id)
      member.roles.remove(rol);
      var kanal = db.get(`tepkirolkanal.${event.d.guild_id}`)
      if(kanal) {
        var kanal = client.channels.cache.get(kanal)
        kanal.send(member + " kullanıcısından, **" + kanal.guild.roles.cache.get(rol).name + "** adlı rol alındı!")
      }
    }
  })






















  const akinator = require("discord-tr-akinator")

  client.on("message", async message => {
      if(message.content.startsWith(`-akinator`)) {
          akinator(message, client);
      }
  });







  const { MusicBot } = require('discord-music-system'); // npm i discord-music-system Yap terminal de falan

client.musicBot = new MusicBot(client, {
    ytApiKey: 'AIzaSyCLw_s81efs90jge1apqGcCqrw8FoAsauk', // yt ap key lazım ab YouTube da videoları var
    prefix: '-', // Botunuzun Prefixiniz yaz fln
    language: 'en' // değiştirme Türkçe yok xd
}); //Github: iUgur

client.on('message', async message => {
    if(message.author.bot) { //Space Giveaway Ekle yaw
        return;
    }; //Discord: iUgur#7464
    client.musicBot.onMessage(message); //Yardım menüsü de var Bi dal al istersen xd
}); //buraya eller isen çalışmaz anla yaw 



















