const mongoose = require('./index.js');
console.log(typeof "hello world");
let schema = mongoose.test;
schema.create({name : "hello" , location : "world"});

mongoose.liutao_all_save('yyy' , {a : 1 , b : 1 , c : [{a : 1} , {b : 1}]});

// mongoose.genice_all_save('world' , {name : "helloworld"});

// setTimeout(function(){
//   (async function(){
//     console.log('begin');
//     await mongoose.all_save('world' , {name : "hello world"});
    
//   })()
// },2000)

