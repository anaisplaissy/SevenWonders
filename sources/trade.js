const EventEmitter = require('events');

class Trade {
  constructor(cites, timeFactor) {
    this.cites = cites;
    this.worldTrade_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 2000;
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
      cite[index_cite_1].corn > 0 &&
      cite[index_cite_1].corn > cornQuantity
    ) {
      console.log('\n*************** TRADE IN PROGRESS ***************\n ');

      console.log(
        cite[index_cite_0].name +
          ' posseses ' +
          cite[index_cite_0].corn +
          ' corns and ' +
          cite[index_cite_0].gold +
          ' golds'
      );
      console.log(
        cite[index_cite_1].name +
          ' posseses ' +
          cite[index_cite_1].corn +
          ' corns and ' +
          cite[index_cite_1].gold +
          ' golds\n'
      );

      console.log(
        '===> ' +
          cite[index_cite_0].name +
          ' buy ' +
          cornQuantity +
          ' corns to ' +
          cite[index_cite_1].name +
          ' for ' +
          cornPrice +
          ' golds ' +
          '\n'
      );

      cite[index_cite_0].corn = cite[index_cite_0].corn + cornQuantity;
      cite[index_cite_1].corn = cite[index_cite_1].corn - cornQuantity;

      cite[index_cite_1].gold = cite[index_cite_1].gold + cornPrice;
      cite[index_cite_0].gold = cite[index_cite_0].gold - cornPrice;

      console.log(
        cite[index_cite_0].name +
          ' posseses ' +
          cite[index_cite_0].corn +
          ' corns and ' +
          cite[index_cite_0].gold +
          ' golds'
      );
      console.log(
        cite[index_cite_1].name +
          ' posseses ' +
          cite[index_cite_1].corn +
          ' corns and ' +
          cite[index_cite_1].gold +
          ' golds'
      );
      console.log('\n*************************************************\n ');
    } else if (Math.random() > 0.5 && cite[index_cite_0].nbTrader > 0) {
      console.log('\n***************** TRADER ATTACK *****************\n ');
      console.log(
        'An attack occurred \nA trader from ' +
          cite[index_cite_0].name +
          ' is dead'
      );
      console.log('\n*************************************************\n ');
      cite[index_cite_0].nbTrader -= 1;
    }
  }
}

module.exports = {Trade};
