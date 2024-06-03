const Favourite = require('../models/favorite');

class favouriteController {
  
  async createFavourite(req, res, next) {
    const { userId, productId } = req.body;
    const newFavourite = new Favourite({
      userId: userId,
      productId: productId
    })
    newFavourite.save();
    res.status(201).json({ id: newFavourite.id});
  }

  //gets favourites bases on the userId and returns all products.
  async getFavouritesByUser(req, res, next) {
    const userId = req.params.userId;
    if (userId) {
      const favourites = await Favourite.find({ userId: userId});
      res.status(200).json({ favourites });
    }
  }


  async deleteFavouriteById(res, req, next) {
    await Favourite.deleteOne({_id: req.params.id});
    res.status(204).json({})
  }
}

module.exports = new favouriteController();
