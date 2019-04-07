const EventEmitter = require('events');

class Trade {
  constructor(cites, timeFactor) {
    this.cites = cites;
    this.worldTrade_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 1000;
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      if (Math.random() > 0.999) {
        this.worldTrade_.emit('trade', this.cites);
      }
    }, this.timeFactor);
    this.worldTrade_.on('trade', cites => this.trade(cites));
  }

  cityChoice(cites) {
    const min = 0;
    const max = cites.length;
    let index_city_0;
    let index_city_1;

    index_city_0 = Math.floor(Math.random() * (max - min) + min);

    do {
      index_city_1 = Math.floor(Math.random() * (max - min) + min);
    } while (index_city_1 == index_city_0);

    return [index_city_0, index_city_1];
  }

  trade(cite) {
    const cites = this.cityChoice(cite);
    const index_cite_0 = cites[0];
    const index_cite_1 = cites[1];

    const maxCorn = cite[index_cite_1].gold;
    const minCorn = 0;
    const cornQuantity = Math.floor(
      Math.random() * (maxCorn - minCorn) + minCorn
    );
    const cornPrice = cornQuantity * 0.5;

    if (
      Math.random() > 0.5 &&
      cite[index_cite_0].nbTrader > 0 &&
      cite[index_cite_1].nbTrader > 0 &&
      cite[index_cite_0].gold > cornPrice &&
      cite[index_cite_1].corn > 0
    ) {
      console.log('\n\n***** TRADE TRADE IN PROGRESS ***** : \n\n ');

      console.log(
        cite[index_cite_0].name +
          ' posseses ' +
          cite[index_cite_0].corn +
          ' Corns and ' +
          cite[index_cite_0].gold +
          ' Golds'
      );
      console.log(
        cite[index_cite_1].name +
          ' posseses ' +
          cite[index_cite_1].corn +
          ' Corns and ' +
          cite[index_cite_1].gold +
          ' Golds\n'
      );

      console.log(
        cite[index_cite_0].name +
          ' buy corn to ' +
          cite[index_cite_1].name +
          '\n'
      );

      cite[index_cite_0].corn = cite[index_cite_0].corn + cornQuantity;
      cite[index_cite_1].corn = cite[1].corn - cornQuantity;

      cite[index_cite_1].gold = cite[index_cite_1].gold + cornPrice;
      cite[index_cite_0].gold = cite[0].gold - cornPrice;

      console.log(
        cite[index_cite_0].name +
          ' posseses ' +
          cite[index_cite_0].corn +
          ' Corns and ' +
          cite[index_cite_0].gold +
          ' Golds'
      );
      console.log(
        cite[index_cite_1].name +
          ' posseses ' +
          cite[index_cite_1].corn +
          ' Corns and ' +
          cite[index_cite_1].gold +
          ' Golds\n'
      );
    } else if (Math.random() > 0.5 && cite[index_cite_0].nbTrader > 0) {
      console.log(
        'Warning : There is an attack **** Trader from the city : ' +
          cite[index_cite_0].name +
          'is dead.'
      );
      cite[index_cite_0].nbTrader -= 1;
    }
  }
}

module.exports = {Trade};
