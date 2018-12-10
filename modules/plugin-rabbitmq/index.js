
const amqplib = require('amqplib');
const EventEmitter = require('events').EventEmitter;

class MessageMQ extends EventEmitter{

    constructor (config){
        super();
        this.config = Object.assign({
            prefetch : 1, // 给不忙的worker分配工作
            socket : {
                heartbeat : 30   //心跳包
            }
        },config)
    }

    
    async connect (url){
        if(url) this.config.url = url;
        this.connection = await amqplib.connect(this.config.url , this.config.socket);
        this.connection.on('close' , (err) => {
            if(!this.connection) return;
            this.emit('close' , err);
            this.connection = null;
        })
        this.connection.on('error' , (err) => {
            this.emit('error' , err);
        })
        this.channel = await this.connection.createConfirmChannel();  //信道确认模式(确保消息进入channel，给product回执)
        this.channel.on('close' , () => {
            if(!this.connection || !this.channel) return;
            this.emit('close');
            this.channel = null;
            this.connection = null;
        })
        this.channel.on('error' , (err) => {
            this.emit('error' , err);
        })
        this.channel.prefetch(this.config.prefetch);
    }

    async close() {
        try{
            await this.channel.recover();
            await this.channel.close();
            await this.connection.close();
        }catch(e){
            console.log('close error==>' , e);
        }
    }

    //消息回执确认
    async ack (msg){
        if(this.config.consumeOptions.noAck === true) return ;
        await this.channel.ack(msg);
    }
    //没收到消息回执
    async nack(msg){
        if(this.config.consumeOptions.noAck === true) return ;
        await this.channel.nack(msg)
    }

    static encode(message){
        return Buffer.from(JSON.stringify(message))
    }

    static decode(message){
        return JSON.parse(message.toString());
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

exports = module.exports = MessageMQ;
