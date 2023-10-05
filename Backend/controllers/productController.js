const db = require("../models");
const { urlPath } = require('../helpers/urlPath');
// Import filesystem module 
const fs = require('fs'); 

const Product = db.Product;

class ProductController {
  async getAllProducts(req, res) {
    try {
      let products
      if (!!req.query.categoryId) {
        const categoryId = req.query.categoryId 
        products = await Product.findAll({
          where: {
            categoryId
          }
        });
      } else {
        products = await Product.findAll();
      }

      products = products.map((value) => {
        value.productImage = urlPath(value.productImage, req)

        return value
      })

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createProduct(req, res) {
    try {
        if (res.locals.user.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Only admin can create products.' });
        }

        const {
            categoryId,
            productName,
            productDescription,
            price,
            stock,
            productImage,
        } = req.body;

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
    const productId = req.params.productId;
    try {
      if (res.locals.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }

      const deletedProduct = await Product.destroy({
        where: {
          id: productId,
        },
      });

      if (deletedProduct === 1) {
        return res
          .status(200)
          .json({ message: "Product has been deleted successfully" });
      } else {
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete the product" });
    }
  }

  async editProduct(req, res) {
    const productId = req.params.productId;
    const { productName, productDescription, price, stock, categoryId} = req.body;

    try {
      if (res.locals.user.role !== 'admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
      // Find produk berdasarkan ID
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update atribut-atribut produk
      product.productName = productName;
      product.productDescription = productDescription;
      product.price = price;
      product.stock = stock;
      product.categoryId = categoryId;

      // Simpan perubahan ke database
      await product.save();

      return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update product" });
    }
  }

  async uploadImage(req, res) {
    const timestamp = new Date().getTime();
    try {
      let image = req.files.uploads.path
      const productId = req.query.productId 
      if (!productId) {
        fs.unlinkSync(image);
        return res.status(400).json({ message: 'id is missing' });
      }

      if (res.locals.user.role !== 'admin') {
        fs.unlinkSync(image);
        return res.status(403).json({ message: 'Permission denied' });
      }

      // Find produk berdasarkan ID
      const product = await Product.findByPk(productId);

      
      if (!product) {
        fs.unlinkSync(image);
        return res.status(404).json({ message: "Product not found" });
      }

      let extension = image.split(".")[1]
      const newName = `images/${timestamp}-${product.productName.replace(" ","-").toLowerCase()}.` + extension
      fs.rename(image, newName, () => {}); 

      product.productImage = newName

      // Simpan perubahan ke database
      await product.save();

      return res.status(200).json({ message: "Image Product updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to update product" });
    }
  }
}

module.exports = new ProductController();
