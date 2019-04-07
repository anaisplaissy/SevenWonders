const EventEmitter = require('events');
const {Divinity} = require('./divinity');
const {Army} = require('./army');

class City {
  constructor(name, divinityName) {
    this.name_ = name || 'UNKCITY';
    this.divinity_ = new Divinity(divinityName);
    this.corn_ = 1000;
    this.gold_ = 1000;
    this.nbTrader_ = 10;
    // This.army = new Army(City.this.name);
    this.init();
  }

  init() {
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

  get gold() {
    return this.gold_;
  }

  get corn() {
    return this.corn_;
  }

  get nbTrader() {
    return this.nbTrader_;
  }

  get name() {
    return this.name_;
  }

  set gold(gold) {
    this.gold_ = gold;
  }

  set corn(corn) {
    this.corn_ = corn;
  }

  set nbTrader(trader) {
    this.nbTrader_ = trader;
  }
}

module.exports = {City};
