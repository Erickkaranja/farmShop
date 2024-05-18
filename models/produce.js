const mongoose = require('mongoose');

const produceSchema = mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' },
  produceName: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: {type: String, required: true},
  unitPrice: { type: Number, required: true },
  description: { type: String, required: true }
}, {timestamps: true})

const Produce = mongoose.model('Produce', produceSchema);
module.exports = Produce;
