const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookedBy: String,
  guests: Number,
  checkin: Date,
  checkout: Date,
  roomCategory: String,
  paymentMethod: String,
  meals: Object, // ✅ new field
  guestDetails: [{ name: String, age: Number }],
  totalPrice: Number,
});

module.exports = mongoose.model('Booking', bookingSchema);
