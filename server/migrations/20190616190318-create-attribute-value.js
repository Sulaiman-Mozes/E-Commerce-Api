'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AttributeValues', {
      attribute_value_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      attribute_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Attributes',
          key: 'attribute_id'
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AttributeValues');
  }
};