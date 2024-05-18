const Favourite = require('../models/favorites');

class favouriteController {
  
  async createFavourite(res, req, next) {
    const { userId, productId } = req.body;
    const newFavourite = new Favourite({
      userId: userId,
      productId: productId
    })
    newFavourite.save();
    res.status(201).json({newFavourite._id});
  }

  //gets favourites bases on the userId and returns all products.
  async getFavourites(res, req, next) {
    const userId = req.query.userId;
    if (userId) {
      const favourites = await Favourite.find({ userId: userId});
      res.status(200).json({ favourites });
    }
  }


  async deleteFavourite(res, req, next) {
  }
}
