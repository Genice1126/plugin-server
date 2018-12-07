
const amqplib = require('amqplib');
const EventEmitter = require('events').EventEmitter;

class MessageMQ {

    constructor (config){
        this.config = Object.assign({
            url : 'amqp://localhost'
        } , config)
    }

    async create_connect (){
        this.connection = await amqplib.connect(this.config.url);
        this.connection.on('connect' , (err) => {
            this.emit('connect' , err);
        })
        this.connection.on('close' , (err) => {
            this.emit('close' , err);
            this.connection = null;
        })
        this.connection.on('error' , (err) => {
            this.emit('error' , err);
        })
    }


    
    /**
     * 创建频道
     * 
     * 声明队列
     * 
     * pub频道
     * 
     * sub频道
     * 
     * 场景：
     * 单聊 群聊
     * 
     * 1work queue 2pub/sub 3Routing 4topics 5 RPC
     *                
     * 1对1单发   1对多群发  请求--路由（topic）--分发
     * 
     */

}

let mq = new MessageMQ();
