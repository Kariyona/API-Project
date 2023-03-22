const express = require("express");
const { Op } = require("sequelize");
const { Spot, SpotImage, Review, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// const validateSignup = [
//     check("email")
//       .exists({ checkFalsy: true })
//       .isEmail()
//       .withMessage("Please provide a valid email."),
//     check("username")
//       .exists({ checkFalsy: true })
//       .isLength({ min: 4 })
//       .withMessage("Please provide a username with at least 4 characters."),
//     check("username").not().isEmail().withMessage("Username cannot be an email."),
//     check("password")
//       .exists({ checkFalsy: true })
//       .isLength({ min: 6 })
//       .withMessage("Password must be 6 characters or more."),
//     handleValidationErrors,
// ];

const validateSpotCreation = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check("city")
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check("state")
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check("country")
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check("lat")
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check("lng")
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check("name")
        .exists({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check("price")
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors,
];

router.put('/:spotId',[requireAuth, validateSpotCreation], async (req, res) => {
    const { user } = req
    // const spotId = req.params.spotId
    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
    if (user.id === spot.ownerId) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const updatedSpot = await spot.update({
            address,
            city,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        res.json(updatedSpot)
    } else {
        res.status(403).json({ message: "Forbidden" });
    }
})

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

router.post('/', [requireAuth, validateSpotCreation], async (req, res) => {
    const { user } = req
    if (user) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const newSpot = await Spot.create({
            ownerId : user.id,
            address, city, state, country, lat, lng, name, description, price
        })
        res.status(201).json(newSpot)
    }
})

module.exports = router;
// if requires proper authorization
// const spot = await Spot.findByPk(req.params.spotId)
// if (user) --> if (user.id === spot.ownerId)
// else res.status(403).json({ message: "Forbidden" });
