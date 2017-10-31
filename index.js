var config = require('./config'),
    Discord = require('discord.js');

const bot = new Discord.Client();

bot.on('ready', function () {
    console.log('NotifyBot is on.');

    if (config.env == 'dev') {
        bot.user.setStatus('dnd').catch(err => console.error(err));
        bot.user.setGame('Development').catch(err => console.error(err));
        console.log('status set to dnd');
    } else {
        bot.user.setStatus('Online').catch(err => console.error(err));
        console.log('status set to online');
    }
});

bot.on('message', function (message) {
    if (message.content[0] === '#') {
        doCommand(message);
    }
});


function doCommand(message) {
    let space = message.content.indexOf(' ');
    
}

bot.login(config.discordToken);


