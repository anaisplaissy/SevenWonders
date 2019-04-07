const EventEmitter = require('events');

class Trade {
  constructor(planets, timeFactor) {
    this.planets = planets;
    this.worldTrade_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 2000;
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      if (Math.random() > 0.999) {
        this.worldTrade_.emit('trade', this.planets);
      }
    }, this.timeFactor);
    this.worldTrade_.on('trade', planets => this.trade(planets));
  }

  planetChoice(planets) {
    const min = 0;
    const max = planets.length;
    let indexPlanet0;
    let indexPlanet1;

    indexPlanet0 = Math.floor(Math.random() * (max - min) + min);

    do {
      indexPlanet1 = Math.floor(Math.random() * (max - min) + min);
    } while (indexPlanet1 === indexPlanet0);

    return [indexPlanet0, indexPlanet1];
  }

  trade(planet) {
    const planets = this.planetChoice(planet);
    const indexPlanet0 = planets[0];
    const indexPlanet1 = planets[1];

    const maxfuel = planet[indexPlanet1].credit;
    const minfuel = 0;
    const fuelQuantity = Math.floor(
      Math.random() * (maxfuel - minfuel) + minfuel
    );
    const fuelPrice = fuelQuantity * 0.5;

    if (
      Math.random() > 0.5 &&
      planet[indexPlanet0].nbTrader > 0 &&
      planet[indexPlanet1].nbTrader > 0 &&
      planet[indexPlanet0].credit > fuelPrice &&
      planet[indexPlanet1].fuel > 0 &&
      planet[indexPlanet1].fuel > fuelQuantity
    ) {
      console.log('\n*************** TRADE IN PROGRESS ***************\n ');

      console.log(
        planet[indexPlanet0].name +
          ' posseses ' +
          planet[indexPlanet0].fuel +
          ' fuels and ' +
          planet[indexPlanet0].credit +
          ' credits'
      );
      console.log(
        planet[indexPlanet1].name +
          ' posseses ' +
          planet[indexPlanet1].fuel +
          ' fuels and ' +
          planet[indexPlanet1].credit +
          ' credits\n'
      );

      console.log(
        '===> ' +
          planet[indexPlanet0].name +
          ' buy ' +
          fuelQuantity +
          ' fuels to ' +
          planet[indexPlanet1].name +
          ' for ' +
          fuelPrice +
          ' credits ' +
          '\n'
      );

      planet[indexPlanet0].fuel = planet[indexPlanet0].fuel + fuelQuantity;
      planet[indexPlanet1].fuel = planet[indexPlanet1].fuel - fuelQuantity;

      planet[indexPlanet1].credit = planet[indexPlanet1].credit + fuelPrice;
      planet[indexPlanet0].credit = planet[indexPlanet0].credit - fuelPrice;

      console.log(
        planet[indexPlanet0].name +
          ' posseses ' +
          planet[indexPlanet0].fuel +
          ' fuels and ' +
          planet[indexPlanet0].credit +
          ' credits'
      );
      console.log(
        planet[indexPlanet1].name +
          ' posseses ' +
          planet[indexPlanet1].fuel +
          ' fuels and ' +
          planet[indexPlanet1].credit +
          ' credits'
      );
      console.log('\n*************************************************\n ');
    } else if (Math.random() > 0.5 && planet[indexPlanet0].nbTrader > 0) {
      console.log('\n***************** TRADER ATTACK *****************\n ');
      console.log(
        'An attack occurred \nA trader from ' +
          planet[indexPlanet0].name +
          ' is dead'
      );
      console.log('\n*************************************************\n ');
      planet[indexPlanet0].nbTrader -= 1;
    }
  }
}

module.exports = {Trade};
