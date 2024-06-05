const mongooseClient = require('../utils/db');
const Farmer = require('../models/farmer');
const Produce = require('../models/produce');
class farmerController {

  async createFarmer(req, res, next) {
    const { firstName, lastName, farmName, contact, email, coordinates} = req.body;
    if (!farmName) { return res.status(400).json({ error: 'farmName missing!'})}
    if (!contact) { return res.status(400).json({ error: 'contact missing!'})}
    if (!email) { return res.status(400).json({ error: 'email missing!'})}
    const farmer = await Farmer.findOne({email: email});
    if (farmer) {
      return res.status(400).json({ error: 'farmer already exists' })
    }

    const newFarmer = new Farmer({
      firstName: firstName,
      lastName: lastName,
      farmName: farmName,
      contact: contact,
      email: email,
      coordinates: coordinates
	})
    try {
      await newFarmer.save();
    } catch(err) { 
       return res.status(400).json({ error: err.message})
    }
    res.status(201).json({id: newFarmer._id, email: newFarmer.email});
  }

  async getAllFarmers(req, res, next) {
    const farmers = await Farmer.find({}, 'firstName farmName email');
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
