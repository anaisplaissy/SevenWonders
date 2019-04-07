const EventEmitter = require('events');

class Divinity {
  constructor(name, timeFactor) {
    this.name_ = name || 'UNKDIVINITY';
    this.fuel_ = 0;
    this.credit_ = 0;
    this.worldEvents_ = new EventEmitter();
    this.timeFactor_ = timeFactor || 2000;
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      this.worldEvents.emit('favor', {
        fuel: this.fuel * 0.1,
        credit: this.credit * 0.1
      });

      if (Math.random() > 0.95) {
        this.worldEvents.emit('blessing', {
          fuel: 100 * this.fuel,
          credit: 100 * this.credit
        });
      }

      if (Math.random() > 0.99) {
        this.worldEvents.emit('retribution', Math.floor(10000 * Math.random()));
      }
    }, this.timeFactor);
  }

  offeringfuel(offer) {
    return new Promise((resolve, reject) => {
      if (typeof offer === 'number') {
        setTimeout(() => {
          this.fuel_ = offer >= 0 ? this.fuel + offer : 0;
          resolve();
        }, 4 * this.timeFactor * Math.random());
      } else {
        reject(
          new Error(
            `You didn't gave a number of fuel to ${this.name}, Earth collapsed`
          )
        );
      }
    });
  }

  offeringcredit(offer) {
    return new Promise((resolve, reject) => {
      if (typeof offer === 'number') {
        setTimeout(() => {
          this.credit_ = offer >= 0 ? this.credit + offer : 0;
          resolve();
        }, 4 * this.timeFactor * Math.random());
      } else {
        reject(
          new Error(
            `You didn't gave a number of credit to ${
              this.name
            }, Earth collapsed`
          )
        );
      }
    });
  }

  get fuel() {
    return this.fuel_;
  }

  get credit() {
    return this.credit_;
  }

  get worldEvents() {
    return this.worldEvents_;
  }

  get name() {
    return this.name_;
  }

  get timeFactor() {
    return this.timeFactor_;
  }

  endWorld() {
    clearInterval(this.gaiaInterval_);
  }
}

module.exports = {Divinity};
