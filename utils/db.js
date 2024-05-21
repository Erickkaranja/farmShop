const mongoose = require('mongoose');
const Farmer = require('../models/farmer');
class MongooseClient {

  constructor() {
    this.mongooseConnect();
  }

  async mongooseConnect() {
    const port = process.env.DB_PORT || 27017;
    const host = process.env.DB_HOST || '127.0.0.1';
    const database = process.env.DB_DATABASE || 'farmShop_db';
    const uri = `mongodb://${host}:${port}/${database}`;
    const client = await mongoose.connect(uri);
    /**
    client.on('connected', () => {
       console.log(`MongoClient connected successfully 12`);
       this.loadModels();
    });
    */
  }
  loadModels () {
   const farmer = new Farmer();
  }
}

module.exports = MongooseClient;
