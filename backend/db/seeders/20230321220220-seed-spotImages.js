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
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-6378814/original/7aa897b8-b3c5-4c08-9294-0a9011a3f889.jpeg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-6378814/original/d861e05a-f989-4e86-80d0-860c5c1b8151.jpeg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/591332b4-8d5b-4e1e-858c-273221c3e160.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-6378814/original/b2222a31-d6e1-415c-90e4-ae7035e77a26.jpeg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-6378814/original/7e0fc84a-4e63-43d8-9ecd-1785a21a7f4c.jpeg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/e0d990f4-f101-4968-be53-93023f63d470.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25765700/original/640f287a-b4d9-439b-b872-505551b4b839.jpeg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25765700/original/9e6bf0cc-bb86-468b-9956-3cf1b919dcdc.jpeg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/23e6400c-1fc7-4cae-b3b7-3f94f3c4b9e0.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-25765700/original/603c43a6-fa19-4f45-9245-7e7ec7c2af18.jpeg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/751e1606-5d0d-44a9-aa8f-c5c62cf32481.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/5c475bd6-4bea-482c-9dca-53bc9751e3c0.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/b7a54201-aa92-43ac-b9a2-470ccd759161.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/23e6400c-1fc7-4cae-b3b7-3f94f3c4b9e0.jpg",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/b8f3fe64-8ee2-42bf-8ca6-df477cc076cc.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/b4db5900-b90e-4cc3-b12b-6d17953d0079.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/f3c57745-cd57-4cb8-a103-efac32b4cf5c.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/a0fba8a3-2ccb-4d74-83a6-734973b7215b.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/963f75ac-dfea-46a1-8993-61a4df2cb232.jpg",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/d3e54996-eb04-4e57-9d5f-0f63731a3f31.jpg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/a1c3d2c3-1834-409b-b709-005b652a277b.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-756946191999762601/original/ba9b3a4f-ce79-4e79-8ffb-93e1d1cee28b.jpeg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-756946191999762601/original/a7fc53be-9d2b-4a9e-9016-94b22b86d95f.jpeg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-756946191999762601/original/afa32fef-359a-4977-869c-f6c0960e424b.jpeg",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-756946191999762601/original/46bafd75-ecc4-43c8-8279-3ceb68345b82.jpeg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-46940755/original/8c5e5764-16c0-412f-a0ee-66b933441d4b.jpeg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-46940755/original/3d0c4b07-31f4-4c59-a246-5eb424b6ac12.jpeg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-46940755/original/ba17d4b3-8e86-43c2-adac-23183a6c0f6d.jpeg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-46940755/original/10fa05bc-5669-4e28-8314-141ff2e224dd.jpeg",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-46940755/original/5046b20e-7742-4ef0-8955-f5a5428b2b74.jpeg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-34262188/original/bb427c94-2388-43e7-aeb7-6750ae1de4b1.jpeg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://media.vrbo.com/lodging/61000000/60380000/60375400/60375375/d18dc6b4.f10.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/74fb6d9f-1f0d-49be-85fd-5768681b5bed.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://media.vrbo.com/lodging/61000000/60380000/60375400/60375375/90161809.f10.jpg",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://media.vrbo.com/lodging/61000000/60380000/60375400/60375375/faea8b1d.f10.jpg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-694734626806519945/original/8c73e63b-939f-4966-b67f-47ce8f5e6421.jpeg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-694734626806519945/original/a26da0d0-997e-4b3e-9475-c2785b410828.jpeg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-31861233/original/86c504d7-cf6e-4fdc-8468-f1e82123fa1e.jpeg",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-31861233/original/1f52e829-91e9-47e1-aa8c-7d61bbbfeb4b.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-31861233/original/8e38612a-0800-4214-bee6-e16e056313d5.jpeg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/599f6894-3103-4cfb-bc13-6b0143f439a5.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/17dd0380-0ead-4272-8d30-11b4622f2b7d.jpg",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/monet/Luxury-648434433589386891/original/3bc926f8-1d89-4a16-b7e0-e62c64a27e8e?im_w=1200",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/monet/Luxury-648434433589386891/original/d7495fd6-8aec-4934-a073-493c4a5fb016?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/monet/Luxury-648434433589386891/original/14d7fa51-34c2-44dd-94b2-bacdeea0c441?im_w=1200",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://i.imgur.com/IES3FCb.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-50712921/original/94b7cb0d-5424-4152-b09b-2a267e79a7e4.jpeg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-37525998/original/4d2ed470-94f1-4d67-b5be-cf3ef7674f87.jpeg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/31504141-2b58-43e6-af0a-67ed25c04e2e.jpg",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/e6726b54-6bf3-4c0e-a6c5-ef576686c7de.jpg",
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
