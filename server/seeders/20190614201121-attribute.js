'use strict';
const data = require('./data/data.json');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Attributes', data.attributes, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Attributes', null, {}),
};
