const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// ✅ Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/bookings', bookingRoutes); // booking-related routes
app.use('/api/users', userRoutes);       // user login/register routes

// ✅ Optional: 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
