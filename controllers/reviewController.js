const Review = require('../models/review');
const mongoose = require('mongoose');

class reviewController {
  async createReview(req, res) {
    //check the validity of userId and produceId.
    const { userId, produceId, rating, comment } = req.body;
    const newReview = new Review({
      userId: userId,
      produceId: produceId,
      rating: rating,
      comment: comment
    });
    try {
      newReview.save();
      res.status(201).json({id: newReview.id});
    } catch(err) {
        res.status(500).json({error: err});
    }
  }
  //check the id params
  async getReviewById(req, res) {
    const reviewId = new mongoose.Types.ObjectId(req.params.reviewId);
    try {
    const review = await Review.findOne({ _id: reviewId});
    console.log(review);
    if (review) {
      res.status(200).json(review);
    }
    } catch(error) {res.status(500).json({error: err});}
  }
  async getAllReviews(req, res) {
    const reviews = await Review.find();
    if (reviews) {
      res.status(200).json({ reviews });
    }
  }
  async deleteReviewId(req, res) {
    const reviewId = new mongoose.Types.ObjectId(req.params.reviewId);
    try {
    await Review.deleteOne({ _id: req.params.id});
    res.status(204).json({});
    } catch(err) {
      res.status(500).json({error: 'error deleting review'});
    }
  }
}

module.exports = new reviewController();
