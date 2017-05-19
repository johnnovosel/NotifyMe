var config = require('./config');
var channel = require('./isChannel');
var channelVids = require('yt-channel-videos')(config.yt);
console.log(channel);

var videoNum;

channelVids.uploadsAfterDate(channel, new Date(2017, 1, 1))
.then(function(newVideos) {
    videoNum = newVideos.videoCount;
});

module.exports = videoNum;