var  isChannel = require('is-youtube-channel'),
     config = require('./config'),
     Discord = require('discord.js');
 // vidnum = require('./vidNum');

// a list of user objects
var users = new Map();

// user object
class User {
    constructor(username) {
        this.username = username;
        this.sublist = [];
        this.subCount = 0;
    }
}

// list of commands
var commands = new Map([
    ['ls' , function(){
        
    }],
    ['add', function(space, message) {
        let go = false;

        let channelName = message.content.substring(space + 1).toLowerCase();

        isChannel(channelName, function (err, valid) {
            if (err) {
                 console.log("Error");
             } else {
                 if (valid == true) {
                     channelUrl = "https://www.youtube.com/user/" + channelName;
                     go = true;
                }
             }
        });

        // if it is true then we add the channel to the map in the user object
        if (go) {
            
        }
    }],
    ['create' , function(username) {
        users.set(username, new User(username));
    }]
]);

const bot = new Discord.Client();

// turns bot on 
bot.on('ready', function() {
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

bot.on('message', function(message) {
  if (message.content[0] === '#') {
    doCommand(message);
  }
});

// goes through each command and checks it against the commands map, if it finds one it executes it
function doCommand(message) {
    var found = false;
    let space  = message.content.indexOf(' ');
    if (space === -1) {
        space = message.content.length;
    }
    let cmd = message.content.substring(1, space).toLowerCase();

    commands.get(cmd)(message.author.username);
}

// logs bot on with secret token
bot.login(config.discordToken);

//setInterval(' ', 1000*60*15);

