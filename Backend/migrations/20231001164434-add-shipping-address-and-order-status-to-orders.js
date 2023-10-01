'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Orders', 'shippingAddress', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Orders', 'orderStatus', {
      type: Sequelize.STRING,
      defaultValue: 'Packing your order',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Orders', 'shippingAddress');
    await queryInterface.removeColumn('Orders', 'orderStatus');
  },
};
