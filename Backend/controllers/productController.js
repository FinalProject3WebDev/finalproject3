const db = require('../models')
const Product = db.Product

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll()
      res.json(products)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

}

module.exports = new ProductController()
