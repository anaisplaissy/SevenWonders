const EventEmitter = require('events');
const divinity = require('./divinity');

class Display {
  constructor(cities, timeFactor) {
    this.cities_ = cities;
    this.timeFactor_ = timeFactor || 2000;
    this.displayEvent_ = new EventEmitter();
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      this.displayEvent_.emit('display', this.cities_);
    }, this.timeFactor_);

    this.displayEvent_.on('display', cities => this.table(cities));
  }

  table(cities) {
    const tab = {
      'Planet 1': {
        Name: cities[0].name_,
        Corn: cities[0].corn_,
        Gold: cities[0].gold_,
        Traders: cities[0].nbTrader_,
        Soldiers: cities[0].army.soldiersNb_
      },
      'Planet 2': {
        Name: cities[1].name_,
        Corn: cities[1].corn_,
        Gold: cities[1].gold_,
        Traders: cities[1].nbTrader_,
        Soldiers: cities[1].army.soldiersNb_
      },
      'Planet 3': {
        Name: cities[2].name_,
        Corn: cities[2].corn_,
        Gold: cities[2].gold_,
        Traders: cities[2].nbTrader_,
        Soldiers: cities[2].army.soldiersNb_
      },
      'Planet 4': {
        Name: cities[3].name_,
        Corn: cities[3].corn_,
        Gold: cities[3].gold_,
        Traders: cities[3].nbTrader_,
        Soldiers: cities[3].army.soldiersNb_
      },
      'Planet 5': {
        Name: cities[4].name_,
        Corn: cities[4].corn_,
        Gold: cities[4].gold_,
        Traders: cities[4].nbTrader_,
        Soldiers: cities[4].army.soldiersNb_
      }
    };

    console.table(tab);
  }
}

module.exports = {Display};
