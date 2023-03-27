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

// DELETE AN EXISTING IMAGE FOR A SPOT!!!
router.delete("/:imageId", [requireAuth], async (req, res) => {

  const spotImage = await SpotImage.findByPk(req.params.imageId)

  // const spotImage = await SpotImage.findOne({
  //   where: { id: req.params.imageId },
  //   include: [
  //     {
  //       model: Spot,
  //       where: {
  //         ownerId: req.user.id,
  //       },
  //     },
  //   ],
  // });

  if (!spotImage) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
    });
  }

  const spot = await Spot.findOne({
    where: {
      id: spotImage.spotId
    }
  })

  if (spot.ownerId !== req.user.id) {
    return res.status(403).json({
      message: "Forbidden"
    })
  }

  await spotImage.destroy();
  return res.status(200).json({
    message: "Successfully deleted",
  });
});

module.exports = router;
