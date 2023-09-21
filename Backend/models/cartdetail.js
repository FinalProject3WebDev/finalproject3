'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartDetail.belongsTo(models.Product, { foreignKey: 'productId' });
      CartDetail.belongsTo(models.Cart, { foreignKey: 'orderId' });
    }
  }
  CartDetail.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CartDetail',
  });
  return CartDetail;
};