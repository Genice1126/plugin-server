
//本地调试配置
module.exports = {
    
    redis_server : {
        host : "localhost",
        port : 6379,
        return_buffers : false, //true 返回的数据为buffer，
        socket_keepalive : true,  //在底层套接字上启用keep-alive功能
        disable_resubscribing : false, //true 断开连接后客户端不会重新订阅
    }

}