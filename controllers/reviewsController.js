const Review = require('../models/review');

class reviewController {
  async createReview(res, req, next) {
    //userId must be acquired from redis session a redirection to login if not.
    const { userId, produceId, rating, comment } = req.body;
    const newReview = new Review({
      userId: userId,
      produceId: produceId,
      rating: rating,
      comment: comment
    });
    newReview.save();
    res.status(201).json({newReview._id});
  }
  async getReviewById(res, req, next) {
    // confirm the mongodb id parameter.
    const reviewId = req.param['id'];
    const review = Review.find({ reviewId: reviewId });
    if (review) {
      res.status(200).json({ review });
    }
  }
  async getAllReviews(res, req, next) {
    const reviews = review.find();
    if (review) {
      res.status(200).json({ reviews });
    }
  }
  async deleteReview(res, req, next) {
  }
}
