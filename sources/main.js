const city = require('./city');
const trade = require('./trade');

const cite1 = new city.City('paris', 'macron');
const cite2 = new city.City('lyon', 'ok');

cite1.giveShit();
cite2.giveShit();

const echange = new trade.Trade([cite1, cite2]);
echange.init();
