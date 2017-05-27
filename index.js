var config = require('./config'),
    User = require('./lib/user.js'),
    Channel = require('./lib/Channels'),
    channelVids = require('yt-channel-videos')(process.env.YOUTUBE_KEY),
    Add = require('./lib/commands/AddSub.js'),
    Discord = require('discord.js');

// required variables for commands
var userArray = [];

// list of commands
var commandsMap = new Map([
    ['ls', function () {

    }],
    ['add', function (space, message, userObject) { Add.Command(space, message, userObject) }],
    ['create', function (space, message, username) {
        const channel = bot.channels.find('name', 'bot-commands');
        let person = new User(username);
        channel.send(`Welcome to NotifyBot, ${username}`);
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
    let userObject = message.author;

    let found = false;
    for (let key of commandsMap.keys()) {
        if (cmd === key) {
            commandsMap.get(cmd)(space, message, userObject);
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

async function checkVidNum(channel) {
    console.log('b lastvidid');
    let lastVidID = (await channelVids.allUploads(channel.getChannelName())).items[0].id;
    console.log('a lastvidid');

    if (lastVidID != channel.lastVidID) {
        for (var i = 0; i < channel.subscriberList.length; i++) {
            const guildChannel = bot.channels.find('name', 'bot-commands');

            user = guildChannel.subscriberList[i];
            guildChannel.send(guildChannel.channelName + ` has a new video, ${user}`);
        }
    }
}

setInterval(function () {
    console.log('this is check subs');
    console.log(Add.ChannelArray.length);
    for (var i = 0; i < Add.ChannelArray.length; i++) {
        checkVidNum(Add.ChannelArray[i]).catch(err => console.error(err));
    }
}, 1000 * 60 * 15);


