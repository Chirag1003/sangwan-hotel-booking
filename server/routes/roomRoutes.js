const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

router.get('/', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

router.post('/', async (req, res) => {
  const newRoom = new Room(req.body);
  await newRoom.save();
  res.status(201).json(newRoom);
});
router.put('/:id', async (req, res) => {
    try {
      const { title, price, image } = req.body;
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { title, price, image },
        { new: true }
      );
      if (!updatedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
router.delete('/:id', async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: 'Room deleted' });
});

module.exports = router;
