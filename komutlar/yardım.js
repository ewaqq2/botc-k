const discord = require('discord.js');
  exports.run = async(client, message, args) => {



const embed = new discord.MessageEmbed()
.setColor('RANDOM')
.setAuthor(`${client.user.username}`)
.setDescription(`
    Mesaj
    `)
message.channel.send(embed)
};
exports.conf = {
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "sorma"
}