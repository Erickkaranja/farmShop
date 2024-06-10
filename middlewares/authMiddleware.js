require('dotenv').config()

const jwt = require('jsonwebtoken');
class authenticationMiddleware {
  checkTokenInBody(req, res, next) {
    if (req.params.token) {
      next()
    } else {
      res.status(400).send('There is no token provided.')
    }
  }
  checkAuthHeader(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
}

module.exports = new authenticationMiddleware();
