
module.exports = class User {
    constructor(user) {
        this.username = user.username;
        this.sublist = [];
        this.subCount = 0;
    }

    getUsername() {
        return this.username;
    }

    getCount() {
        return this.subCount;
    }

    incCount() {
        this.subCount++;
    }

    addSub(channelName) {
        this.sublist.push(channelName);
    }

    getSubList() {
        for(var i = 0; i < this.sublist.length; i++) {
            console.log(this.sublist[i]);
        }
    }
}