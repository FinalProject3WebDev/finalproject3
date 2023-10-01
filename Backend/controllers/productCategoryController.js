const { ProductCategory } = require('../models'); // Sesuaikan dengan lokasi model Anda

class ProductCategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await ProductCategory.findAll();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve categories' });
    }
  }
}

module.exports = ProductCategoryController;
