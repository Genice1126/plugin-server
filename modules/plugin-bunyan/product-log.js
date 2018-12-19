const Bunyan = require('bunyan');
const fs = require('fs');
const path = require('path');
const sys_config = require('../../config');
// const _init_serializer_field = Symbol('_init_serializer_field');
// const _init_serializer_val = Symbol('_init_serializer_val');

//....../system/info/xxxx-xx-xx.log
//....../system/error/xxxx-xx-xx.log

//new LogProduct({name : "app"});

let config = {
  info : {
    level : 'info',
    path : ""
  },
  error : {
    level : 'error',
    path : ""
  }
}


function ProducerLog (custom_config){
  this.custom_config = Object.assign({
    name : "default"
  },custom_config)
}

function _create_dir(dirname){
  if(fs.existsSync(dirname)){
    return true;
  }else if(_create_dir(path.dirname(dirname))){
    fs.mkdirSync(dirname);
    return true;
  }
}

function log_constructor_fn(key , val){
  console.log('key==val' , key , val);
  let log_path = (val.path) ? path.join(val.path , key + '.log') : "";
  let log_level = (val.level) ? val.level : key;

  return function (...param){
    console.log(...param);
  
    if(log_path){
      this.custom_config.streams = [{path : log_path}]
    }else{
      this.custom_config.stream = process.stdout;
    }
    console.log('length====>>' , param.length);
    if(param.length > 1){
      this.custom_config.serializers = {
        [_init_serializer] : _init_serializer
      }
    }
    console.log('this.custom_config===>' , this.custom_config);
    if(!this.bunyan_client) this.bunyan_client = Bunyan.createLogger(this.custom_config);
    let param_pop = param.pop();
    param_pop = (param_pop.__proto__ === String) ? param_pop : JSON.stringify(param_pop);
    this.bunyan_client[key].call(this.bunyan_client , ...param , param_pop);
    
  }

}

function _init_serializer (field){
  return field;
}

function _init_serializer_val (val){
  return val;
}

Object.keys(config).forEach(key => {
  ProducerLog.prototype[key] = log_constructor_fn(key , config[key]);
})

let a = new ProducerLog();
a.info({aaa : 1},{tye : 123});