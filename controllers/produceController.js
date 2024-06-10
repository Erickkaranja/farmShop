const Produce = require('../models/produce');
const mongoose = require('mongoose');

class produceController {
  //creates a new product.
  async createNewProduct(req, res) {
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
    try {
      newProduce.save();
      res.status(201).json({id: newProduce._id});
    } catch(err) {
      res.status(500).json({error: 'error adding a new product'});
    }
  }
  async getAllProducts(req, res) { 
    const produce  = await Produce.find();
    if (produce) {
      res.status(200).json({ produce });
    }
  }
  //add middleware to check if its a valid category
  async getProductByCategory(req, res) {
    const categoryName = req.params.category;
    console.log(req.params.category);
    const categoryProduct = await Produce.find({ category: categoryName});
    console.log(categoryProduct);
    if (categoryProduct) {
      res.status(200).json(categoryProduct);
    }
  }
//check if id is a valid object of input must be a 24 character hex string, 12 byte Uint8Array, or an integer'
  async getProductById(req, res) {
    const produceId = new mongoose.Types.ObjectId(req.params.produceId);
    console.log(produceId);
    const product = await Produce.find({ _id: produceId});
    console.log(product);
    if (product) {
      res.status(200).json(product);
    }
  }
//check if id is valid
  async updateProductById(req, res) {
     const productId = new mongoose.Types.ObjectId(req.params.produceId);
     const keysToFilter = ['_id', 'createAt', 'updatedAt', 'farmerId', 'category', 'produceName' ]
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
       const produce = await Produce.findByIdAndUpdate(productId, filteredObject, { new: true });
       if (!produce) {
         return res.status(400).json({error: 'produce does not exist'});
       }
       res.status(200).json(produce)
     } catch(err) {res.status(500).send({Error: 'updating produce'});}
  
}

  async deleteProductById(req, res) {
    const produceId = new mongoose.Types.ObjectId(req.params.produceId);
    await Produce.deleteOne({id: produceId});
    res.status(204).json({});
  }
}

module.exports = new produceController();
