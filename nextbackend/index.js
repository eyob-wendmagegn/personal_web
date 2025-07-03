require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const contactRoutes = require('./routes/contact');
const uploadRoutes = require('./routes/upload');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors); // Apply CORS middleware globally to handle all routes, including preflight OPTIONS requests

// Routes
app.use('/api', authRoutes);
app.use('/api', contentRoutes);
app.use('/api', contactRoutes);
app.use('/api', uploadRoutes);

// Serve Static Files
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB with database:', process.env.MONGODB_URI))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});