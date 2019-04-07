const EventEmitter = require('events');

class FleetManager {
  constructor(planets, timeFactor) {
    this.planets_ = planets;
    this.timeFactor_ = timeFactor || 2000;
    this.warEvent_ = new EventEmitter();
    this.init();
  }

  init() {
    this.warEvent_.setMaxListeners(50);
    this.gaiaInterval_ = setInterval(() => {
      if (Math.random() > 0.9) {
        this.warEvent_.emit('war', this.planets);
      }

      this.warEvent_.on('war', planets => this.war(planets));
    }, this.timeFactor_);
  }

  get planets() {
    return this.planets_;
  }

  war(planets) {
    const Planet = this.planetChoice(planets);
    const index0 = Planet[0];
    const index1 = Planet[1];
    if (
      planets[index0].fleet.spaceshipsNb > 0 ||
      planets[index1].fleet.spaceshipsNb > 0
    ) {
      if (Math.random() >= 0.5) {
        console.log('\n*************** PLANET ATTACK ***************\n ');
        console.log(planets[index0].name + ' attack ' + planets[index1].name);
        if (
          planets[index0].fleet.spaceshipsNb >
          planets[index1].fleet.spaceshipsNb
        ) {
          planets[index0].fleet.setSpaceshipsNb =
            planets[index0].fleet.spaceshipsNb -
            planets[index1].fleet.spaceshipsNb;
          planets[index1].fleet.setSpaceshipsNb = 0;
          console.log(
            planets[index0].name +
              ' lost ' +
              (planets[index0].fleet.spaceshipsNb -
                planets[index1].fleet.spaceshipsNb) +
              ' spaceships during this war'
          );
          console.log(
            planets[index1].name +
              " lost all it's spaceships and lost " +
              planets[index1].fuel * 0.9 +
              ' fuel and ' +
              planets[index1].credit * 0.9 +
              ' credit'
          );
          planets[index0].credit = Math.floor(
            planets[index0].credit + planets[index1].credit * 0.9
          );
          planets[index1].credit = Math.floor(planets[index1].credit * 0.1);
          planets[index0].fuel = Math.floor(
            planets[index0].fuel + planets[index1].fuel * 0.9
          );
          planets[index1].fuel = Math.floor(planets[index1].fuel * 0.1);
          console.log(
            planets[index0].name +
              ' won this war against ' +
              planets[index1].name
          );
          console.log('\n*********************************************\n ');
        } else if (
          planets[index0].fleet.spaceshipsNb <
          planets[index1].fleet.spaceshipsNb
        ) {
          planets[index1].fleet.setSpaceshipsNb =
            planets[index1].fleet.spaceshipsNb -
            planets[index0].fleet.spaceshipsNb;
          planets[index0].fleet.setSpaceshipsNb = 0;
          console.log(
            planets[index1].name +
              ' lost ' +
              (planets[index1].fleet.spaceshipsNb -
                planets[index0].fleet.spaceshipsNb) +
              ' spaceships during this war'
          );
          console.log(planets[index0].name + " lost all it's spaceships ");
          console.log(
            planets[index1].name +
              ' won this war against ' +
              planets[index0].name
          );
          console.log('\n*********************************************\n ');
        } else {
          console.log('Both forces are equal, this end in a bloodshed');
          console.log('\n*********************************************\n ');
          planets[index0].fleet.setSpaceshipsNb = 0;
          planets[index1].fleet.setSpaceshipsNb = 0;
        }
      } else {
        console.log('\n*************** PLANET ATTACK ***************\n ');
        console.log(planets[index1].name + ' attack ' + planets[index0].name);
        if (
          planets[index1].fleet.spaceshipsNb >
          planets[index0].fleet.spaceshipsNb
        ) {
          planets[index1].fleet.setSpaceshipsNb =
            planets[index1].fleet.spaceshipsNb -
            planets[index0].fleet.spaceshipsNb;
          planets[index0].fleet.setSpaceshipsNb = 0;
          console.log(
            planets[index1].name +
              ' lost ' +
              (planets[index1].fleet.spaceshipsNb -
                planets[index0].fleet.spaceshipsNb) +
              ' spaceships during this war'
          );

          console.log(
            planets[index0].name +
              " lost all it's spaceships and lost " +
              planets[index0].fuel * 0.9 +
              ' fuel and ' +
              planets[index0].credit * 0.9 +
              ' credit'
          );
          planets[index1].credit = Math.floor(
            planets[index1].credit + planets[index0].credit * 0.9
          );
          planets[index0].credit = Math.floor(planets[index0].credit * 0.1);
          planets[index1].fuel = Math.floor(
            planets[index1].fuel + planets[index0].fuel * 0.9
          );
          planets[index0].fuel = Math.floor(planets[index0].fuel * 0.1);
          console.log(
            planets[index1].name +
              ' won this war against ' +
              planets[index0].name
          );
          console.log('\n*********************************************\n ');
        } else if (
          planets[index1].fleet.spaceshipsNb <
          planets[index0].fleet.spaceshipsNb
        ) {
          planets[index0].fleet.setSpaceshipsNb =
            planets[index0].fleet.spaceshipsNb -
            planets[index1].fleet.spaceshipsNb;
          planets[index1].fleet.setSpaceshipsNb = 0;
          console.log(
            planets[index0].name +
              ' lost ' +
              (planets[index0].fleet.spaceshipsNb -
                planets[index1].fleet.spaceshipsNb) +
              ' spaceships during this war'
          );
          console.log(planets[index1].name + " lost all it's spaceships ");
          console.log(
            planets[index0].name +
              ' won this war against ' +
              planets[index1].name
          );
          console.log('\n*********************************************\n ');
        } else {
          console.log('Both forces are equal, this end in a bloodshed');
          console.log('\n*********************************************\n ');
          planets[index0].fleet.setSpaceshipsNb = 0;
          planets[index1].fleet.setSpaceshipsNb = 0;
        }
      }
    }
  }

  planetChoice(planetsList) {
    const min = 0;
    const max = planetsList.length;
    let indexPlanet1;

    const indexPlanet0 = Math.floor(Math.random() * (max - min) + min);

    do {
      indexPlanet1 = Math.floor(Math.random() * (max - min) + min);
    } while (indexPlanet1 === indexPlanet0);

    return [indexPlanet0, indexPlanet1];
  }
}

module.exports = {FleetManager};
