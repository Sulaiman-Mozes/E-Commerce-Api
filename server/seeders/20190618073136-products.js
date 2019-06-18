
const data = require('./data/data.json');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Products', data.products, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {}),
};
