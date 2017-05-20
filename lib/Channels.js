module.exports = class Channel {
    constructor(channelName) {
        this.channelName = channelName;
        this.subscriberList = [];
        this.subCount = 1;
    }

    addSub(user) {
        this.subCount++;
        this.subscriberList.push(user);
        console.log('sub:' + this.subscriberList[1]);
        console.log('sub:' + this.subscriberList[0]);
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
}