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
          url: "https://a0.muscache.com/im/pictures/dbd01c7e-0f2c-43aa-9e88-95ca264bd116.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/bdd1f43b-46ee-4f20-b4f5-a94ef5e938db.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/e0d990f4-f101-4968-be53-93023f63d470.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/23e6400c-1fc7-4cae-b3b7-3f94f3c4b9e0.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/751e1606-5d0d-44a9-aa8f-c5c62cf32481.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/df2637ee-6cbc-4445-9e04-f99e96913e43.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/b4db5900-b90e-4cc3-b12b-6d17953d0079.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/705c4d88-0d24-4856-b8df-65215c661537.jpg?im_w=1200",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/a1c3d2c3-1834-409b-b709-005b652a277b.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/244ebd34-0067-49fb-ac7e-7f9b01798f31.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25382235/original/74fde239-0bd3-40dc-8168-394dde5c6780.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25382235/original/a20d0602-cbd7-4cad-9add-be061b633963.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-34262188/original/bb427c94-2388-43e7-aeb7-6750ae1de4b1.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/74fb6d9f-1f0d-49be-85fd-5768681b5bed.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-694734626806519945/original/8c73e63b-939f-4966-b67f-47ce8f5e6421.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-694734626806519945/original/a26da0d0-997e-4b3e-9475-c2785b410828.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/599f6894-3103-4cfb-bc13-6b0143f439a5.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/17dd0380-0ead-4272-8d30-11b4622f2b7d.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50712921/original/98a2dde7-1cdf-4a84-9313-d0fc45edb76f.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50712921/original/94b7cb0d-5424-4152-b09b-2a267e79a7e4.jpeg?im_w=1440",
          preview: false,
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
        spotId: {
          [Op.in]: [1,2,3,4,5,6,7,8,9,10] },
      },
      {}
    );
  },
};
