
const data = require('./data/data.json');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Departments', data.departments, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Departments', null, {}),
};
