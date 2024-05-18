const mongoose = require('mongoose');

const farmerSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String},
  contact: { type: Number, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: { type: [Number], required: true }
  }
}, { timestamps: true });

// Create the Farmer model
const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;

