
const bunyan = require('bunyan');
const path = require('path');
const fs = require('fs');
const SYS_CONFIG = require('../../config').daily_config;

/**
 * Function
 * @param {自定义配置} custom_config 
 */
function DailyRecord(custom_config){
  this.config = Object.assign({
    name : "default",
    level : "info"
  } , custom_config);
  create_dir(this.config.name);
}

/**
 * 
 * @param {自定义名称} p_name 
 */
function create_dir(p_name){
  common_path = path.join(SYS_CONFIG.path , p_name);
  _mkdir(common_path);
}


/**
 * 
 * @param {路径} dirname 
 */
function _mkdir(dirname){
  if(fs.existsSync(dirname)){
    return true;
  }else if(_mkdir(path.dirname(dirname))){
    fs.mkdirSync(dirname);
    return true;
  }
}

/**
 * 
 * @param {field} field 
 */
function _init_serializer(field){
  return field;
}


/**
 * core prototype Function
 * @param {key} k 
 * @param {value} v 
 */
function daily_constructor_fn(k , v){
  DailyRecord.call(this);
  return function (...content){

    if(content.length >= 2) throw new Error("....log param number is error , max length is two....");

    for(let i of content){
      if(i.constructor !== Object) throw new Error("....log param is error....");
    }

    if(v.write_file) {
      this.config.streams = [{
        type : 'rotating-file',
        period : '1h',
        count : 2,
        path : path.join(SYS_CONFIG.path , this.config.name , k +'.log'), 
        level : v.level,
      }];
    }else{
      this.config.stream = process.stdout;
    }
    if(content.length > 1){
      this.config.serializers = {
        [_init_serializer] : _init_serializer
      }
    }
    if(!this.client) this.client = bunyan.createLogger(this.config);
    let content_pop = content.pop();
    content_pop = (content_pop.__proto__ === String) ? content_pop : JSON.stringify(content_pop);
    this.client[k].call(this.client , ...content , content_pop);
  }

}

Object.keys(SYS_CONFIG.deplay).forEach(item => {
  DailyRecord.prototype[item] = daily_constructor_fn(item , SYS_CONFIG.deplay[item]);
})

exports = module.exports = DailyRecord;




