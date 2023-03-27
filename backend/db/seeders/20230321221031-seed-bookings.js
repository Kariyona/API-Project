"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Bookings";
/** @type {import('sequelize-cli').Migration} */
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
          userId: 1,
          startDate: new Date("2021-11-19"),
          endDate: new Date("2021-11-21"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2022-01-01"),
          endDate: new Date("2022-01-10"),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date("2021-04-01"),
          endDate: new Date("2021-06-25"),
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
        startDate: { [Op.in]: ["2021-11-19", "2022-01-01", "2021-04-01"] },
      },
      {}
    );
  },
};
