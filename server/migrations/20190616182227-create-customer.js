'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customers', {
      customer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      credit_card: {
        type: Sequelize.TEXT,
      },
      address_1: {
        type: Sequelize.STRING(100),
      },
      address_2: {
        type: Sequelize.STRING(100),
      },
      city: {
        type: Sequelize.STRING(100),
      },
      region: {
        type: Sequelize.STRING(100),
      },
      postal_code: {
        type: Sequelize.STRING(100),
      },
      country: {
        type: Sequelize.STRING(100),
      },
      shipping_region_id: {
        type: Sequelize.INTEGER,
        defaultValue: '1',
        allowNull: false,
      },
      day_phone: {
        type: Sequelize.STRING(100),
      },
      eve_phone: {
        type: Sequelize.STRING(100),
      },
      mob_phone: {
        type: Sequelize.STRING(100),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Customers');
  }
};