'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Departments', {
      department_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      description: { type: Sequelize.TEXT(1000) },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Departments');
  }
};
