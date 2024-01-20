class Produce {
  constructor(mongoose) {
  this.mongoose = mongoose;
  this.createModel()
  }
  createModel() {
    const Schema = this.mongoose.Schema;
    this.mongoose.model('Produce', new Schema({
      farmerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' }],
      produceName: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      description: { type: String, required: true }
    }, {timestamps: true})
}
}

module.exports = Produce;
