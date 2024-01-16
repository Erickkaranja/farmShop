class Favourite {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.createModel()
  }
  createModel {
    const Schema = this.mongoose.Schema;
    this.mongoose.model('Favourite', new Schema({
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produce'}
}, {timestamps: true })
}
}

module.exports = Favourite;
