const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
      firstName: { type: String },
      lastName: { type: String },
      email: {  type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePicture: String,
      passwordResetToken: String,
      passwordResetTokenExpiration: Date,
      isVerified: { type: Boolean, default: false },
      coordinates: { type: { type: String, enum: ['Point'], default: 'Point' },  
      coordinates: { type: [Number], required: true }},
      verificationToken: String,
      accessToken: String,
      refreshToken: String,
      tokenExpiration: Date
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
