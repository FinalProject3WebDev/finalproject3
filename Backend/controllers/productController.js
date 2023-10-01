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

  async createProduct(req, res) {
    try {
      const { categoryId, productName, productDescription, price, stock, productImage } = req.body;
  
      // Validasi data yang diterima dari request
  
      const newProduct = await Product.create({
        categoryId,
        productName,
        productDescription,
        price,
        stock,
        productImage,
      });
  
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create a new product' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.productId;
  
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.destroy();
  
      res.status(204).end(); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete the product' });
    }
  }

}

module.exports = new ProductController()
