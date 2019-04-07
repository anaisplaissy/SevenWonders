const city = require('./city');
const armyManager = require('./army-manager');

cite1 = new city.City('paris', 'macron');
cite2 = new city.City('lyon', 'ok');
armyM = new armyManager.ArmyManager([cite1, cite2]);

cite1.giveShit();
cite2.giveShit();
