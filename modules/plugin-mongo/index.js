
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const schema_path = path.join(__dirname , 'schema');
const schema_list = fs.readdirSync(schema_path);
console.log('schema_list==>' , schema_list);

const client = mongoose.connect("mongodb://genice:qwe123@localhost:27017/genice");
client.on('connected', () => {
  console.log(`(${process.env.NODE_ENV}) Mongoose Connection[SUCCESS]: genice connect success.`);
});

client.on('error', err => {
  console.log(`(${process.env.NODE_ENV}) Mongoose Connection[ERROR]: genice connect error. ${err}`);
});

client.on('disconnected', () => {
  console.log(`(${process.env.NODE_ENV}) Mongoose Connection[ERROR]: genice disconnected.`);
});

client.on('reconnected', () => {
  console.log(`(${process.env.NODE_ENV}) Mongoose Connection[SUCCESS]: genice reconnect success.`);
});

schema_list.forEach(function(fileName) {
  if (fileName) {
    let schemaName = fileName.split(".")[0];
    let model = require(path.join(schema_path, schemaName));
    module.exports[schemaName] = client.model(schemaName, model);
  }
});


/**
 * db connect address;
 * {
 *   db1 : {
 *     userName : "",
 *     dataBase : "",
 *     password : "",
 *     url : "",
 *     options : {}
 *   },
 *   db2 : {
 *     userName : "",
 *     dataBase : "",
 *     password : "",
 *     url : "",
 *     options ; {}
 *   }
 * }
 * 
 */
// let client = mongoose.connect("mongodb://genice:qwe123@localhost:27018/genice");

/**
 * new schema
 */

// let schema = new mongoose.Schema({name : String});

/**
 * define schema name
 */
// let model = mongoose.model('name' , schema);




// const mongoose = require('mongoose');

// const mongo_config = {
//   userName: "genice",
//   dataBase: "genice",
//   password: "qwe123",
//   url: 'localhost:27017',
//   passportUri: function() {
//     return "mongodb://" + this.userName + ":" + this.password + "@" + this.url + "/" + this.dataBase
//   }
// }

// // /**
// //  * mongoose.insert();
// //  * mongoose.update();
// //  * mongoose.delete();
// //  * mongoose.findOne();
// //  */


// class Mongoose {

//   constructor(){
    
//     this.MAP_LIST = {
//       string : String,
//       number : Number,
//       boolean : Boolean,
//       date : Date,
//       object : Object
//     };
//     this.connect();

//   }

//   connect() {
//     this.client = mongoose.connect(mongo_config.passportUri() , {useNewUrlParser : true});
//   }

//   //常规操作
//   role_operation (){

//   }

//   //特殊操作
//   async spcial_operation_save(shema_name , obj){
//     let _box = {};
//     for(let i in obj){
//       console.log('i==>' , i);
//       _box[i] = this.MAP_LIST[typeof obj[i]]
//     }
//     let schema = new mongoose.Schema(_box);
//     let Model = mongoose.model(shema_name , schema);
//     let res = new Model(obj);
//     return res.save();
//   }

//   //transaction
//   transaction_operation(){

//   }

// }

// let mongo = new Mongoose();

// console.log('a');
// (async function(){
//   await mongo.spcial_operation_save('test1' , {ttt : 1 , bbb : {a : 2} , ccc : 12345 , ddd : [{g : 1}]});
// })()
// console.log('b');





/**
 * Created by liutao on 17/2/28.
 */

// 'use strict';

// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
// const config = require('../../../config');

// const schemaPath = path.join(__dirname , "schema");
// const moneySchemaList = fs.readdirSync(schemaPath);
// const moneyConnectUri = config.mongooseMoney.moneyUri();

// const moneyConnect = mongoose.createConnection(moneyConnectUri, config.mongooseConnOpts);

// moneyConnect.on('connected', () => {
//   console.log(`(${process.env.NODE_ENV}) Mongoose Connection[SUCCESS]: Money db connect success.`);
// });

// moneyConnect.on('error', err => {
//   console.log(`(${process.env.NODE_ENV}) Mongoose Connection[ERROR]: Money db connect error. ${err}`);
// });

// moneyConnect.on('disconnected', () => {
//   console.log(`(${process.env.NODE_ENV}) Mongoose Connection[ERROR]: Money db disconnected.`);
// });

// moneyConnect.on('reconnected', () => {
//   console.log(`(${process.env.NODE_ENV}) Mongoose Connection[SUCCESS]: Money db reconnect success.`);
// });


// moneySchemaList.forEach(function(fileName) {
//   if (fileName) {
//     let schemaName = fileName.split(".")[0];
//     let model = require(path.join(schemaPath, schemaName));
//     module.exports[schemaName] = moneyConnect.model(schemaName, model);
//   }
// });

// // const client = mongoose.connect(mongo_config.passportUri(),{ useNewUrlParser: true });

// // console.log('client==>' , client);

// // let map_list = {
// //   string : String,
// //   number : Number,
// //   boolean : Boolean,
// //   object : Object
// // }

// // let options = {
// //   name : '123',
// //   number : 123123,
// //   is : true,
// //   ob : {a : 1 , b : 2},
// //   ar : [{a : 1} , {b : 1}]
// // }

// // let putOption = {};
// // Object.keys(options).forEach( key => {
// //   putOption[key] = map_list[typeof options[key]];
// // })

// // let schema = new mongoose.Schema(putOption);

// // let kit = mongoose.model('kit' , schema);

// // var silence = new kit(options);

// // console.log('silence==>' , silence);

// // silence.save();