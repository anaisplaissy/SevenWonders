const EventEmitter = require('events');

class Army {
    constructor(timeFactor) {
        this.age_ = 20;
        this.solidersNb_ = 0;
        this.timeFactor_ = timeFactor || 1000;
        this.armyEvent_ = new EventEmitter();
    }

    init()
    {
        let nb=Math.floor(Math.random()*100);

        this.armyEvent_.setMaxListeners(50);
        this.gaiaInterval_ = setInterval(() => {

            {
                this.armyEvent_.emit('aging',this.age);
                this.armyEvent_.emit('breakfast' , nb )
            }

            if(Math.random() > 0.98)
            {
                this.armyEvent_.emit('disease')
            }

            if(Math.random() > 0.80)
            {
                this.armyEvent_.emit('buy' , nb );
            }

            this.armyEvent_.on('disease',
                () =>
                {
                    console.log('Black Plague is upon your army, most of soliders died..') ,
                        this.solidersNb_ = Math.floor((this.solidersNb_)*0.01)
                });

            this.armyEvent_.on('aging', age => this.GetOlder(age));


        }, this.timeFactor_);

    }

}
