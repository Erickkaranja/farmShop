class authenticationMiddleware {
  constructor(app) {
    this.app()
  }

  // authenticates user by comparing hash and passed password
  async findUser(email) {
    const user = await User.findOne({ email: email});
    return user
  }

  generateAccessToken(user) {
     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '100s' })
   }

  async passwordAuthentication(email, password) {
       const user = findUser(email);
       if (!user) {
         return ("email not registered");
       }
       const hashedPassword = user.password;
       const boolHash = await bcrypt.compare(password, hashedPassword);
       // the response is a boolean
       return boolHash
  } 
  //handle new user login.
  loginUser(req, res, next) {
     const { email, password } = req.body;
      passAuth = passwordAuthentication(email, password);
     if (!passAuth) {
       return res.sendStatus(401)
     }
     const user = findUser(email);
     const accessToken = generateAccessToken(user);
     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
     user.refreshToken = refreshToken;
     await user.save();
     res.status(201).json({accessToken: accessToken, refreshToken: refreshToken });
     
  }
  //handle refresh token.
  handleRefreshToken(req, res, next) {
  }
  //handle user login.
  handleLogin(req, res, next) {
  }
  //handles user logout and remember to add redirections.
  handleLogout(req, res, next) {
  }
}
