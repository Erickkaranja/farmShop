const serverConfig = require('../config/serverConfig');

class farmerController {
  //creates a single farmer rem: create middleware to check for required param
  static createFarmer(req, res, next, db) {
    db.models.Farmer.create(req.body, (err, farmer) => {
      if (err) {
        console.error(err);
        res.status(500).send()
      } else {
        res.status(200).send('Farmer created sucessfully.');
      }
    })
  }
  //list a single farmer by email rem: create middleware to check email in req
  static getFarmerByEmail(req, res, next, db) {
    db.models.Farmer.findOne({
      email: req.query.email
    })
    .exec((err, farmer) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send(farmer)
      }
    })
  }
  // lists all farmers : consider caching.
  static getAllFarmers(req, res, next, db) {
    db.models.Farmer.find().sort({'_id': 1}).exec((err, Farmers) => {
       res.send(farmer)
    })
  }
  //update a farmer by email.
  static updateFarmerByEmail(req, res, next, db) {
    db.models.Farmer.findOne({
      email: req.query.email
    })
    .exec((err, farmer) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(201).send(`farmer ${farmer.email} updated successfully`)
        
      }
    })
  }
  //deleting farmer by email.
  static deleteFarmerByEmail(req, res, next, db) {
    db.models.Farmer.remove({
      email: req.query.email
    }, (err) => {
         if (err) {
           console.error(err)
           res.status(500).send()
         } else {
           res.status().send(`Farmer ${req.query.email} deleted`)
         }
      })

  /**
  implement a read farmer pagination (reads farmer by page and limit passed.)
  **/
  }
