const EventEmitter = require('events');
const {Divinity} = require('./divinity');

class City {
  constructor(name, divinityName) {
    this.name_ = name || 'UNKCITY';
    this.divinity_ = new Divinity(divinityName);
    this.corn_ = 1000;
    this.gold_ = 1000;
    this.nbTrader_ = 2;
    this.init();
  }

  init() {
    this.divinity_.init();
    this.divinity_.worldEvents.on('favor', shit => this.getShit(shit));
    this.divinity_.worldEvents.on('blessing', shit => this.getShit(shit));
    this.divinity_.worldEvents.on('favor', () => this.corn);
    this.divinity_.worldEvents.on('favor', () => this.gold);
    // This.divinity_.worldEvents.on('retribution', ()  => this.getShit(shit));
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
