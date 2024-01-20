class favouriteController {
  //create favourite collection.
  static createFavourite(res, req, next, db) {
    db.models.Favourite.create(req.body, (err, favourites) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status().send('added to favouties')//handle response better by adding product added to the log
      }
    })
  }
  //
}
