const Farmer = require('../models/farmer');
const Produce = require('../models/produce');
const mongoose = require('mongoose');

class farmerController {

  async createFarmer(req, res) {
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

  async getAllFarmers(req, res) {
    const farmers = await Farmer.find({}, 'firstName farmName email');
    if (farmers) {
      res.status(200).json(farmers);
    }
  }
//add middle ware to check if its a valid id
  async updateFarmerById(req, res) {
     const objectId = new mongoose.Types.ObjectId(req.params.farmerId);
     const keysToFilter = ['_id', 'createAt', 'updatedAt', 'email', 'coordinates' ]
     const updatedKeys = req.body;
     console.log(updatedKeys);
     const filteredObject = Object.entries(updatedKeys)
       .filter(([key]) => !keysToFilter.includes(key))
       .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
     console.log(filteredObject);
     try {
       const farmer = await Farmer.findByIdAndUpdate(objectId, filteredObject, { new: true });
       if (!farmer) {
         return res.status().json({error: 'farmer does not exist'});
       }
       res.status(200).json(farmer)
     } catch(err) {res.status(500).send('Error updating farmer');}
  
}

  async deleteFarmerById(req, res) {
    const objectId = new mongoose.Types.ObjectId(req.params.farmerId);
    await Farmer.deleteOne({ _id: objectId});
    await Produce.deleteMany({ farmerId: objectId});
    res.status(204).json({});
  }
}

module.exports = new farmerController();
