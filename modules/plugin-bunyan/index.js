
/**
 * 用起来简单 性能好
 */

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
 * let Bunyan = new Bunyan({name : "app"});
 * Bunyan.info({custom} , {record})
 * 
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

// var log = bunyan.createLogger({
//   name: "",                     // Required
//   level: "",      // Optional, see "Levels" section
//   stream: "",           // Optional, see "Streams" section
//   streams: "",   // Optional, see "Streams" section
//   serializers: "", // Optional, see "Serializers" section

//   // Any other fields are added to all log records as is.
//   foo: 'bar',
// });

/**
 *  name可以自己定义
 *  是否有日志记录 streams中是否有path
 *  
 */

const path = require('path');
const Bunyan = require('bunyan');
const sys_config = require('../../config');


let log = Bunyan.createLogger({
  name : "app"
});

log.info();     // Returns a boolean: is the "info" level enabled?
                // This is equivalent to `log.isInfoEnabled()` or
                // `log.isEnabledFor(INFO)` in log4j.

log.info('hi');                     // Log a simple string message (or number).
log.info('hi %s', 1, 2); // Uses `util.format` for msg formatting.

log.info({foo: 'bar'}, 'hi');
                // The first field can optionally be a "fields" object, which
                // is merged into the log record.

log.info('err');  // Special case to log an `Error` instance to the record.
                // This adds an "err" field with exception details
                // (including the stack) and sets "msg" to the exception
                // message.
log.info('err', 'more on this: %s', 123);
                // ... or you can specify the "msg".

log.info({foo: 'bar', err: 'err'}, 'some msg about this error');



