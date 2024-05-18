const bcrypt = require('bcrypt');
const User = require('../models/user');

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

  postNew = async (req, res, next) => {
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

    newUser.save();
    res.status(201).json({id: newUser.id, email: newUser.email})
  }
  //implement pagination
  async getAllUsers(req, res, next) {
    const allUser = await User.find()
    res.status(200).json(allUser)
    }
  async getUserByEmail(req, res, next) {
    const email = req.params.email;
    const user = await User.findOne({email: email})
    if (!user) {
      return res.status(400).json({error: 'user not found'})
    }
    res.status(200).json(user)
  }
  async getUserById(req, res, next) {
    const id = req.params.id;
    const user = await User.findOne({_id: new objectId(id)});
    if (!user) {
      return res.status(404).json({error: 'Not found'});
    }
    res.status(200).json(user)
   }
   async deleteUserById(req, res, next) {
     const { id } = req.params;
     await db.models.deleteOne({_id: new objectId(id)})
     res.status(204).json()
   }
}

module.exports = new userController();