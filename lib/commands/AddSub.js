var Discord = require('discord.js'),
    isChannel = require('is-youtube-channel'),
    Channel = require('../Channels');

var channelNum = 0;
var channelArray = [];

module.exports.ChannelArray = channelArray;

module.exports.Command = function (space, message, userObject) {
    let channelName = message.content.substring(space + 1).toLowerCase();

    isChannel(channelName, function (err, valid) {
        if (err) {
            console.error("Error, cannot find channel");
            message.reply('That channel does not exist.');

        } else {
            if (valid == true) {
                console.log('Valid channel input by ' + message.author.username);
                let channel = new Channel(channelName);

                if (channelNum === 0) {
                    channelArray.push(channel);
                    channelArray[0].addSub(userObject);
                    channelArray[0].updateVideoID(channelName).catch(err => console.error(err));
                    message.reply('Added ' + channelName + ' to your subscriptions');
                    channelNum++;
                } else {
                    let foundInArray = false;

                    for (var i = 0; i < channelNum; i++) {
                        if (channelNum > 0 && channelName === channelArray[i].getChannelName()) {
                            message.reply('Added ' + channelName + ' to your subscriptions');
                            channelArray[i].addSub(userObject);
                            foundInArray = true;
                            break;
                        }
                    }

                    if (!foundInArray) {
                        message.reply('Added ' + channelName + ' to your subscriptions');
                        channelArray.push(channel);
                        channelArray[channelNum - 1].addSub(userObject);
                        channelArray[0].updateVideoID(channelName).catch(err => console.error(err));
                        channelNum++;
                    }
                }
            }
        }
    });

};

function ChannelSubCheck(channelName) {

}
