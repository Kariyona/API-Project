const express = require("express");
const { Op } = require("sequelize");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
} = require("../../db/models");
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

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validateSpotCreation = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

//Create a Review for a Spot based on the Spot's id
router.post(
  "/:spotId/reviews",
  [requireAuth, validateReview],
  async (req, res) => {
    const { user } = req;
    const { review, stars } = req.body;
    const spotId = parseInt(req.params.spotId);

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    const doesThisReviewExist = await Review.findOne({
      where: {
        userId: user.id,
        spotId,
      },
    });

    if (doesThisReviewExist) {
      return res.status(403).json({
        message: "User already has a review for this spot",
      });
    }

    const newReview = await Review.create({
      userId: user.id,
      spotId,
      review,
      stars,
    });

    res.status(201).json(newReview);
  }
);

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  res.json({ Reviews: reviews });
});

// Get all Spots owned by the Current User
router.get("/current", [requireAuth], async (req, res) => {
  const { user } = req;
  let spotsList = [];

  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
    // order: ["id"],
  });

  spots.forEach((spot) => {
    if (user.id === spot.ownerId) {
      // spotsList.push(spot.toJSON());
      let sum = 0;
      let count = 0;

      spot.Reviews.forEach((review) => {
        sum += review.stars;
        count++;
      });

      const avgRating = (sum / count).toFixed(1);
      const ratingNumber = parseFloat(avgRating);
      // spot.avgRating = ratingNumber;

      let previewImage = "";
      spot.SpotImages.forEach((image) => {
        if (image.preview) {
          previewImage = image.url;
        }
      });

      // spot.SpotImages.forEach((image) => {
      //   spot.previewImage = image.url;
      // });

      // if (!spot.previewImage) {
      //   spot.previewImage = "Preview image doesn't exist";
      // }

      const spotObjectResponse = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: ratingNumber,
        previewImage: previewImage,
      };

      spotsList.push(spotObjectResponse);
      // delete spot.Reviews;
      // delete spot.SpotImages;
    }
  });
  res.status(200).json({
    ["Spots"]: spotsList,
  });
});

// Get details for a Spot from an id
// Turn the object into a POJO w/ toJSON then reassign the value to a key of owner
router.get("/:spotId", async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
        as: "SpotImages",
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Review,
      },
    ],
  });

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
    });
  } else {
    // const spotDetails = spot.toJSON();
    // spotDetails.Owner = spotDetails.User;

    // console.log(spot);
    spot = spot.toJSON();
    spot.Owner = spot.User;
    // console.log(spot);

    let sum = 0;
    let count = 0;

    spot.Reviews.forEach((review) => {
      sum += review.stars;
      count++;
    });

    spot.numReviews = count;
    spot.avgStarRating = (sum / count).toFixed(1);
    const ratingNumber = parseFloat(spot.avgStarRating);
    spot.avgStarRating = ratingNumber;

    delete spot.User;
    delete spot.Reviews;

    const spotDetailsInOrder = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      desciption: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews: spot.numReviews,
      avgStarRating: spot.avgStarRating,
      SpotImages: spot.SpotImages,
      Owner: spot.Owner,
    };
    res.status(200).json(spotDetailsInOrder);
  }
});

// Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", [requireAuth], async (req, res) => {
  const { user } = req;
  // const spot = await Spot.scope(['defaultScope']).findByPk(req.params.spotId);
  const spot = await Spot.findByPk(req.params.spotId);
  // console.log(spot);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (user.id !== spot.ownerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { url, preview } = req.body;
  // instance of the model
  const addImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview,
  });

  const newImage = addImage.toJSON(); //

  delete newImage.spotId;
  delete newImage.createdAt;
  delete newImage.updatedAt;

  return res.status(200).json(newImage);
});

// Delete a Spot
router.delete("/:spotId", [requireAuth], async (req, res) => {
  const { user } = req;
  let spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (user.id === spot.ownerId) {
    await spot.destroy();
    res.status(200).json({
      message: "Successfully deleted",
    });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// Edit a Spot
router.put(
  "/:spotId",
  [requireAuth, validateSpotCreation],
  async (req, res) => {
    const { user } = req;
    // const spotId = req.params.spotId
    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (user.id === spot.ownerId) {
      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      } = req.body;
      const updatedSpot = await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      });
      res.json(updatedSpot);
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  }
);

// Get all Spots
router.get("/", async (req, res) => {
  let spotsList = [];
  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
    order: ["id"],
  });
  // console.log(spots);

  spots.forEach((spot) => {
    spotsList.push(spot.toJSON());
  });

  spotsList.forEach((spot) => {
    let sum = 0;
    // let count = await Review.count({
    //     where: {
    //         spotId: spot.id
    //     }
    // })
    let count = 0;

    // console.log(count)

    spot.Reviews.forEach((review) => {
      sum += review.stars;
      count++;
    });

    spot.avgRating = (sum / count).toFixed(1);
    const ratingNumber = parseFloat(spot.avgRating);
    spot.avgRating = ratingNumber; // console.log(ratingNumber)

    spot.SpotImages.forEach((image) => {
      if (image.preview) {
        spot.previewImage = image.url;
      }
    });

    if (!spot.previewImage) {
      spot.previewImage = "Preview image doesn't exist";
    }

    delete spot.Reviews;
    delete spot.SpotImages;
  });

  // console.log(spots)
  res.status(200).json({
    ["Spots"]: spotsList,
  });
});

// Create a Spot
router.post("/", [requireAuth, validateSpotCreation], async (req, res) => {
  const { user } = req;
  if (user) {
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;

    const newSpot = await Spot.create({
      ownerId: user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    res.status(201).json(newSpot);
  }
});

module.exports = router;
// if requires proper authorization
// const spot = await Spot.findByPk(req.params.spotId)
// if (user) --> if (user.id === spot.ownerId)
// else res.status(403).json({ message: "Forbidden" });

// get details of spot by id rough draft using alec's video
// const spotObjects = []
// for (let i = 0; i < games.length; i++) {
//   const spots = spot[i]
//   spotObjects.push(spots.toJSON())
// }

// for (let i = 0; i < spotObjects.length; i++) {
//   const spots = spotObjects[i];
//   if (spots)
// }
// console.log(spotObjects);
// res.json(spot)
// let reviewData = await Review.findOne({
//   where: {
//     spotId: Spot.id
//   },
//   attributes: {
//     include: [
//       [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
//     ]
//   }
// })
// spot.avgRating = reviewData.toJSON().avgRating
// console.log(spot.avgRating)
