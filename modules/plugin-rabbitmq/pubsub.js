const Client = require('./Client');

class PubSub extends Client {

  constructor(config) {
    super();
    this.config = Object.assign({
      exchange: 'pubsub',
      exchangeOptions: {
        durable: false,
      },
      queueOptions: {
        exclusive: true,
      },
      publishOptions: {
        persistent: false,
      },
      consumeOptions: {
        noAck: true,
      },
    }, this.config, config);
  }

  async connect(url) {
    await super.connect(url);
    const exchange = this.config.exchange;
    const options = this.config.exchangeOptions;
    await this.channel.assertExchange(exchange, 'direct', options);
  }

  async publish(topic, message) {
    return new Promise((resolve, reject) => {
      const exchange = this.config.exchange;
      const msg = Client.encode(message);
      const options = this.config.publishOptions;
      this.channel.publish(exchange, topic, msg, options, (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }

  async subscribe(topic, subscriber) {
    const exchange = this.config.exchange;
    const queueOptions = this.config.queueOptions;
    const queue = (await this.channel.assertQueue('', queueOptions)).queue;
    this.channel.bindQueue(queue, exchange, topic);
    const callback = async (msg) => {
      if (!msg) {
        await this.close();
        return;
      }
      const message = Client.decode(msg.content);
      try {
        await subscriber(message);
        await this.ack(msg);
      } catch (err) {
        this.emit('error', err);
        await this.nack(msg);
      }
    };
    const options = this.config.consumeOptions;
    const tag = (await this.channel.consume(queue, callback, options)).consumerTag;
    return async () => {
      await this.channel.cancel(tag);
    };
  }

  async delete() {
    const exchange = this.config.exchange;
    await this.channel.deleteExchange(exchange);
  }

}

module.exports = PubSub;