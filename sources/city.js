const {Divinity} = require('./divinity');
const {Army} = require('./army');

class City {
  constructor(name, divinityName) {
    this.name_ = name || 'UNKCITY';
    this.divinity_ = new Divinity(divinityName);
    this.corn_ = 1000;
    this.gold_ = 1000;
    this.army_ = new Army();
    this.init();
  }

  init() {
    this.army_.init();
    this.army_.armyEvent_.on('aging', () => this.getOlder());
    this.army_.armyEvent_.on('buy', nb => this.buySoldiers(nb));
    this.army_.armyEvent_.on('breakfast', nb => this.armyEats(nb));
    this.divinity_.init();
    this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
    this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));
    this.divinity_.worldEvents.on('favor', () => this.showShit());
    this.divinity_.worldEvents.on(
      'retribution',
      () => console.log('reti'),
      shit => this.getShit(shit)
    );
  }

  getShit(s) {
    this.corn_ += Math.floor(s.corn);
    this.gold_ += Math.floor(s.gold);
  }

  giveShit() {
    this.divinity_.offeringCorn(this.corn_);
    this.divinity_.offeringGold(this.gold_);
    this.corn_ = 0;
    this.gold_ = 0;
  }

  showShit() {
    console.log(`${this.name_}: C ${this.corn_}, G ${this.gold_}`);
  }

  get name() {
    return this.name_;
  }

  get gold() {
    return this.gold_;
  }

  get corn() {
    return this.corn_;
  }

  set gold(gold) {
    this.gold_ = gold;
  }

  set corn(corn) {
    this.corn_ = corn;
  }

  get army() {
    return this.army_;
  }

  buySoldiers(nb) {
    const price = nb * 10;
    if (nb !== 0) {
      if (this.corn !== 0) {
        if (this.gold > price) {
          this.army.increaseSoldiersNb(nb);
          console.log(nb + ' soliders have been bought in ' + this.name);
          this.gold -= price;
        } else {
          console.log('Not enough gold to get soliders in ' + this.name);
        }
      } else {
        console.log('Not enough crop to feed soliders in ' + this.name);
      }
    }
  }

  armyEats(nb) {
    if (this.army.soldiersNb > 0) {
      this.corn -= nb * 3;
      if (this.corn < 0) {
        this.corn = 0;
        this.army.soldiersNb_ = 0;
        console.log('No food , No army');
      }
    }
  }

  getOlder() {
    if (this.army.age > 70) {
      console.log(
        'Soliders of' +
          this.name +
          "'s army are too old, they stop being an army"
      );
    }
  }
}

module.exports = {City};
