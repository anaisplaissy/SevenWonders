const EventEmitter = require('events');

class ArmyManager {
  constructor(cities, timeFactor) {
    this.cities_ = cities;
    this.timeFactor_ = timeFactor || 1000;
    this.warEvent_ = new EventEmitter();
    this.init();
  }

  init() {
    this.gaiaInterval_ = setInterval(() => {
      if (Math.random() > 0.9) {
        this.warEvent_.emit('war', this.cities);
      }

      this.warEvent_.on('war', cities => this.War(cities));
    }, this.timeFactor_);
  }

  get cities() {
    return this.cities_;
  }

  War(cities) {
    let city = this.CityChoice(cities);
    let index0 = city[0];
    let index1 = city[1];
    if(cities[index0].army.soldiersNb > 0 || cities[index1].army.soldiersNb > 0 ) {
        if (Math.random() >= 0.5) {
            console.log(cities[index0].name + ' attaque ' + cities[index1].name);
            if (cities[index0].army.soldiersNb > cities[index1].army.soldiersNb) {
                cities[index0].army.SetsoldiersNb = (cities[index0].army.soldiersNb - cities[index1].army.soldiersNb);
                cities[index1].army.SetsoldiersNb = 0;
                console.log(
                    cities[index0].name +
                    ' lost ' +
                    (cities[index0].army.soldiersNb -
                    cities[index1].army.soldiersNb) +
                    ' soldiers during this war'
                );
                console.log(
                    cities[index1].name +
                    " lost all it's soldiers and lost " +
                    cities[index1].corn * 0.9 +
                    ' corn and ' +
                    cities[index1].gold * 0.9 +
                    ' gold'
                );
                cities[index0].gold = Math.floor(cities[index0].gold + cities[index1].gold * 0.9);
                cities[index1].gold = Math.floor(cities[index1].gold * 0.1);
                cities[index0].corn = Math.floor(cities[index0].corn + cities[index1].corn * 0.9);
                cities[index1].corn = Math.floor(cities[index1].corn * 0.1);
                console.log(cities[index0].name + ' won this war against ' + cities[index1].name);
            } else if (cities[index0].army.soldiersNb < cities[index1].army.soldiersNb) {
                cities[index1].army.SetsoldiersNb = (cities[index1].army.soldiersNb - cities[index0].army.soldiersNb);
                cities[index0].army.SetsoldiersNb = 0;
                console.log(
                    cities[index1].name +
                    ' lost ' +
                    (cities[index1].army.soldiersNb -
                    cities[index0].army.soldiersNb) +
                    ' soldiers during this war'
                );
                console.log(
                    cities[index0].name +
                    " lost all it's soldiers "
                );
                console.log(cities[index1].name + ' won this war against ' + cities[index0].name);
            } else {
                console.log('Both forces are equal, this end in a bloodshed');
                cities[index0].army.SetsoldiersNb = 0;
                cities[index1].army.SetsoldiersNb = 0;
            }
        } else {
            console.log(cities[index1].name + ' attack ' + cities[index0].name);
            if (cities[index1].army.soldiersNb > cities[index0].army.soldiersNb) {
                cities[index1].army.SetsoldiersNb = (cities[index1].army.soldiersNb - cities[index0].army.soldiersNb);
                cities[index0].army.SetsoldiersNb = 0;
                console.log(
                    cities[index1].name +
                    ' lost ' +
                    (cities[index1].army.soldiersNb -
                    cities[index0].army.soldiersNb) +
                    ' soldiers during this war'
                );
                console.log(
                    cities[index0].name +
                    " lost all it's soldiers and lost " +
                    cities[index0].corn * 0.9 +
                    ' corn and ' +
                    cities[index0].gold * 0.9 +
                    ' gold'
                );
                cities[index1].gold = Math.floor(cities[index1].gold + cities[index0].gold * 0.9);
                cities[index0].gold = Math.floor(cities[index0].gold * 0.1);
                cities[index1].corn = Math.floor(cities[index1].corn + cities[index0].corn * 0.9);
                cities[index0].corn = Math.floor(cities[index0].corn * 0.1);
                console.log(cities[index1].name + ' won this war against ' + cities[index0].name);
            } else if (cities[index1].army.soldiersNb < cities[index0].army.soldiersNb) {
                cities[index0].army.SetsoldiersNb = (cities[index0].army.soldiersNb - cities[index1].army.soldiersNb);
                cities[index1].army.SetsoldiersNb = 0;
                console.log(
                    cities[index0].name +
                    ' lost ' +
                    (cities[index0].army.soldiersNb -
                    cities[index1].army.soldiersNb) +
                    ' soldiers during this war'
                );
                console.log(
                    cities[index1].name +
                    " lost all it's soldiers "
                );
                console.log(cities[index0].name + ' won this war against ' + cities[index1].name);
            } else {
                console.log('Both forces are equal, this end in a bloodshed');
                cities[index0].army.SetsoldiersNb = 0;
                cities[index1].army.SetsoldiersNb = 0;
            }
        }
    }
  }

  CityChoice(citiesList) {
    const min = 0;
    const max = citiesList.length;
    let index_city_0;
    let index_city_1;

    index_city_0 = Math.floor(Math.random() * (max - min) + min);

    do {
      index_city_1 = Math.floor(Math.random() * (max - min) + min);
    } while (index_city_1 == index_city_0);

    return [index_city_0, index_city_1];
  }
}

module.exports = {ArmyManager};
