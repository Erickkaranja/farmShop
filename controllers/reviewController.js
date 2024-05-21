const Review = require('../models/review');

class reviewController {
  async createReview(req, res, next) {
    //userId must be acquired from redis session a redirection to login if not.
    const { userId, produceId, rating, comment } = req.body;
    const newReview = new Review({
      userId: userId,
      produceId: produceId,
      rating: rating,
      comment: comment
    });
    newReview.save();
    res.status(201).json({id: newReview.id});
  }
  //eliminate error on this.
  async getReviewById(req, res, next) {
    console.log(req.params.id);
    const review = await Review.findOne({ _id: req.params.id });
    console.log(review);
    if (review) {
      res.status(200).json({ review });
    }
  }
  async getAllReviews(req, res, next) {
    const reviews = await Review.find();
    if (reviews) {
      res.status(200).json({ reviews });
    }
  }
  async deleteReviewId(req, res, next) {
    await Review.deleteOne({ _id: req.params.id});
    res.status(204).json({});
  }
}

module.exports = new reviewController();
