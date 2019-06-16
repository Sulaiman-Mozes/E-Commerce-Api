

const data = require('./data/data.json');
const Attribute = require('./20190614201121-attribute');


module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('AttributeValues', data.attributeValues, {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('AttributeValues', null, {}),
};
