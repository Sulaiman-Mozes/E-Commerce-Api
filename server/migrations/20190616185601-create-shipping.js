'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shippings', {
      shipping_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shipping_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shipping_cost: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      shipping_region_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ShippingRegions',
          key: 'shipping_region_id'
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Shippings');
  }
};