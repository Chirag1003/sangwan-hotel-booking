

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
