'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.ProductCategory, { foreignKey: 'categoryId' });
      Product.hasMany(models.CartDetail, { foreignKey: 'productId' });
    }
  }
  Product.init({
    productName: DataTypes.STRING,
    productCategory: DataTypes.STRING,
    productDescription: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};