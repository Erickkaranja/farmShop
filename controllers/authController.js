require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

class authController {
  async findUser(email) {
    const user = await User.findOne({ email: email});
    return user
  }

  generateAccessToken(user) {
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1000s' })
  }

  async passwordAuthentication(email, password) {
    const user = await this.findUser(email);
    if (!user) {
      return ("email not registered");
    }   
    const hashedPassword = user.password;
    const boolHash = await bcrypt.compare(password, hashedPassword);
    // the response is a boolean
    return boolHash
  }   

  loginUser = async (req, res) => {
     const { email, password } = req.body;
     const passAuth = await this.passwordAuthentication(email, password);
     if (!passAuth) {
       return res.sendStatus(401)
     }  
     const user = await this.findUser(email);
     const accessToken = await this.generateAccessToken(user);
     const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET);
     user.refreshToken = refreshToken;
     await user.save();
     res.status(201).json({accessToken: accessToken, refreshToken: refreshToken });

  }
  // generate a new access token based on refresh token
  // add middleware to check if a token is passed in req.body.
  async generateToken(req, res) {
     const refreshToken = req.body.token;
     const user = await User.findOne({ refreshToken: refreshToken});
     if (refreshToken !== user.refreshToken) return res.sendStatus(403);
     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
       if (err) return res.sendStatus(403);
       const accessToken = this.generateAccessToken(user);
       res.status(200).json({ accessToken: accessToken});
     })
  }
  async deleteToken(req, res) {
    const refreshToken = req.body.token;
    const user = await User.findOne({ refreshToken: refreshToken});
    if (refreshToken === user.refreshToken) {
      user.refreshToken = undefined;
      await user.save();
      console.log(user.refreshToken);
      res.status(204).json({});
    } else {
       res.status(400).json({ error: 'error logging out'});
    }
    
  }
}

module.exports = new authController();
