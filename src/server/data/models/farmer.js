class Farmer {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.createModel()
  }
  createModel {
    const Schema = this.mongoose.Schema;
    this.mongoose.model('Farmer', new Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      contact: { type: Number, unique: true, required: true },
      email: { type: String, unique: true, required: true },
      coordinates: { type: { type: String, enum: ['Point'], default: 'Point'},
      coordinates: { type: [Number], required: true }}
      }, { timestamps: true }))
}
}

module.exports = Farmer;
