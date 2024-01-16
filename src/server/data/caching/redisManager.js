const Redis = require('redis');
const serverConfig = require('../../config/serverConfig');

class redisManager {
  constructor(app) {
    this.app;
    this.client = Redis.createClient({
      host: serverConfig.REDIS_HOST,
      port: serverConfig.REDIS_PORT
    });
    console.log(`Redis connection is successfull. Cache timeout is ${ServerConfig.REDIS_CACHE_TIMEOUT} seconds`);
  }
}

module.exports = redisManager;
