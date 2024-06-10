const bcrypt = require('bcrypt');
const User = require('../models/user');
const Review = require('../models/review');
const Favourite = require('../models/favorite');
const mongoose = require('mongoose');
class userController {
  async hashPassword(password) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        throw err;
    }
  }

  postNew = async (req, res) => {
    console.log(req.body);
    const { email, password, firstname, lastname, coordinates, profilePicture } = req.body;
    const savedEmail = await User.findOne({email: email});
    if (savedEmail) {
      return res.status(400).json({error: 'user email already exists!!'})
    }
    const hashedPassword = await this.hashPassword(password);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
      coordinates: coordinates,
      profilePicture: profilePicture
    });
    try {
      newUser.save();
      } catch(err) {
         return res.status(400).json({error: err})
      }
    res.status(201).json({id: newUser.id, email: newUser.email})
  }
  //implement pagination
  async getAllUsers(req, res) {
    const allUser = await User.find({}, 'firstname lastname email profilePicture')
    res.status(200).json(allUser)
    }
  //check if id parameter is valid
  async getFavouriteByUser(req, res) {
    const userId = mongoose.Types.ObjectId(req.params.userId);
    //check if its a valid user
    const user = await User.find({_id: userId});
    if (!user) {
       return res.status(400).json({error: 'not a valid user'});
    }
    try {
      const favourites = await Favourite.find({userId: userId})
      res.status(200).json(favourites);
    } catch(err) {
      res.status(500).json({error: err});
    }
  }
  async getReviewByUser(req, res) {
    const userId = new mongoose.Types.ObjectId(req.params.useId);
    //check if its a valid user
    const user = await User.find({_id: userId});
    if (!user) {
       return res.status(400).json({error: 'not a valid user'});
    }   
    try {
      const reviews = await Review.find({userId: userId})
      res.status(200).json(reviews);
    } catch(err) {
      res.status(500).json({error: err});
    }   

  }
  async updateUserById(req, res) {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
     const keysToFilter = ['_id', 'createAt', 'updatedAt', 'email', 'coordinates', 'password', 'passwordResetToken',
                           'passwordResetTokenExpiration', 'isVerified', 'verificationToken',
                           'accessToken' ,'refreshToken', 'tokenExpiration' ]
     const updatedKeys = req.body;
     console.log(updatedKeys);
     const filteredObject = Object.entries(updatedKeys)
       .filter(([key]) => !keysToFilter.includes(key))
       .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
     console.log(filteredObject);
     try {
       const user = await User.findByIdAndUpdate(UserId, filteredObject, { new: true });
       console.log(user);
       if (!user) {
         return res.status(400).json({error: 'user does not exist'});
       }
       res.status(200).json(user)
     } catch(err) {
       res.status(500).json({error: err});
       }

  }
  async deleteUserById(req, res) {
    const objectId = new mongoose.Types.ObjectId(req.params.userId);
    await User.deleteOne({_id: objectId});
    await Review.deleteMany({ userId: objectId});
    await Favourite.deleteMany({ userId: objectId });

     res.status(204).json({});
   }

}

module.exports = new userController();
