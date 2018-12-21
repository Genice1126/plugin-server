

const Bunyan = require('./index.1.js');
const client = new Bunyan({name : "bunyan-test"});

client.info({type : 1 , error : 2} , {aaa : 1 , bbb : 2});


