'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ProductCategory.belongsTo(models.Product, { foreignKey: 'categoryId' });
    }
  }
  ProductCategory.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'ProductCategories'
  });
  return ProductCategory;
};