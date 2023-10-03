'use strict';

const { hashPassword } = require('../helpers/password');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Eren',
        email: 'eren@gmail.com',
        password:hashPassword('yeager1234'),
        role:'admin',
        address:'paradise',
        phoneNumber:'0928312732',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sovia',
        email: 'sov@gmail.com',
        password:hashPassword('sov123'),
        address:'Beverlly Hills Karawaci',
        role:'member',
        phoneNumber:'0928312732',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
