const city = require('./city');
const trade = require('./Trade');

cite1 = new city.City('paris', 'macron');
cite2 = new city.City('lyon', 'ok');

cite1.giveShit();
cite2.giveShit();

echange = new trade.Trade([cite1, cite2]);
echange.init();
