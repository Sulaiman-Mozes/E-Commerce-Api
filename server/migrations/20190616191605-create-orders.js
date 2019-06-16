'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defautValue: 0.00,
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      shipped_on: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defautValue: 0,
      },
      comments: {
        type: Sequelize.STRING(255),
      },
      auth_code: {
        type: Sequelize.STRING(50),
      },
      reference: {
        type: Sequelize.STRING(50),
      },
      shipping_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shippings',
          key: 'shipping_id'
        },
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'customer_id'
        },
      },
      tax_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Taxes',
          key: 'tax_id'
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};