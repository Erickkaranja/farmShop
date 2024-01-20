class produceController {
  //creates produce
  static createProduce(res, req, next, db) {
    db.models.Produce.create(req.body, (err, produce) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send('produce saves successfully.')
      }
    })
    
  }
  //get all produces.
  static getAllProduce(res, req, next, db) {
    db.models.Produce.find().sort({"_id": 1}).exec((err, produce) => {
      res.send(produce)
    })
  }
  //get produce by id : rem create middleware to check id exist in req.params.
  static getProduceById(res, req, next, db) {
    db.models.Produce.findById(req.query.id)
    .exec((err, produce) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send(produce)
      }
    })
  }
  //update produce by given id.
  static updateProduceById(res, req, next, db) {
    db.models.Produce.findOneAndUpdate({id: req.query.id}, 
    req.body, (err, produce) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send(`produce ${produce.id} updated sucessfully`)
      }
    })
  }
  //mongoose 6+ depricated func remove update to use updateOne.
  static deleteProduceById(res, req, next, db) {
    db.models.Produce.deleteOne(_id: req.query.id, (err) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send(`produce ${req.query.id} deleted successfully.`)
      }
    })
  }
  //implement delete many to handle cascade type.
  static deleteProduceByFarmerId(res, req, next, db) {
    db.models.Produce.deleteMany({farmerId: req.query.famerId }, (err) => {
      if (err) {
        console.error(err)
        res.status(500).send()
      } else {
        res.status(200).send('All farmer associated produce deleted.!!')
      }
    })
  }
}

module.exports = produceController
