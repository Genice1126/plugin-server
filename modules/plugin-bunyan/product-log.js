const Bunyan = require('bunyan');
const fs = require('fs');
const path = require('path');
const sys_config = require('../../config');
// const _init_serializer_field = Symbol('_init_serializer_field');
// const _init_serializer_val = Symbol('_init_serializer_val');

//....../system/info/xxxx-xx-xx.log
//....../system/error/xxxx-xx-xx.log


class LogProduct {
  constructor (config){
    
    this.config = {};
    this.config.name = config.name || "";
    if(!config.name || config.name.constructor !== String) this.config.name = 'default';
    let path1 = sys_config.log_path + '/' + this.config.name + '/';
    console.log('path==>' , path1);
    this._create_dir(path1);
    
    this.config.streams = [{
        level : 'info',
        path : path1 + 'info.log'
      },
      {
        level : 'error',
        path : path1 + 'error.log'
      }
    ]
    
    this.config.serializer = {
      [this._init_serializer_field] : this._init_serializer_val 
    };
    console.log(this.config);

    this.client = Bunyan.createLogger(this.config);
    
  }

  _init_serializer_field(field){
    return field;
  }

  _init_serializer_val(val){
    return val
  }

  _create_dir(dirname){
    if(fs.existsSync(dirname)){
      return true
    }else if(this._create_dir(path.dirname(dirname))){
      fs.mkdirSync(dirname);
      return true
    }
  }

  info(...command){
    return this.client.info(...command);
  }
  error(...command){
    return this.client.error(...command);
  }
}

let log = new LogProduct({name : 'test'});
log.info({type : 1 , command : 2} , {ctx : 'ctx' , aaa : 1});
