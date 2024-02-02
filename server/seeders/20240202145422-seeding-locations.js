'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/locations.json', 'utf-8')).map((el, i) => {
      let timestamp = new Date().getTime() + i * 1000
      el.createdAt = el.updatedAt = new Date(timestamp)
      return el
    })
    await queryInterface.bulkInsert('Locations', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Locations', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
