// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // POST /api/bookings - Save a new booking
// router.post('/', async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     const savedBooking = await newBooking.save();
//     res.status(201).json(savedBooking);
//   } catch (err) {
//     console.error('❌ Backend Validation Error:', err.message); // Logs helpful error
//     res.status(400).json({ error: err.message });
//   }
// });

// // GET /api/bookings - Fetch all bookings (admin/testing)
// router.get('/', async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (err) {
//     console.error('❌ Error fetching bookings:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
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
