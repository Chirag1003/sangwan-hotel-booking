
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Add new booking
router.post('/', async (req, res) => {
  const { userId, guests, checkin, checkout, roomCategory, breakfast, dinner, guestDetails, totalPrice } = req.body;

  try {
    const newBooking = await Booking.create({
      userId,
      guests,
      checkin,
      checkout,
      roomCategory,
      breakfast,
      dinner,
      guestDetails,
      totalPrice,
    });

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
