
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const config = require('../../config').mongooseConfig;

const MAP_LIST = {
  string : String,
  number : Number,
  boolean : Boolean,
  date : Date,
  object : Object
};

/**
 * 不用schema 任意插入任何对象
 * @param {连接对象} connection 
 * {schema} 表名
 * {model} 插入的数据
 * 
 */
function spcialOperationSave(connection) {
  return async(schemaName , model) => {
    let box = {};
    for(let i in model) box[i] = MAP_LIST[typeof model[i]];
    let schema = new mongoose.Schema(box);
    let Model = connection.model(schemaName , schema , schemaName);
    let res = new Model(model);
    await res.save();
    return true;
  }
}

/**
 * 不用schema 查询自定义表中的数据
 * @param {连接对象} connection 
 * {schema} 表名
 * {condition} 查询条件
 * return Array
 */
function spcialOperationFind(connection){
  return async(schemaName , condition) => {
    let box = {};
    for(let i in condition) box[i] = MAP_LIST[typeof condition[i]];
    let schema = new mongoose.Schema(box);
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
    module.exports[i + '_save'] = spcialOperationSave(connection);
    module.exports[i + '_find'] = spcialOperationFind(connection);
  }
  
})