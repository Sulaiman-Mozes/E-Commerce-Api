
const data = require('./data/data.json');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Shippings', data.shippings, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Shippings', null, {}),
};
