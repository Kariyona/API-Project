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

// DELETE AN EXISTING IMAGE FOR A REVIEW!!!
router.delete("/:imageId", [requireAuth], async (req, res) => {
  const reviewImage = await ReviewImage.findOne({
    where: {
      id: req.params.imageId,
    },
    include: [
      {
        model: Review,
        where: {
          userId: req.user.id,
        },
      },
    ],
  });

  if (!reviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
    });
  }

  if (reviewImage.review.userId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden"
    })
  }

  await reviewImage.destroy();
  return res.status(200).json({
    message: "Successfully deleted",
  });
});

module.exports = router;
