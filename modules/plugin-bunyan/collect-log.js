
const bunyan = require('bunyan');
const path = require('path');
const fs = require('fs');
const sysConfig = require('../../config').dailyConfig;

/**
 * new Function
 * @param {用户自定义配置} config 
 */
function DailyRecord(config) {
  this.config = Object.assign({
    name : "default",
    level : "info"
  },config);
}

/**
 * 创建文件夹Fn
 * @param {项目dir} p_name 
 */
function createDir(p_name) {
  let common_path = path.join(sysConfig.path , p_name);
  mkDir(common_path);
  return;
}

/**
 * 创建文件夹
 * @param {目录} dirname 
 */
function mkDir(dirname) {
  if(fs.existsSync(dirname)) {
    return true;
  }else if(createDir(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  };
  return false;
}

/**
 * 初始化
 * @param {字段名} field 
 */
function initSerializer(field) {
  return field
}

/**
 * core Fn
 * @param {配置-键} k 
 * @param {配置-值} v 
 */
function dailyConstructorFn(k , v) {
  DailyRecord.call(this);
  return function (...content) {

    if(content.length >= 2) throw new Error("....log param number is error , max length is two....");

    for(let i of content){
      if(i.constructor !== Object) throw new Error("....log param is error....");
    }

    if(v.write_file) {
      this.config.streams = [{
        type : sysConfig.stream_type.rotating,
        period : sysConfig.period,
        count : sysConfig.period_count,
        path : path.join(sysConfig.path , this.config.name , k +'.log'), 
        level : v.level,
      }];
    }else{
      this.config.stream = process.stdout;
    }
    if(content.length > 1){
      this.config.serializers = {
        [initSerializer] : initSerializer
      }
    }
    if(!this.client) this.client = bunyan.createLogger(this.config);
    let content_pop = content.pop();
    content_pop = (content_pop.__proto__ === String) ? content_pop : JSON.stringify(content_pop);
    this.client[k].call(this.client , ...content , content_pop);
  }
}

Object.keys(sysConfig.deplay).forEach(item => {
  DailyRecord.prototype[item] = dailyConstructorFn(item , sysConfig.deplay[item]);
})

exports = module.exports = DailyRecord;




