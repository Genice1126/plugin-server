
 const config_plugin = require('../../config');
 const redis = require('redis');

 class RedisServer {

    constructor(config){
        this.config = Object.assign({
            host : config_plugin.redis_server.host,
            port : config_plugin.redis_server.port,
            db : 0,
        },config)
        this.client = redis.createClient(this.config);
    }

    /**
     * 设置键值对
     * @param {key} key 键 
     * @param {values} values 值
     */
    setKey(key , values){
        return new Promise((resolve , rejected) => {
            this.client.set(key , values , (err , reply) => {
                if(err) rejected(err);
                resolve(reply);
            })
        })
    }

    /**
     * 获取键值对
     * @param {key} key 
     */
    getKey(key){
        return new Promise((resolve , rejected) => {
            this.client.get(key , (err , reply) => {
                if(err) rejected(err);
                resolve(reply);
            })
        })
    }

    /**
     * 删除键值对
     * @param {key} key 
     */
    delKey(key){
        return new Promise((resolve , rejected) => {
            this.client.del(key , (err , reply) => {
                if(err) rejected(err);
                resolve(reply);
            })
        })
    }

    /**
     * 设置Hash键值对
     * @param {key} key 
     * @param {field} field 
     * @param {object} object 
     */
    setKeyWithHash(key , field , object){
        return new Promise((resolve , rejected) => {
            this.client.hmset(key , field , object , (err , reply) => {
                if(err) rejected(err);
                resolve(reply);
            })
        })
    }

    /**
     * 获取Hash field对应的值
     * @param {key} key 
     * @param {field} field 
     */
    getKeyWithHash(key , field){
        return new Promise((resolve , rejected) => {
            this.client.hmget(key , field , (err , reply) => {
                if(err) rejected(err);
                resolve(reply);
            })
        })
    }

    /**
     * 删除Hash field
     * @param {key} key 
     * @param {field} field 
     */
    delKeyWithHash(key , field){
        return new Promise((resolve , rejected) => {
            this.client.hdel(key , field , (err , reply) => {
                if(err) rejected(err);
                resolve(reply);
            })
        })
    }
   
 }

 module.exports = exports = new RedisServer();

