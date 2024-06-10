const Favourite = require('../models/favorite');
const mongoose = require('mongoose');
class favouriteController {
  
  async createFavourite(req, res) {
    const { userId, productId } = req.body;
    const newFavourite = new Favourite({
      userId: userId,
      productId: productId
    })
    try {
      await newFavourite.save();
      res.status(201).json({ id: newFavourite.id});
    } catch(err) {
      res.status(500).json({ error: "error adding to favourites"});
    }
  }

  //gets favourites bases on the userId and returns all products.
  async getFavouritesByUser(req, res) {
    const objectId = new mongoose.Types.ObjectId(req.params.userId);
    try {
      const favourites = await Favourite.find({ userId: objectId});
      res.status(200).json({ favourites });
    } catch(err) {
      res.status(500).json({err: 'error'})
    }
 }


  async deleteFavouriteById(req, res) {
    try {
      const objectId = new mongoose.Types.ObjectId(req.params.favouriteId);
      await Favourite.deleteOne({_id: objectId});
      res.status(204).json({})
   } catch(err) {
     res.status(500).json({error: 'error deleting'})
   }
  }
}

module.exports = new favouriteController();
