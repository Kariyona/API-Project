const express = require("express");
const { Op } = require("sequelize");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

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

// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", [requireAuth], async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId === req.user.id) {
    return res
      .status(403)
      .json({ message: "Spot must NOT belong to you to be able to book!" });
  }

  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);

  if (endDate <= startDate) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }

  const existingBooking = await Booking.findOne({
    where: {
      spotId: req.params.spotId,
      startDate: {
        [Op.lt]: endDate,
      },
      endDate: {
        [Op.gt]: startDate,
      },
    },
  });

  if (existingBooking) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  const booking = await Booking.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    startDate,
    endDate,
  });
  return res.status(200).json(booking);
});

// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", [requireAuth], async (req, res) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const userId = req.user.id;

  const bookings = await Booking.findAll({
    where: {
      spotId: spotId,
    },
    include: {
      model: User,
      attributes: ["id", "firstName", "lastName"],
    },
  });

  const bookingsList = [];
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];

    // console.log("booking.startDate raw:", booking.startDate);
    // console.log("booking.endDate raw:", booking.endDate);

    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);

    // console.log("booking.startDate raw:", startDate);
    // console.log("booking.endDate raw:", endDate);

    let bookingResponse;

    if (userId === spot.ownerId) {
      bookingResponse = {
        User: booking.User,
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.User.id,
        startDate: startDate,
        endDate: endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      };
    } else {
      bookingResponse = {
        spotId: booking.spotId,
        startDate: startDate,
        endDate: endDate,
      };
    }
    bookingsList.push(bookingResponse);
  }
  return res.status(200).json({
    Bookings: bookingsList,
  });
});

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
  res.json({
    Reviews: reviews,
  });
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
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  if (!page) {
    page = 1;
  }

  if (!size) {
    size = 20;
  }

  page = parseInt(page);
  size = parseInt(size);
  minLat = parseFloat(minLat);
  minLng = parseFloat(minLng);
  maxLat = parseFloat(maxLat);
  maxLng = parseFloat(maxLng);
  minPrice = parseFloat(minPrice);
  maxPrice = parseFloat(maxPrice);

  const where = {};

  const errors = {};

  if ((page || page === 0) && (isNaN(page) || page < 1)) {
    errors.page = "Page must be greater than or equal to 1";
  }

  if ((size || size === 0) && (isNaN(size) || size < 1)) {
    errors.size = "Size must be greater than or equal to 1";
  }
  if (minLat && (minLat > maxLat || minLat < -90 || minLat > 90 || isNaN(minLat))) {
    errors.minLat = "Minimum latitude is invalid"
  }

  if (maxLat && (maxLat < minLat || maxLat < -90 || maxLat > 90 || isNaN(maxLat))) {
    errors.maxLat = "Maximum latitude is invalid"
  }

  if (
    minLng &&
    (minLng > maxLng || minLng < -180 || minLng > 180 || isNaN(minLng))
  ) {
    errors.minLng = "Minimum longitude is invalid";
  }

  if (
    maxLng &&
    (maxLng < minLng || maxLng < -180 || maxLng > 180 || isNaN(maxLng))
  ) {
    errors.maxLng = "Maximum longitude is invalid";
  }

  if (minPrice && (isNaN(minPrice) || minPrice < 0)) {
    errors.minPrice = "Minimum price must be greater than or equal to 0";
  }

  if (maxPrice && (isNaN(maxPrice) || maxPrice < 0)) {
    errors.maxPrice = "Maximum price must be greater than or equal to 0";
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({
      message: "Bad Request",
      errors,
    });
  }

  if (minLat) {
    where.lat = {
      [Op.gte]: minLat
    };
  }

  if (maxLat) {
    where.lat = {
      [Op.lte]: maxLat
    };
  }

  if (minLng) {
    where.lng = {
      [Op.gte]: minLng
    };
  }

  if (maxLng) {
    where.lng = {
      [Op.lte]: maxLng
    };
  }

  if (minPrice) {
    where.price = {
      [Op.gte]: minPrice
    };
  }

  if (maxPrice) {
    where.price = {
      [Op.lte]: maxPrice
    };
  }

  const offset = (page - 1) * size;

  let spotsList = [];
  const spots = await Spot.findAll({
    where,
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
    offset: offset,
    limit: size,
    order: ["id"],
  });

  spots.forEach((spot) => {
    spotsList.push(spot.toJSON());
  });

  spotsList.forEach((spot) => {
    let sum = 0;
    let count = 0;

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
    page,
    size,
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
