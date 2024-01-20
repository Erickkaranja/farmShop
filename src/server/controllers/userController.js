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
  //return all users
  static getAllUsers(res, req, next, db) {
    db.models.find().sort({'_id': 1 }).exec((err, users) => {
      res.send(users)
    })
  }
  //get user by email rem: create middleware to check if email exists.
  static getUserByEmail(res, req, next, db) {
    db.models.findOne({
      email: req.query.email
    })
    .exec((err, user) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send(user)
      }
    })
  }
  //get user by id rem: check if id exists in the req.body.
  static getUserById(res, req, next, db) {
    db.models.findById(req.query.id)
    .exec((err, user) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send(user)
      }
    })
  }
  // updates a user by email.
  static updateUserByEmail(res, req, next, db) {
    db.models.User.findOneAndUpdate({
      email: req.query.email
    }, req.body, (err, user) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.send(`user ${req.query.email} updated successfully.`)
      }
    })
  }
  //delete a user
  static deleteUserByEmail(res, req, next, db) {
    db.models.User.remove({
      email: req.query.email
    }, (err) => {
         if (err) {
           console.error(err)
           res.status(500).send()
         } else {
           res.status(200).send(`user ${req.query.email} deleted successfully.`)
         }
    })
  }
}
module.exports = userController
