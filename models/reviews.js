const mongoose = require('mongoose');

const reviewSchema = mongooseSchema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      produceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produce', required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String, maxLength: 1000 }
}, {timestamps: true })

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
