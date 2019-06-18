

const data = require('./data/data.json');

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('AttributeValues', data.attributeValues, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('AttributeValues', null, {}),
};
