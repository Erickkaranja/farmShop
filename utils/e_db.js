const mongoose = require('mongoose');

class MongooseClient {
  static client; // Static property

  constructor() {
    const port = process.env.DB_PORT || 27017;
    const host = process.env.DB_HOST || 'localhost';
    const database = process.env.DB_DATABASE || 'farmShop_db';
    const uri = `mongodb://${host}:${port}/${database}`;

    // Initialize client if not already initialized
    if (!MongooseClient.client) {
      MongooseClient.client = mongoose.createConnection(uri);
      MongooseClient.client.on('connected', () => {
        console.log(`MongoClient connected successfully${uri}`);
      });
    }
  }
}

a = new MongooseClient;
const client = MongooseClient.client;
// Check if client has a property named 'schema'
if (client && client.set) {
  console.log('Client has a schema property');
} else {
  console.log('Client does not have a schema property');
}
client.model('User', mongoose.Schema({ name: String }));
