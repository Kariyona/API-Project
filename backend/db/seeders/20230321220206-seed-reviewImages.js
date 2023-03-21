'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'ReviewImages';
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'https://exampleurl.com/reviewimage1.jpg'
    },
    {
      reviewId: 2,
      url: 'https://exampleurl.com/reviewimage2.jpg'
    },
    {
      reviewId: 3,
      url: 'https://exampleurl.com/reviewimage3.jpg'
    }
   ], {});
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
      url: { [Op.in]: ['https://exampleurl.com/reviewimage1.jpg','https://exampleurl.com/reviewimage2.jpg','https://exampleurl.com/reviewimage3.jpg']}
    }, {});
  }
};
