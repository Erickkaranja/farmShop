require('dotenv').config()
const Farmer = require('../models/farmer');
const username = process.env.USER_FARMSHOP
const password = process.env.PASSWD

const mongoose = require('mongoose');
const uri = `mongodb+srv://${username}:${password}@farmshop.fgc4nqp.mongodb.net/?retryWrites=true&w=majority&appName=farmShop`;

class mongoClient {
  /**
  loadModels() {
    const farmer = new Farmer();
    console.log("models loaded");
  }
  **/
  async connect() {
  try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('Connected to MongoDB Atlas!');
     // this.loadModels();

      // Send a ping to confirm a successful connection
      const adminDb = mongoose.connection.db.admin();
      const pingResult = await adminDb.command({ ping: 1 });
      console.log(pingResult);
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
    } finally {
         //mongoose.connection.close();
    }
}
}
//run().catch(console.dir);
module.exports = new mongoClient()
