const Produce = require('../models/produce');

class produceController {
  //creates a new product.
  async createNewProduct(req, res, next) {
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
  async getAllProducts(req, res, next) { 
    const produce  = await Produce.find();
    if (produce) {
      res.status(200).json({ produce });
    }
  }
  async getProductByCategory(req, res, next) {
    const categoryProduct = await Produce.find({ category: req.params.category});
    console.log(categoryProduct);
    if (categoryProduct) {
      res.status(200).json(categoryProduct);
    }
  }
  async getProductById(req, res, next) {
    const produceId = req.param['produceId'];
    const product = Produce.find({ produceId: produceId});
    if (product) {
      res.status(200).json({ product });
    }
  }
  async deleteProductById(req, res, next) {
    const produceId = req.param['produceId'];
    await Produce.deleteOne({id: produceId});
    res.status(204).json({});
  }
}

module.exports = new produceController();
