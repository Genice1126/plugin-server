


/**
 * 日志系统(想要什么)
 * 
 * 采集--储存，查询--可视化
 * 
 * 目标，在需要的地方可以以对象的形式记录各种数据，注意扩展性
 * 
 * 最好可以分析 每小时每天或者每个月 统计日志数据，综合mongo文档性sql
 * 
 * 如有bug或者error 发送邮件
 * 
 */

/**
 * 技术点(需要什么)
 * 
 * 1.采集日志的方法导出 供业务使用
 * 
 * 2.定时任务 批量分析日志 分类存入mongo
 * 
 * 3.error事件的日志，记录并且给负责人发送邮件
 * 
 * 4.数据的可视化(待定)
 */

/**
 * 实现(怎么做)
 * 
 * 1.Bunyan.info(type="数据来源",data="{数据}",date="采集日期",) 
 * 2.Bunyan.error(type="数据来源",data="数据",date="采集日期",)
 * 3.node-schedule redis 定时任务 
 * 4.分析日志，按格式存入mongo
 * 5.发送邮件 nodemailer
 * 
 * bunyan写日志 redis定时任务 mongo nodemailer
 * 
 */
//是否开启 名称 是否支持自定义 是否写文件

var log = bunyan.createLogger({
  name: "",                     // Required
  level: "",      // Optional, see "Levels" section
  stream: "",           // Optional, see "Streams" section
  streams: "",   // Optional, see "Streams" section
  serializers: "", // Optional, see "Serializers" section

  // Any other fields are added to all log records as is.
  foo: 'bar',
});

product-log
collect-log
analyze-log


// class BunyanPlugin {

//   constructor (config){
//     this.config = Object.assign({
//       name : "",
//       streams : [{
        
//       }],
//       serializers : {
//         [this._init_serializer_field] : this._init_serializer_val
//       },
//     } , config);

//     /**
//      * 
//      */
//     Bunyan.createLogger({
//       name : "",
//       level : "",
//       streams : "",
//       serializers : "",

//     })



//   }

//   [_init_serializer_field](field){
//     return field;
//   }

//   [_init_serializer_val](val){
//     return val;
//   }

//   _create_dir(){
//     if(fs.existsSync(dirname)){
//       return true
//     }else if(this._create_dir(path.dirname(dirname))){
//       fs.mkdirSync(dirname);
//       return true
//     }
//   }

//   info(...arg){
    
//   }

// }

// exports = module.exports = BunyanPlugin;

