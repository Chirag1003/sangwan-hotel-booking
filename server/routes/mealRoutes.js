const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// ✅ GET all meals
router.get('/', async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals); // Always return an array
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch meals', error: err.message });
  }
});

// ✅ UPDATE a meal's price by name
// router.post('/update', async (req, res) => {
//   const { name, price } = req.body;

//   if (!name || price === undefined) {
//     return res.status(400).json({ message: 'Name and price are required' });
//   }

//   try {
//     const meal = await Meal.findOne({ name });

//     if (!meal) {
//       return res.status(404).json({ message: 'Meal not found' });
//     }

//     meal.price = price;
//     await meal.save();
//     res.json({ message: 'Meal updated successfully', meal });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to update meal', error: err.message });
//   }
// });
// ✅ Update existing meal
router.post('/update', async (req, res) => {
  const { name, price } = req.body;
  try {
    const meal = await Meal.findOne({ name });
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    meal.price = price;
    await meal.save();
    res.json({ message: 'Meal updated', meal });
  } catch (err) {
    console.error('Update meal error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    res.json({ message: 'Meal deleted successfully' });
  } catch (err) {
    console.error('Delete meal error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// ✅ ADD a new meal type
router.post('/add', async (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: 'Meal name and price are required' });
  }

  try {
    const existing = await Meal.findOne({ name });

    if (existing) {
      return res.status(400).json({ message: 'Meal already exists' });
    }

    const newMeal = await Meal.create({ name, price });
    res.status(201).json({ message: 'New meal added', meal: newMeal });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add meal', error: err.message });
  }
});

module.exports = router;
