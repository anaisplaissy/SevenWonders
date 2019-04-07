const EventEmitter = require('events');

class Display {
  constructor(planets, timeFactor) {
    this.planets_ = planets;
    this.timeFactor_ = timeFactor || 2000;
    this.displayEvent_ = new EventEmitter();
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      this.displayEvent_.emit('display', this.planets_);
    }, this.timeFactor_);

    this.displayEvent_.on('display', planets => this.table(planets));
  }

  table(planets) {
    const tab = {
      'Planet 1': {
        Name: planets[0].name_,
        Credit: planets[0].credit_,
        Spaceships: planets[0].fleet.spaceshipsNb_,
        Fuel: planets[0].fuel_,
        Traders: planets[0].nbTrader_
      },
      'Planet 2': {
        Name: planets[1].name_,
        Credit: planets[1].credit_,
        Spaceships: planets[1].fleet.spaceshipsNb_,
        Fuel: planets[1].fuel_,
        Traders: planets[1].nbTrader_
      },
      'Planet 3': {
        Name: planets[2].name_,
        Credit: planets[2].credit_,
        Spaceships: planets[2].fleet.spaceshipsNb_,
        Fuel: planets[2].fuel_,
        Traders: planets[2].nbTrader_
      },
      'Planet 4': {
        Name: planets[3].name_,
        Credit: planets[3].credit_,
        Spaceships: planets[3].fleet.spaceshipsNb_,
        Fuel: planets[3].fuel_,
        Traders: planets[3].nbTrader_
      },
      'Planet 5': {
        Name: planets[4].name_,
        Credit: planets[4].credit_,
        Spaceships: planets[4].fleet.spaceshipsNb_,
        Fuel: planets[4].fuel_,
        Traders: planets[4].nbTrader_
      },
      'Planet 6': {
        Name: planets[5].name_,
        Credit: planets[5].credit_,
        Spaceships: planets[5].fleet.spaceshipsNb_,
        Fuel: planets[5].fuel_,
        Traders: planets[5].nbTrader_
      },
      'Planet 7': {
        Name: planets[6].name_,
        Credit: planets[6].credit_,
        Spaceships: planets[6].fleet.spaceshipsNb_,
        Fuel: planets[6].fuel_,
        Traders: planets[6].nbTrader_
      }
    };

    console.table(tab);
  }
}

module.exports = {Display};
