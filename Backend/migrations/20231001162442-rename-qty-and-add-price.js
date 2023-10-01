'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // rename the 'qty' column to 'quantity'
    await queryInterface.renameColumn('CartItems', 'qty', 'quantity');

    // add 'price' column
    await queryInterface.addColumn('CartItems', 'price', {
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('CartItems', 'quantity', 'qty');
    await queryInterface.removeColumn('CartItems', 'price');
  },
};
