class User {
  constructor(mongoose) {
    this.mongoose = mongoose
    this.createModel()
  }
  createModel() {
    const Schema = this.mongoose.Schema;
    this.mongoose.model('User', new Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: {  type: String, required: true, unique: true },
      password: { type: String, required: true },
      reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
      fullName: String,
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
)}
}

module.exports = User
