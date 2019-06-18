
const data = require('./data/data.json');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('ShippingRegions', data.shippingRegions, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ShippingRegions', null, {}),
};
