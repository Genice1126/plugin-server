
const Client = require('./index');

class WorkQueue extends Client {

    constructor(config){
        super();
        this.config = Object.assign({
            queue : "workQueue",
            queueOptions : {
                durable : true,
            },
            publishOptions : {
                persistent : true,
            },
            consumeOptions : {
                noAck : false,
            },
        } , this.config , config);
    }

    async connect (url){
        await super.connect(url);
        const queue = this.config.queue;
        const options = this.config.queueOptions;
        await this.channel.assertQueue(queue , options);
    }

    async enqueue(task){
        return new Promise((resolve , reject) => {
            const msg = Client.encode(task);
            const queue = this.config.queue;
            const options = this.config.publishOptions;
            this.channel.sendToQueue(queue , msg , options , (err) => {
                if(err) return reject(err);
                return resolve();
            })
        })
    }

    async consume(consumer) {
        const queue = this.config.queue;
        const options = this.config.consumeOptions;
        const callback = async (msg) => {
          if (!msg) return await this.close();
          const task = Client.decode(msg.content);
          try {
            await consumer(task);
            await this.ack(msg);
          } catch (err) {
            this.emit('error', err);
            await this.nack(msg);
          }
        };
        const tag = (await this.channel.consume(queue, callback, options)).consumerTag;
        return async () => {
          await this.channel.cancel(tag);
        };
      }

      async delete() {
        const queue = this.config.queue;
        await this.channel.deleteQueue(queue);
      }

}