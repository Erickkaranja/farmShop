class reviewController {
  /**create a review rem: review is associated with a given user
     ensure to check if userId exist in the req parameter
  **/
  static createReview(req, res, next, db) {
    db.models.Reviews.create(req.body, (err, review)) {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send('review updated successfully.')
      }
    }
  }
  /**
    list all reviews
  **/
  static getAllReviews(req, res, next, db) {
    db.models.Review.find().sort({"_id": 1}).exec((err, reviews) => {
       res.send(reviews)
    })
  }
  /**
    obtains a given review by id: rem ensure to create a middleware that ensure
    the id is in the req.params
  **/
  static getReviewById(req, res, next, db) {
    db.models.Review.findById(req.query.id)
    .exec((err, review) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send(review)
      }
    })
  }
  /**
   updates a given review by its id.
  **/
  static updateReviewById(req, res, next, db) {
    db.models.Review.findOneAndUpdate({
      id: req.query.id
    }, req.body, (err, review) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send(`review ${req.query.id} updated successfully.`)
      }
      }
    })
  }
  /**
    deletes review by Id
  **/
  static deleteReviewById(res, req, next, db) {
    db.models.Review.remove({
      id: req.query.id
    }, (err) => {
       if (err) {
         console.error(err)
         res.status(500).send()
       } else {
         res.status(200).send(`review ${req.query.id} deleted successfully.`)
       }
    })
  }
}
module.exports = reviewController
