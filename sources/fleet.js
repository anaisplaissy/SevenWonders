const EventEmitter = require('events');

class Fleet {
  constructor(timeFactor) {
    this.age_ = 20;
    this.spaceshipsNb_ = 0;
    this.timeFactor_ = timeFactor || 2000;
    this.fleetEvent_ = new EventEmitter();
  }

  init() {
    this.fleetEvent_.setMaxListeners(50);
    this.gaiaInterval_ = setInterval(() => {
      const nb = Math.floor(Math.random() * 100);
      {
        this.fleetEvent_.emit('aging', this.age);
        this.fleetEvent_.emit('breakfast', nb);
      }

      if (Math.random() > 0.99) {
        this.fleetEvent_.emit('disease');
      }

      if (Math.random() > 0.8) {
        this.fleetEvent_.emit('buy', nb);
      }

      if(this.spaceshipsNb !== 0) {
          this.fleetEvent_.on('disease', () => {
              console.log('\n*************** SPACESHIPS NEWS ***************\n'),
                  console.log(
                      'Travelling through an asteroid field, most of the fleet perished..'
                  ),
                  console.log('\n*********************************************\n'),
                  (this.spaceshipsNb_ = Math.floor(this.spaceshipsNb_ * 0.01));
          });
      }

      this.fleetEvent_.on('aging', age => this.getOlder(age));
    }, this.timeFactor_);
  }

  get age() {
    return this.age_;
  }

  get spaceshipsNb() {
    return this.spaceshipsNb_;
  }

  set setSpaceshipsNb(spaceshipsNb) {
    this.spaceshipsNb_ = spaceshipsNb;
  }

  getOlder(age) {
    age = this.age + 1;

    if (age > 70) {
      console.log('\n*************** SPACESHIPS NEWS ***************\n');
      console.log('Spaceships of this fleet are old models, they need retirement');
      console.log('\n*********************************************\n');
      this.spaceshipsNb_ = 0;
    }
  }

  increaseSpaceshipsNb(amount) {
    this.spaceshipsNb_ += amount;
  }
}

module.exports = {Fleet};
