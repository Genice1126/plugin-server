
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const config = require('../../config').mongoose_config;

const MAP_LIST = {
  string : String,
  number : Number,
  boolean : Boolean,
  date : Date,
  object : Object
};


function spcial_operation_save(connection){
  return async function (schemaName , model){
    let _box = {};
    for(let i in model){
      _box[i] = MAP_LIST[typeof model[i]]
    }
    let schema = new mongoose.Schema(_box);
    let Model = connection.model(schemaName , schema , schemaName);
    let res = new Model(model);
    await res.save();
    return true;
  }
}

function spcial_operation_find(connection){
  return async function (schemaName , condition){
    let _box = {};
    for(let i in condition){
      _box[i] = MAP_LIST[typeof condition[i]]
    }
    let schema = new mongoose.Schema(_box);
    let Model = connection.model(schemaName , schema , schemaName);
    let res = await Model.find(condition);
    return res;
  }
}


Object.keys(config).forEach(item => {
  for(let i of config[item].library){
    let schema_path = path.join(__dirname , 'library' , i);
    if(!fs.existsSync(schema_path)) throw new Error("...config and library dir is not equal...");
    let schema_list = fs.readdirSync(schema_path);
    let connection = mongoose.createConnection(config[item].uri(i) , config[item].options);
    connection.on('connected' , () => {
      console.log(`(${process.env.NODE_ENV}) Mongoose Connection[SUCCESS]: ${i} connect success.`);
    })
    connection.on('error', err => {
      console.log(`(${process.env.NODE_ENV}) Mongoose Connection[ERROR]: ${i} connect error. ${err}`);
    });
    
    connection.on('disconnected', (err) => {
      console.log(`(${process.env.NODE_ENV}) Mongoose Connection[ERROR]: ${i} connect error. ${err}`);
    });
    connection.on('reconnected', () => {
      console.log(`(${process.env.NODE_ENV}) Mongoose Connection[SUCCESS]: ${i} reconnect success.`);
    });
    for(let fileName of schema_list){
      if (fileName) {
        let schemaName = fileName.split(".")[0];
        let model = require(path.join(schema_path, schemaName));
        module.exports[schemaName] = connection.model(schemaName, model , schemaName);
      }
    }
    module.exports[i + '_all_save'] = spcial_operation_save(connection);
    module.exports[i + '_all_find'] = spcial_operation_find(connection);
  }
  
})