const EventEmitter = require('events');

class Trade {
    constructor(cites, timeFactor) {
        this.cites = cites;
        this.worldTrade_ = new EventEmitter();
        this.timeFactor_ = timeFactor || 1000;
    }
}
