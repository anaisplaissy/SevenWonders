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

    cityChoice(cites)
    {
        const min = 0;
        const max = cites.length;
        var index_city_0, index_city_1;

        index_city_0 = Math.floor(Math.random()*(max - min)+min);

        do
        {
            index_city_1 = Math.floor(Math.random()*(max - min)+min);
        }while(index_city_1 == index_city_0)

        return [index_city_0,index_city_1];
    }
}
