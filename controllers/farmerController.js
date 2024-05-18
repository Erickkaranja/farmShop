const mongooseClient = require('../utils/db');
const Farmer = require('../models/farmer');

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
  async deleteFarmerByEmail(req, res, next) {
    
  }
}
module.exports = new farmerController();
