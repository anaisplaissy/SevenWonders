const EventEmitter = require('events');

class Trade {
  constructor(cites, timeFactor) {
    this.cites = cites;
    this.worldTrade_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 2000;
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

  cityChoice(cites) {
    const min = 0;
    const max = cites.length;
    let indexCite0;
    let indexCite1;

    indexCite0 = Math.floor(Math.random() * (max - min) + min);

    do {
      indexCite1 = Math.floor(Math.random() * (max - min) + min);
    } while (indexCite1 === indexCite0);

    return [indexCite0, indexCite1];
  }

  trade(cite) {
    const cites = this.cityChoice(cite);
    const indexCite0 = cites[0];
    const indexCite1 = cites[1];

    const maxCorn = cite[indexCite1].gold;
    const minCorn = 0;
    const cornQuantity = Math.floor(
      Math.random() * (maxCorn - minCorn) + minCorn
    );
    const cornPrice = cornQuantity * 0.5;

    if (
      Math.random() > 0.5 &&
      cite[indexCite0].nbTrader > 0 &&
      cite[indexCite1].nbTrader > 0 &&
      cite[indexCite0].gold > cornPrice &&
      cite[indexCite1].corn > 0 &&
      cite[indexCite1].corn > cornQuantity
    ) {
      console.log('\n*************** TRADE IN PROGRESS ***************\n ');

      console.log(
        cite[indexCite0].name +
          ' posseses ' +
          cite[indexCite0].corn +
          ' corns and ' +
          cite[indexCite0].gold +
          ' golds'
      );
      console.log(
        cite[indexCite1].name +
          ' posseses ' +
          cite[indexCite1].corn +
          ' corns and ' +
          cite[indexCite1].gold +
          ' golds\n'
      );

      console.log(
        '===> ' +
          cite[indexCite0].name +
          ' buy ' +
          cornQuantity +
          ' corns to ' +
          cite[indexCite1].name +
          ' for ' +
          cornPrice +
          ' golds ' +
          '\n'
      );

      cite[indexCite0].corn = cite[indexCite0].corn + cornQuantity;
      cite[indexCite1].corn = cite[indexCite1].corn - cornQuantity;

      cite[indexCite1].gold = cite[indexCite1].gold + cornPrice;
      cite[indexCite0].gold = cite[indexCite0].gold - cornPrice;

      console.log(
        cite[indexCite0].name +
          ' posseses ' +
          cite[indexCite0].corn +
          ' corns and ' +
          cite[indexCite0].gold +
          ' golds'
      );
      console.log(
        cite[indexCite1].name +
          ' posseses ' +
          cite[indexCite1].corn +
          ' corns and ' +
          cite[indexCite1].gold +
          ' golds'
      );
      console.log('\n*************************************************\n ');
    } else if (Math.random() > 0.5 && cite[indexCite0].nbTrader > 0) {
      console.log('\n***************** TRADER ATTACK *****************\n ');
      console.log(
        'An attack occurred \nA trader from ' +
          cite[indexCite0].name +
          ' is dead'
      );
      console.log('\n*************************************************\n ');
      cite[indexCite0].nbTrader -= 1;
    }
  }
}

module.exports = {Trade};
