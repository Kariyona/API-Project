"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "SpotImages";
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://exampleurl.com/spotimage1.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://exampleurl.com/spotimage2.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://exampleurl.com/spotimage3.jpg",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "https://exampleurl.com/spotimage1.jpg",
            "https://exampleurl.com/spotimage2.jpg",
            "https://exampleurl.com/spotimage3.jpg",
          ],
        },
      },
      {}
    );
  },
};
