// const mongoose = require('mongoose');

// const guestSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true }
// });

// const bookingSchema = new mongoose.Schema({
//   roomCategory: { type: String, required: true },
//   guests: { type: Number, required: true },
//   checkin: { type: Date, required: true },
//   checkout: { type: Date, required: true },
//   breakfast: { type: Number, default: 0 },
//   dinner: { type: Number, default: 0 },
//   guestDetails: [guestSchema],
//   totalPrice: { type: Number, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  guests: Number,
  checkin: Date,
  checkout: Date,
  roomCategory: String,
  breakfast: Number,
  dinner: Number,
  guestDetails: [{ name: String, age: Number }],
  totalPrice: Number,
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
