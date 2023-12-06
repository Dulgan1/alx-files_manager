const redis = require('redis');
const util = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => console.log(error.message));
  }

  isAlive() {
    this.client.connected;
  }

  async get(key) {
    const getVal = await util.promisify(this.client.get).bind(this.client);
    return await getVal(key);
  }

  async set(key, val, duration) {
    await this.client.set(key, value);
    await this.client.expire(key, duration);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
