const EventEmitter = require('events');

class Army {
  constructor(timeFactor) {
    this.age_ = 20;
    this.soldiersNb_ = 0;
    this.timeFactor_ = timeFactor || 2000;
    this.armyEvent_ = new EventEmitter();
  }

  init() {
    this.armyEvent_.setMaxListeners(50);
    this.gaiaInterval_ = setInterval(() => {
      const nb = Math.floor(Math.random() * 100);
      {
        this.armyEvent_.emit('aging', this.age);
        this.armyEvent_.emit('breakfast', nb);
      }

      if (Math.random() > 0.99) {
        this.armyEvent_.emit('disease');
      }

      if (Math.random() > 0.8) {
        this.armyEvent_.emit('buy', nb);
      }

      if(this.soldiersNb !== 0) {
          this.armyEvent_.on('disease', () => {
              console.log('\n*************** SOLDIERS NEWS ***************\n'),
                  console.log(
                      'Black Plague is upon your army, most of Soldiers died..'
                  ),
                  console.log('\n*********************************************\n'),
                  (this.soldiersNb_ = Math.floor(this.soldiersNb_ * 0.01));
          });
      }

      this.armyEvent_.on('aging', age => this.getOlder(age));
    }, this.timeFactor_);
  }

  get age() {
    return this.age_;
  }

  get soldiersNb() {
    return this.soldiersNb_;
  }

  set setSoldiersNb(soldiersNb) {
    this.soldiersNb_ = soldiersNb;
  }

  getOlder(age) {
    age = this.age + 1;

    if (age > 70) {
      console.log('\n*************** SOLDIERS NEWS ***************\n');
      console.log('Soldiers of this army are too old, they need retirement');
      console.log('\n*********************************************\n');
      this.soldiersNb_ = 0;
    }
  }

  increaseSoldiersNb(amount) {
    this.soldiersNb_ += amount;
  }
}

module.exports = {Army};
