const Produce = require('../models/produce');

class produceController {
  //creates a new product.
  async createNewProduct(res, req, next) {
    const { farmerId, produceName, quantity, category, unitPrice, description} = req.body;
    // create middleware function to check on ALL REQUIRED details.
    const newProduce = new Produce({
       farmerId: farmerId,
       produceName: produceName,
       quantity: quantity,
       category: category,
       unitPrice: unitPrice,
       description: description
    });
    newProduce.save();
    res.status(201).json({id: newProduce._id});
  }
  async getAllProducts(res, req, next) { 
    const produce  = produce.find();
    if (produce) {
      res.status(200).json({ produce });
    }
  }
  async getProductByCategory(res, req, next) {
    const categoryProduct = Produce.find({ category: req.param['category']});
    if (category) {
      res.status(200).json({ categoryProduct });
    }
  }
  async getProductById(req, res, next) {
    const produceId = req.param['produceId'];
    const product = Produce.find({ produceId: produceId});
    if (product) {
      res.status(200).json({ product });
    }
  }
  async deleteProductById() {}
}
