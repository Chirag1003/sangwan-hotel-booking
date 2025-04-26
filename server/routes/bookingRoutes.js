
// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking');

// // ✅ Add new booking
// router.post('/', async (req, res) => {
//   const { 
//     guests,
//     checkin,
//     checkout,
//     roomCategory,
//     paymentMethod,
//     guestDetails,
//     totalPrice,
//     bookedBy,
//     meals,
//   } = req.body;

//   try {
//     const newBooking = await Booking.create({
//       guests,
//       checkin,
//       checkout,
//       roomCategory,
//       paymentMethod,
//       guestDetails,
//       totalPrice,
//       bookedBy,
//       meals,
//     });

//     res.status(201).json({ message: 'Booking successful', booking: newBooking });
//   } catch (err) {
//     console.error('Error creating booking:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Get all bookings (for admin)
// router.get('/', async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (err) {
//     console.error('Error fetching bookings:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Get bookings by user's email
// router.get('/user/:email', async (req, res) => {
//   try {
//     const email = req.params.email;
//     const bookings = await Booking.find({ bookedBy: email });
//     res.json(bookings);
//   } catch (err) {
//     console.error('Error fetching user bookings:', err.message);
//     res.status(500).json({ message: 'Failed to load bookings', error: err.message });
//   }
// });

// // ✅ Delete booking by ID (admin)
// router.delete('/:id', async (req, res) => {
//   try {
//     await Booking.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Booking deleted' });
//   } catch (err) {
//     console.error('Error deleting booking:', err.message);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ Add new booking
router.post('/', async (req, res) => {
  const { 
    guests,
    checkin,
    checkout,
    roomCategory,
    paymentMethod,
    guestDetails,
    totalPrice,
    bookedBy,
    meals,
  } = req.body;

  try {
    const newBooking = await Booking.create({
      guests,
      checkin,
      checkout,
      roomCategory,
      paymentMethod,
      guestDetails,
      totalPrice,
      bookedBy,
      meals,
    });

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (err) {
    console.error('Error creating booking:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Get all bookings (for admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Get bookings by user's email
router.get('/user/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await Booking.find({ bookedBy: email });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching user bookings:', err.message);
    res.status(500).json({ message: 'Failed to load bookings', error: err.message });
  }
});

// ✅ Update booking by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (err) {
    console.error('Error updating booking:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Delete booking by ID (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    console.error('Error deleting booking:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
