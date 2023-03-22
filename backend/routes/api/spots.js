const express = require("express");
const { Op } = require("sequelize");
const { Spot, SpotImage, Review, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get('/', async (req, res) => {
    let spotsList = [];
    const spots = await Spot.findAll({
        include: [
            {
            model: Review
            },
            {
            model: SpotImage
            }
        ],
        order: ['id']
    });
    // console.log(spots);

    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {
        let sum = 0;
        // let count = await Review.count({
        //     where: {
        //         spotId: spot.id
        //     }
        // })
        let count = 0;

        // console.log(count)

        spot.Reviews.forEach(review => {
            sum += review.stars;
            count++;
        })

        spot.avgRating = (sum/count).toFixed(1)
        const ratingNumber = parseFloat(spot.avgRating);
        spot.avgRating = ratingNumber; // console.log(ratingNumber)

        spot.SpotImages.forEach(image => {
            spot.previewImage = image.url;
        })

        delete spot.Reviews
        delete spot.SpotImages
    })

    // console.log(spots)
    res.status(200).json({
        ['Spots']: spotsList
    });
})

module.exports = router;
