'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots';
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: '123 Elmo St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      lat: 70.5, //-90 90
      lng: -100.1, //-180 180
      name: 'Sim City',
      description: 'The city for Sims',
      price: 100
    },
    {
      ownerId: 2,
      address: '420 Main St',
      city: 'San Mateo',
      state: 'CA',
      country: 'USA',
      lat: 59.4321, //-90 90
      lng: -120.9111, //-180 180
      name: 'A Cabin in the Woods',
      description: 'Film Scary Movies here!',
      price: 75
    },
    {
      ownerId: 3,
      address: '911 Donut Ave',
      city: 'Irvine',
      state: 'CA',
      country: 'USA',
      lat: 40.1234, //-90 90
      lng: -76.2218, //-180 180
      name: 'Love Island Villa',
      description: 'The place from that TV show',
      price: 500
    }
  ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Elmo St', '420 Main St', '911 Donut Ave']}
    }, {});
  }
};
