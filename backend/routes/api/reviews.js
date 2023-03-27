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

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", [requireAuth], async (req, res) => {
  const { user } = req;

  const review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (user.id !== review.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { url } = req.body;

  const numberOfImages = await ReviewImage.findAll({
    where: {
      reviewId: review.id,
    },
  });

  if (numberOfImages.length >= 10) {
    return res.status(400).json({
      message: "Maximum number of images for this resource was reached",
    });
  }

  const addImage = await ReviewImage.create({
    reviewId: review.id,
    url,
  });

  const newImage = addImage.toJSON();

  delete newImage.reviewId;
  delete newImage.createdAt;
  delete newImage.updatedAt;

  return res.status(200).json(newImage);
});

// Edit a Review
router.put("/:reviewId", [requireAuth, validateReview], async (req, res) => {
  const { user } = req;
  const reviewId = req.params.reviewId;

  // let review = await Review.findByPk(req.params.reviewId)
  let review = await Review.findOne({
    where: {
      id: reviewId
    },
    include: [User, Spot],
    attributes: [
      "id",
      "userId",
      "spotId",
      "review",
      "stars",
      "createdAt",
      "updatedAt",
    ],
  });

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  // console.log(review)
  // const spot = await Spot.findByPk(review.spotId)

  if (review.userId !== user.id) {
    return res.status(403).json({
      message: "Forbidden"
    })
  }


  const { review: updatedReview, stars: updatedStars } = req.body;

  await review.update({
    review: updatedReview,
    stars: updatedStars,
  });

  review = review.toJSON();

  delete review.User;
  delete review.Spot;

  res.json(review);
});

// Delete a Review
router.delete("/:reviewId", [requireAuth], async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;

  const review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  if (user.id === review.userId) {
    await review.destroy();
    return res.status(200).json({
      message: "Successfully deleted",
    });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// Get all Reviews of the Current User
router.get("/current", [requireAuth], async (req, res) => {
  const { user } = req;

  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
        include: [
          {
            model: SpotImage,
            attributes: ["url"],
          },
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  let reviewsList = [];

  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];

    const reviewsObject = review.toJSON();
    let previewImage = "";
    if (review.Spot.SpotImages.length > 0) {
      previewImage = review.Spot.SpotImages[0].url;
    }

    reviewsObject.Spot.previewImage = previewImage;
    delete reviewsObject.Spot.SpotImages;
    reviewsList.push(reviewsObject);
  }

  res.status(200).json({ Reviews: reviewsList });
  console.log();
});

//remove description from Spot
//remove createdAt and updatedAt from Spot
//add previewImage to Spot

//removeImages should only show id and url
//aka remove reviewId, createdAt, updatedAt
module.exports = router;
