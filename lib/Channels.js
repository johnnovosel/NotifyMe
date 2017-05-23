var channelVids = require('yt-channel-videos')(process.env.YOUTUBE_KEY);

module.exports = class Channel {
    constructor(channelName) {
        this.channelName = channelName;
        this.subscriberList = [];
        this.subCount = 1;
        this.lastVidID;
    }

    addSub(user) {
        this.subCount++;
        this.subscriberList.push(user);
    }

    getChannelName() {
        return this.channelName;
    }

    getSubList() {
        for(var i = 0; i < this.subCount; i++) {
            console.log(this.subscriberList[i]);
        }
    }

    getSubCount() {
        return this.subCount;
    }

    async updateVideoID(channelName) {
        this.lastVidID = (await channelVids.allUploads(channelName)).items[0].id;
        console.log(this.lastVidID);
    }
}