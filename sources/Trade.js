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
    let indexCity0;
    let indexCity1;

      indexCity0 = Math.floor(Math.random() * (max - min) + min);

    do {
        indexCity1 = Math.floor(Math.random() * (max - min) + min);
    } while (indexCity1 == indexCity0);

    return [indexCity0, indexCity1];
  }

  trade(cite) {
    const cites = this.cityChoice(cite);
    const indexCity0 = cites[0];
    const indexCity1 = cites[1];

    const maxCorn = cite[indexCity1].gold;
    const minCorn = 0;
    const cornQuantity = Math.floor(
      Math.random() * (maxCorn - minCorn) + minCorn
    );
    const cornPrice = cornQuantity * 0.5;

    if (
      Math.random() > 0.5 &&
      cite[indexCity0].nbTrader > 0 &&
      cite[indexCity1].nbTrader > 0 &&
      cite[indexCity0].gold > cornPrice &&
      cite[indexCity1].corn > 0
    ) {
      console.log('\n\n***** TRADE TRADE IN PROGRESS ***** : \n\n ');

      console.log(
        cite[indexCity0].name +
          ' posseses ' +
          cite[indexCity0].corn +
          ' Corns and ' +
          cite[indexCity0].gold +
          ' Golds'
      );
      console.log(
        cite[indexCity1].name +
          ' posseses ' +
          cite[indexCity1].corn +
          ' Corns and ' +
          cite[indexCity1].gold +
          ' Golds\n'
      );

      console.log(
        cite[indexCity0].name +
          ' buy corn to ' +
          cite[indexCity1].name +
          '\n'
      );

      cite[indexCity0].corn = cite[indexCity0].corn + cornQuantity;
      cite[indexCity1].corn = cite[indexCity1].corn - cornQuantity;

      cite[indexCity1].gold = cite[indexCity1].gold + cornPrice;
      cite[indexCity0].gold = cite[indexCity0].gold - cornPrice;

      console.log(
        cite[indexCity0].name +
          ' posseses ' +
          cite[indexCity0].corn +
          ' Corns and ' +
          cite[indexCity0].gold +
          ' Golds'
      );
      console.log(
        cite[indexCity1].name +
          ' posseses ' +
          cite[indexCity1].corn +
          ' Corns and ' +
          cite[indexCity1].gold +
          ' Golds\n'
      );
    } else if (Math.random() > 0.5 && cite[indexCity0].nbTrader > 0) {
      console.log(
        'Warning : There is an attack **** Trader from the city : ' +
          cite[indexCity0].name +
          'is dead.'
      );
      cite[indexCity0].nbTrader -= 1;
    }
  }
}

module.exports = {Trade};
