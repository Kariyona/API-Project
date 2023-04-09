"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Reviews";
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
          userId: 1,
          spotId: 1,
          review: "Beautiful house!",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 2,
          review: "This place is amazing!",
          stars: 5,
        },
        {
          userId: 1,
          spotId: 3,
          review: "This place was okay",
          stars: 3,
        },
        {
          userId: 2,
          spotId: 4,
          review: "My family enjoyed staying here",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 5,
          review: "It was a decent vacation",
          stars: 3,
        },
        {
          userId: 2,
          spotId: 6,
          review: "I really like this place",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 7,
          review: "The decor hurts my eyes",
          stars: 1,
        },
        {
          userId: 3,
          spotId: 8,
          review: "The wifi is bad",
          stars: 1,
        },
        {
          userId: 3,
          spotId: 9,
          review: "The included breakfast was yummy",
          stars: 4,
        },
        {
          userId: 3,
          spotId: 10,
          review: "The service was okay",
          stars: 3,
        },
        {
          userId: 3,
          spotId: 1,
          review: "The service was bad",
          stars: 2,
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
        userId: {
          [Op.in]: [ 1,2,3 ] },
      },
      {}
    );
  },
};
