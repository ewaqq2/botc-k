const Discord = require("discord.js");
const moment = require("moment");
moment.locale("tr");

exports.run = async (client, message, guild) => {
if (message.author.bot) return;

let Features = {
  ANIMATED_ICON: "Animasyonlu Simge",
  BANNER: "Afiş",
  COMMERCE: "Ticaret",
  COMMUNITY: "Topluluk",
  DISCOVERABLE: "Keşfedilebilir",
  FEATURABLE: "Öne Çıkan",
  INVITE_SPLASH: "Davet Sıçraması",
  NEWS: "Haberler",
  PARTNERED: "Ortak",
  VANITY_URL: "Özel URL",
  VERIFIED: "Doğrulandı",
  WELCOME_SCREEN_ENABLED: "Karşılama ekranı etkinleştirildi",
  MEMBER_VERIFICATION_GATE_ENABLED: "Üye doğrulama bağlantı noktası etkinleştirildi  ",
  VIP_REGIONS: "VIP bölgeler  ",
  PREVIEW_ENABLED: "Önizleme etkin  "
};

const embed = new Discord.MessageEmbed()
.setColor("#60D1F6")
.setThumbnail(message.guild.iconURL())
.addField(`Kurucu`, message.guild.members.cache.get(message.guild.ownerID).user.tag, true)
.addField(`VIP Avantajları`, `${message.guild.features.map(a => Features[a] || a).join(", ") || "None"}`, true)
.addField(`Sunucu Oluşturma Tarihi`, 'Tarih '+moment(message.guild.createdAt).format("DD/MM/YYYY"), true)
.addField(`Toplam Roller`, message.guild.roles.cache.size, true)
.addField(`Üyeler`, `${message.guild.memberCount} Üyeler,\n ${message.guild.members.cache.filter(m => m.user.presence.status === "online" ).size} Aktif\n ${message.guild.members.cache.filter(m => m.user.bot).size} Bot, ${message.guild.members.cache.filter(m => !m.user.bot).size} Toplam İnsan`, true)
.addField(`Toplam Kanallar`, `${message.guild.channels.cache.size} Toplam Kanallar:\n ${message.guild.channels.cache.filter(a => a.type == "category").size} kategoriler\n ${message.guild.channels.cache.filter(a => a.type == "text").size} Metin, ${message.guild.channels.cache.filter(a => a.type == "voice").size} Ses`, true)
.addField(`Boost level`, message.guild.premiumTier,true)
.addField(`Takviye Sayısı`,  message.guild.premiumSubscriptionCount, true)
.setFooter('Sunucu İsmi: ' + message.guild.name + ' | ServerID: ' +   message.guild.id )
message.channel.send({ embed })
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [
    "server-info",
    "guildinfo",
    "guild-info"
  ],
  kategori: "server",
  permLevel: 0
};
exports.help = {
  name: "serverinfo",
};