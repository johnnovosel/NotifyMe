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
    if(message.content === '#count') {
        setInterval(function () {
            console.log('it worked');
                message.channel.fetchMessages({limit: 5})
                .then(messages => {
                    messages.array().forEach( message => console.log(message.content));
                }).catch(err => console.log(err));
                // console.log(messages.get('content'));
        }, 500);
    }
}



bot.login(config.discordToken);


