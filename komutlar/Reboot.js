const Discord = require('discord.js');
const fetch = require("node-fetch");
exports.run = (client, message, args) => {
  if(message.author.id !== "758775600835198977") if(message.author.id !== "758775600835198977") return message.channel.send("Bu Komutu Sadece Rie Kullanbilir.")
	message.channel.send(" Bot yeniden başlatılıyor.").then(msg => {
		console.log(`BOT : Yeniden başlatılıyor...`);
		process.exit(1);
	})
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: []
};
exports.help = {
	name: 'reboot',
	description: 'Botu Yeniden Başlatır.',
	usage: 'reboot'
};