class Reviews {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.createModel()
  }
  createModel() {
    const Schema = this.mongoose.Schema;
    this.mongoose.model('Review', new Schema({
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String, maxLength: 1000 }
}, {timestamps: true }))}
}

module.exports = Reviews;
