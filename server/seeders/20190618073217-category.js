
const data = require('./data/data.json');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Categories', data.categories, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Categories', null, {}),
};
