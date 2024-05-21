const mongoose  = require('mongoose');

const favouriteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produce'}
}, {timestamps: true })

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = Favourite;
