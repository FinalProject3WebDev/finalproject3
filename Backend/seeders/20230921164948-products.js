'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        categoryId: 1, 
        productName: 'Pink Headphone',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 2900000, 
        stock: 50,
        productImage: './images/headphone.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 2, 
        productName: 'Bass Headphone',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 3100000, 
        stock: 30, 
        productImage: './images/headphone2.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 3, 
        productName: 'Casetify 4.1',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 990000, 
        stock: 30, 
        productImage: './images/caseip.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 4, 
        productName: 'Casetify 1.2',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 720000, 
        stock: 30, 
        productImage: './images/caseip2.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 5, 
        productName: 'Casetify 4.4',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 300000, 
        stock: 30, 
        productImage: './images/caseip3.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 6, 
        productName: 'Earbuds XA-2',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 2200000, 
        stock: 30, 
        productImage: './images/earbuds.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 7, 
        productName: 'Earbuds XC-2',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 2129000, 
        stock: 30, 
        productImage: './images/earbuds2.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 8, 
        productName: 'Magsafe 2',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 1429000, 
        stock: 30, 
        productImage: './images/magsafe.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 9, 
        productName: 'Magsafe S',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 1129000, 
        stock: 30, 
        productImage: './images/magsafe2.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryId: 10, 
        productName: 'Powerbank 4-In-1',
        productDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 100000, 
        stock: 30, 
        productImage: './images/powerbankip.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
