
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Booking = require('../models/Booking');
// const authMiddleware = require('../middleware/auth');

// // ✅ Register route
// router.post('/register', async (req, res) => {
//   const { firstName, lastName, email, password, gender, age } = req.body;

//   if (!firstName || !lastName || !email || !password || !gender || !age) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const newUser = new User({ firstName, lastName, email, password, gender, age });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // ✅ Authenticated routes
// router.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// router.get('/bookings/:userId', authMiddleware, async (req, res) => {
//   try {
//     const bookings = await Booking.find({ userId: req.params.userId });
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/auth');

// ✅ Register route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, gender, age } = req.body;

  if (!firstName || !lastName || !email || !password || !gender || !age) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ firstName, lastName, email, password, gender, age });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ✅ Authenticated routes
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/bookings/:userId', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// 🔐 Admin-Only Routes
// ✅ Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, gender, age } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, gender, age },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Update User Error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all users (admin)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete user by ID (admin)
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
