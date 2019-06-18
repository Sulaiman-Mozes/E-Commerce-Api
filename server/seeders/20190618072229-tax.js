
const data = require('./data/data.json');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Taxes', data.taxes, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Taxes', null, {}),
};
