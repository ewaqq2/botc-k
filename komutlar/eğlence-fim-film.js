const Discord = require('discord.js');
const film = require('film-apisi')
exports.run = async (client, message, args) => {
    let engin = args.slice(0).join(' ')
if(!engin) return message.channel.send('Lütfen bir film adı girin!')
    async function ara() {
        let sonuç = await film.ara(engin).catch(err => {message.channel.send(`hata 404 inga \n \n ${err}`);});
        const embed = new Discord.MessageEmbed()
.setTitle(sonuç.ismi + " filmi")
.addField('Film adı:', sonuç.ismi)
.addField('Yönetmen:', sonuç.yönetmen)
.addField('Tür:', sonuç.tür)
.addField('Çekim yılı:', sonuç.yıl)
.addField('Puan:', sonuç.puan)
.addField('Süre:', sonuç.süre)
.addField('Başrol:', sonuç.yıldızlar)
.addField('Benzer tavsiyeler:', sonuç.benzerler)
.setImage(sonuç.poster)
return message.channel.send(embed)
          }
        ara()

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'film-ara'
};