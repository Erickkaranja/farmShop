class userController {
  static createUser(res, req, next, db) {
    //creates a new user.
    db.models.create(req.body, (err, user) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send('user created successfully.')
      }
    })
  }

  static getAllUsers(res, req, next, db) {
    db.models.find().sort({'_id': 1 }).exec((err, users) => {
      res.send(users)
    })
  }
  static getUserByEmail(res, req, next, db) {
    
  }
}
