const Bunyan = require('bunyan');
const fs = require('fs');
const path = require('path');
const sys_config = require('../../config');
// const _init_serializer_field = Symbol('_init_serializer_field');
// const _init_serializer_val = Symbol('_init_serializer_val');

//....../system/info/xxxx-xx-xx.log
//....../system/error/xxxx-xx-xx.log

//new LogProduct({name : "app"});


class P {

  constructor (config){

    this.config = Object.assign({
      name : "default",
    },config)
    this.path = path.join(sys_config.log_path , this.config.name , );

  }

  _create_dir (dirname){
    if(fs.existsSync(dirname)){
      return true
    }else if(this._create_dir(path.dirname(dirname))){
      fs.mkdirSync(dirname);
      return true
    }
  }



}