const planet = require('./planet');

const fleetManager = require('./fleet-manager');

const table = require('./display');
const trade = require('./trade');

planet1 = new planet.Planet('Tatooine', '1');
planet2 = new planet.Planet('Coruscant', '2');
planet3 = new planet.Planet('Kashyyyk', '3');
planet4 = new planet.Planet('Dagobah', '4');
planet5 = new planet.Planet('Endor', '5');
planet6= new planet.Planet('Naboo', '6');
planet7 = new planet.Planet('Hoth', '7');

console.log("\n\n\n------------------------------ SEVEN WONDERS ------------------------------");
console.log("------------ FABIEN LIONTI | NICOLAS NERRIENET | ANAÏS PLAISSY ------------\n\n\n");

fleetM = new fleetManager.FleetManager([planet1, planet2, planet3, planet4, planet5,planet6,planet7]);

planet1.giveShit();
planet2.giveShit();
planet3.giveShit();
planet4.giveShit();
planet5.giveShit();
planet6.giveShit();
planet7.giveShit();

echange = new trade.Trade([planet1, planet2, planet3, planet4, planet5,planet6,planet7]);
echange.init();

tab1 = new table.Display([planet1, planet2, planet3, planet4, planet5,planet6,planet7]);
tab1.init();
