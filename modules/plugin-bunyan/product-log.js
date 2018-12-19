

const Bunyan = require('bunyan');
const path = require('path');
const fs = require('fs');
const SYS_CONFIG = require('../../config');

function ProducerLog (custom_config){
  this.custom_config = Object.assign({
    name : "default"
  },custom_config);
  createDir();
}

/**
 * prototype fn
 * @param {key} key 
 * @param {val} val 
 */
function log_constructor_fn(key , val){
  ProducerLog.call(this);
  let log_path = (val.path) ? path.join(val.path , key + '.log') : "";
  // let log_level = (val.level) ? val.level : key;
  return function (...param){
  
    if(log_path){
      this.custom_config.streams = [{path : log_path}]
    }else{
      this.custom_config.stream = process.stdout;
    }

    if(param.length > 1){
      this.custom_config.serializers = {
        [_init_serializer] : _init_serializer
      }
    }
    if(!this.bunyan_client) this.bunyan_client = Bunyan.createLogger(this.custom_config);
    let param_pop = param.pop();
    param_pop = (param_pop.__proto__ === String) ? param_pop : JSON.stringify(param_pop);
    this.bunyan_client[key].call(this.bunyan_client , ...param , param_pop);
    
  }

}

/**
 * create dir
 * @param {dirname} dirname 
 */
function mkdirs(dirname){
  if(fs.existsSync(dirname)){
    return true;
  }else if(mkdirs(path.dirname(dirname))){
    fs.mkdirSync(dirname);
    return true;
  }
}

/**
 * create dir
 */
function createDir(){
  Object.keys(SYS_CONFIG.log_config).forEach(function(item){
    mkdirs(SYS_CONFIG.log_config[item].path);
  })
}

/**
 * serializer field init
 * @param {field} field 
 */
function _init_serializer (field){
  return field;
}

Object.keys(SYS_CONFIG.log_config).forEach(key => {
  ProducerLog.prototype[key] = log_constructor_fn(key , SYS_CONFIG.log_config[key]);
})

exports = module.exports = ProducerLog;


