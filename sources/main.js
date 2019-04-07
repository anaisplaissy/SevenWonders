const city = require('./city');
const table = require('./display');
const trade = require('./trade');

cite1 = new city.City('Tatooine', '1');
cite2 = new city.City('Coruscant', '2');
cite3 = new city.City('Kashyyyk', '3');
cite4 = new city.City('Dagobah', '4');
cite5 = new city.City('Endor', '5');

cite1.giveShit();
cite2.giveShit();
cite3.giveShit();
cite4.giveShit();
cite5.giveShit();

echange = new trade.Trade([cite1, cite2, cite3, cite4, cite5]);
echange.init();

tab1 = new table.Display([cite1, cite2, cite3, cite4, cite5]);
tab1.init();
