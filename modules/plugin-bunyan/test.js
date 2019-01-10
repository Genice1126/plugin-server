const Log = require('./collect-log.js');

const Log_s = new Log({name : 'test'}); 

Log_s.error([1,2] ,{bbb : 1});

