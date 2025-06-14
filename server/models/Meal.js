// const mongoose = require('mongoose');

// const mealSchema = new mongoose.Schema({
//   breakfast: Number,
//   dinner: Number
// });

// module.exports = mongoose.model('Meal', mealSchema);
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Meal', mealSchema);