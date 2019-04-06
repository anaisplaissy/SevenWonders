const EventEmitter = require('events');

class Army {
    constructor(timeFactor) {
        this.age_ = 20;
        this.solidersNb_ = 0;
        this.timeFactor_ = timeFactor || 1000;
        this.armyEvent_ = new EventEmitter();
    }

}
