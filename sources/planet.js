const {Divinity} = require('./divinity');
const {Fleet} = require('./fleet');

class Planet {
  constructor(name, divinityName) {
    this.name_ = name || 'UNKPlanet';
    this.divinity_ = new Divinity(divinityName);
    this.fuel_ = 1000;
    this.credit_ = 1000;
    this.fleet_ = new Fleet();
    this.nbTrader_ = 5;
    this.init();
  }

  init() {
    this.fleet_.init();
    this.fleet_.fleetEvent_.on('aging', () => this.getOlder());
    this.fleet_.fleetEvent_.on('buy', nb => this.buySpaceships(nb));
    this.fleet_.fleetEvent_.on('breakfast', nb => this.fleetEats(nb));
    this.divinity_.init();
    this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
    this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));
    this.divinity_.worldEvents.on('retribution', shit => this.getShit(shit));
  }

  getShit(s) {
    this.fuel_ += Math.floor(s.fuel);
    this.credit_ += Math.floor(s.credit);
  }

  giveShit() {
    this.divinity_.offeringfuel(this.fuel_);
    this.divinity_.offeringcredit(this.credit_);
    this.fuel_ = 0;
    this.credit_ = 0;
  }

  get name() {
    return this.name_;
  }

  get credit() {
    return this.credit_;
  }

  get fuel() {
    return this.fuel_;
  }

  set credit(credit) {
    this.credit_ = credit;
  }

  set fuel(fuel) {
    this.fuel_ = fuel;
  }

  get fleet() {
    return this.fleet_;
  }

  buySpaceships(nb) {
    const price = nb * 10;
    if (nb !== 0) {
      console.log('\n*************** SPACESHIPS NEWS ***************\n');
      if (this.fuel !== 0) {
        if (this.credit > price) {
          this.fleet.increaseSpaceshipsNb(nb);
          console.log(nb + ' spaceships have been bought in ' + this.name);
          this.credit -= price;
        } else {
          console.log('Not enough credit to get spaceships in ' + this.name);
        }
      } else {
        console.log('Not enough fuel to refill spaceships in ' + this.name);
      }

      console.log('\n*********************************************\n');
    }
  }

  fleetEats(nb) {
    if (this.fleet.spaceshipsNb > 0) {
      this.fuel -= nb * 3;
      if (this.fuel < 0) {
        this.fuel = 0;
        this.fleet.spaceshipsNb_ = 0;
        console.log('\n*************** SPACESHIPS NEWS ***************\n');
        console.log('No fuel , No Ships');
        console.log('\n*********************************************\n');
      }
    }
  }

  getOlder() {
    if (this.fleet.age > 70) {
      console.log('\n*************** SPACESHIPS NEWS ***************\n');
      console.log(
        'spaceships of' +
          this.name +
          "'s fleet are too old, they stop being an fleet"
      );
      console.log('\n*********************************************\n');
    }
  }

  get nbTrader() {
    return this.nbTrader_;
  }

  set nbTrader(trader) {
    this.nbTrader_ = trader;
  }
}

module.exports = {Planet};
