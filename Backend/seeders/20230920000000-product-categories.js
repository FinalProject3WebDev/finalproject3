'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProductCategories', [
      {
        id: 1, 
        categoryName: 'Headphones',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2, 
        categoryName: 'Earphones',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3, 
        categoryName: 'Earbuds',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4, 
        categoryName: 'Accesories',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
