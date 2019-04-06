const EventEmitter = require('events');

class Trade {
    constructor(cites, timeFactor) {
        this.cites = cites;
        this.worldTrade_ = new EventEmitter();
        this.timeFactor_ = timeFactor || 1000;
    }

    init() {
        this.gaiaInterval_ = setInterval(() => {

            if (Math.random() > 0.999)
            {
                this.worldTrade_.emit('trade',this.cites);
            }
        }, this.timeFactor);
        this.worldTrade_.on('trade',cites => this.trade(cites));
    }
}
