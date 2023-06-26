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

// DELETE A BOOKING!!
router.delete("/:bookingId", [requireAuth], async (req, res) => {
  const { user } = req;
  console.log("User ID:", user.id);

  const booking = await Booking.findByPk(req.params.bookingId);
  console.log("Booking:", booking);

  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  const spot = await Spot.findByPk(booking.spotId);
  if (booking.userId !== user.id && spot.ownerId !== user.id) {
    console.log("Forbidden: User ID and Owner ID do not match");

    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const today = new Date().getTime();
  console.log("this is new date dot get time: ", today)
  const startDate = new Date(booking.startDate).getTime();

  console.log('this is start date dot get time: ', startDate)
  const endDate = new Date(booking.endDate).getTime();

  if (startDate <= today && endDate >= today) {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
    });
  }

  await booking.destroy();
  return res.json({ message: "Successfully deleted" });
});

// EDIT A BOOKING!!
router.put("/:bookingId", [requireAuth], async (req, res) => {
  const { user } = req;
  const bookingId = req.params.bookingId;
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  if (booking.userId !== user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const today = new Date();
  const bookingEndDate = new Date(booking.endDate);
  if (bookingEndDate < today) {
    return res.status(403).json({ message: "Past bookings can't be modified" });
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
      spotId: booking.spotId,
      startDate: {
        [Op.lt]: new Date(endDate),
      },
      endDate: {
        [Op.gt]: new Date(startDate),
      },
      id: {
        [Op.not]: booking.id,
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

  await booking.update({ startDate, endDate });

  return res.json(booking);
});

// GET ALL OF THE CURRENT USER'S BOOKINGS!!
router.get("/current", [requireAuth], async (req, res) => {
  const { user } = req;

  const bookings = await Booking.findAll({
    where: {
      userId: user.id,
    },
    include: [
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
    ],
  });

  let bookingsList = [];
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];

    // const bookingsObject = booking.toJSON()
    const bookingsObject = {
      id: booking.id,
      spotId: booking.spotId,
      Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage: "",
      },
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };

    let previewImage = "";
    if (booking.Spot.SpotImages.length > 0) {
      previewImage = booking.Spot.SpotImages[0].url;
    }

    bookingsObject.Spot.previewImage = previewImage;
    bookingsList.push(bookingsObject);
  }
  res.status(200).json({ Bookings: bookingsList });
});

module.exports = router;
