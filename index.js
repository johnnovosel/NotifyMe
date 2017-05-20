var isChannel = require('is-youtube-channel'),
    config = require('./config'),
    User = require('./lib/user.js'),
    Channel = require('./lib/Channels'),
    Discord = require('discord.js');

// required variables for commands
var userArray = [];
var channelArray = [];
var channelNum = 0;

// list of commands
var commands = new Map([
    ['ls', function () {

    }],
    ['add', function (space, message, username) {
        let channelName = message.content.substring(space + 1).toLowerCase();

        isChannel(channelName, function (err, valid) {
            if (err) {
                console.log("Error");
            } else {
                if (valid == true) {
                    console.log('valid channel');
                    message.reply('Added ' + channelName + ' to your subscriptions');

                    if (channelNum === 0) {
                        let channel = new Channel(channelName);
                        channelArray.push(channel);
                        channelArray[0].addSub(username);
                        channelNum++;
                    } else {

                        let found = false;
                        for (var i = 0; i < channelNum; i++) {
                            if (channelNum > 0 && channelName === channelArray[i].getChannelName()) {
                                channelArray[i].addSub(username);
                                found = true;
                                break;
                            }
                        }

                        if (!found) {
                            let channel = new Channel(channelName);
                            channelArray.push(channel);
                            channelNum++;
                            channelArray[channelNum - 1].addSub(username);
                            IncUserList(username, channelName);
                        }
                    }
                    function IncUserList(username, channelName) {
                        for (var i = 0; i < userArray.length; i++) {
                            if (username == userArray[i].getUsername) {
                                userArray[i].incCount();
                                userArray[i].addSub(channelName);
                            }
                        }
                    }
                }
                else {
                    message.reply('This youtube channel does not exist');
                }
            }
        });

    }],
    ['create', function (space, message, username) {
        let person = new User(username);

        userArray.push(person);
        message.reply('Created profile');
    }]
]);

const bot = new Discord.Client();

// turns bot on 
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

// goes through each command and checks it against the commands map, if it finds one it executes it
function doCommand(message) {
    let space = message.content.indexOf(' ');
    if (space === -1) {
        space = message.content.length;
    }
    let cmd = message.content.substring(1, space).toLowerCase();
    let username = message.author.username + '#' + message.author.discriminator;

    let found = false;
    for (let key of commands.keys()) {
        if (cmd === key) {
            commands.get(cmd)(space, message, username);
            console.log('good command');
            found = true
        }
    }
    if (found === false) {
        console.log('Bad command');
        message.reply('That is not a valid command');
    }
}

// logs bot on with secret token
bot.login(config.discordToken);

function checkSubs() {
    
}

setInterval(checkSubs(), 1000*60*15);

