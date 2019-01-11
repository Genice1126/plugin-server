
//本地调试配置
module.exports = {
    
  redisServer : {
    host : "localhost",
    port : 6379,
    return_buffers : false, //true 返回的数据为buffer，
    socket_keepalive : true,  //在底层套接字上启用keep-alive功能
    disable_resubscribing : false, //true 断开连接后客户端不会重新订阅
  },

  mongooseConfig : {
    mysql_server_1 : {
      userName : "genice",
      password : "genice",
      address : "localhost",
      port : "27017",
      options : {useNewUrlParser: true},
      library : ["genice"],
      uri : function (db) {
        return "mongodb://"+this.userName+":"+this.password+"@"+this.address+":"+this.port+"/"+db
      }
    },
    mysql_server_2 : {
      userName : "liutao",
      password : "liutao",
      address : "localhost",
      port : "27017",
      options : {useNewUrlParser: true},
      library : ["liutao"],
      uri : function (db) {
        return "mongodb://"+this.userName+":"+this.password+"@"+this.address+":"+this.port+"/"+db
      }
    }
  },


  dailyConfig : {
    path : "/Users/liutao/log",
    period : "1h",
    period_count : 7,
    stream_type : {
      rotating : "rotating-file"
    },
    deplay : {
      info : {
        level : 'info',
        write_file : true
      },
      error : {
        level : 'error',
        write_file : true
      }
    }
  },

}