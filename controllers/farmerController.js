const mongooseClient = require('../utils/db');
const Farmer = require('../models/farmer');
const Produce = require('../models/produce');
class farmerController {

  async createFarmer(req, res, next) {
    const { firstname, lastname, contact, email, coordinates} = req.body;
    console.log(req.body);
    const farmer = await Farmer.findOne({email: email});
    if (farmer) {
      return res.status(400).json({ error: 'farmer already exists' })
    }

    const newFarmer = new Farmer({
      firstname: firstname,
      lastname: lastname,
      contact: contact,
      email: email,
      coordinates: coordinates
	})
    newFarmer.save();
    res.status(201).json({id: newFarmer._id, email: newFarmer.email});
  }

  async getFarmerByEmail(req, res, next) {
    const farmer = await Farmer.findOne({email: req.query.email});
    if (!farmer) {
        return res.status(400).json({ error: 'email doesnot exist'});
    }
    res.status(200).json(farmer);
  }

  async getAllFarmers(req, res, next) {
    const farmers = await Farmer.find();
    if (farmers) {
      res.status(200).json(farmers);
    }
  }

  async updateFarmerById(req, res, next) {
    
  }

  async deleteFarmerById(req, res, next) {
    await Farmer.deleteOne({ _id: req.params.id});
    await Produce.deleteMany({ farmerId: req.params.id});
    res.status(204).json({});
  }
}
module.exports = new farmerController();
