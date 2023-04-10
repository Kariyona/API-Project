"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

options.tableName = "Spots";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "21745 Timber Cove Road",
          city: "Timber Cove",
          state: "California",
          country: "USA",
          lat: 34.0922, //-90 90
          lng: -118.5023, //-180 180
          name: "Ocean Front with Pool on Wild Sonoma Coast",
          description: "The Cove House in Timber Cove offers a dramatic and romantic experience you will savor for a lifetime. Intimate enough for the honeymoon of your dreams yet spacious enough for two couples. White water forever views, large spa and bluff top pool.",
          price: 620,
        },
        {
          ownerId: 2,
          address: "1 Indonesia St.",
          city: "Selat",
          state: "Indonesia",
          country: "Indonesia",
          lat: 50.1163, //-90 90
          lng: -122.9012, //-180 180
          name: "Magical Bamboo House",
          description: "Come visit this Magical Bamboo House for a fun surprise.",
          price: 25,
        },
        {
          ownerId: 3,
          address: "97 Kecamatan St.",
          city: "Ubud ",
          state: "Indonesia",
          country: "Indonesia",
          lat: 20.4199, //-90 90
          lng: -100.7524, //-180 180
          name: "Villa in Kecamatan",
          description: "Intimiate Private Pool Villas.",
          price: 106,
        },
        {
          ownerId: 1,
          address: "91 Malibu Beach Rd.",
          city: "Malibu",
          state: "California",
          country: "USA",
          lat: 46.113, //-90 90
          lng: -73.5972, //-180 180
          name: "Malibu Beach Oasis",
          description: "Designed by Skrillex, this Malibu Beach Oasis has easy access to the ocean, amazing views, and the privacy that your A-listers will appreciate.",
          price: 390,
        },
        {
          ownerId: 2,
          address: "140 Miles St.",
          city: "San Diego",
          state: "California",
          country: "USA",
          lat: 50.1163, //-90 90
          lng: -122.9122, //-180 180
          name: "Secluded Private Beach House",
          description: "This 6 bedrooms, 6 bath brand new luxury Tahoe Donner home has all you need to keep a big family or group of friends comfortable and well entertained for however long you book it for.",
          price: 500,
        },
        {
          ownerId: 3,
          address: "15 Park Ave.",
          city: "New York",
          state: "New York",
          country: "USA",
          lat: 41.3692, //-90 90
          lng: -87.9211, //-180 180
          name: "Cabin Under The Night Sky ",
          description: "Best view of the night sky and stars in New York. You won't get this anywhere in the city!",
          price: 640,
        },
        {
          ownerId: 1,
          address: "123 Battery St.",
          city: "San Francisco",
          state: "California",
          country: "USA",
          lat: 44.2918, //-90 90
          lng: -73.9291, //-180 180
          name: "Spacious Condo with Golden Gate Bridge view",
          description: "Open floor plan with lots of natural lighting. Away from the smelly street.",
          price: 520,
        },
        {
          ownerId: 2,
          address: "228 S Rodeo Dr.",
          city: "Chicago",
          state: "Illinois",
          country: "USA",
          lat: 1.2928, //-90 90
          lng: 103.9084, //-180 180
          name: "Beautiful home in heart of downtown Chicago",
          description: "Located in the heart of downtown, it is walking distance everywhere.",
          price: 300,
        },
        {
          ownerId: 3,
          address: "1 Sunny Side Up Rd.",
          city: "Phoenix",
          state: "Arizona",
          country: "USA",
          lat: -8.6913, //-90 90
          lng: 115.1772, //-180 180
          name: "Beachfront Bungalow Villa",
          description: "Bring your friends and unwind with the nicest views in Arizona. Escape the heat.",
          price: 200,
        },
        {
          ownerId: 1,
          address: "400 Cherry St.",
          city: "Denver",
          state: "Colorado",
          country: "USA",
          lat: 41.3851, //-90 90
          lng: 2.1347, //-180 180
          name: "Cherry Villa",
          description: "Our dog friendly villa is located 1/2 block from the Lake! 1/2 block to Patton Beach-the only dog friendly beach in the North Shore, & GarWoods Restaurant.",
          price: 400,
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
        ownerId: { [Op.in]: [1,2,3,4,5,6,7,8,9,10] },
      },
      {}
    );
  },
};
