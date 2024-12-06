require ('dotenv').config ();
const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');

// Import routes
const userRoutes = require ('./routes/userRoutes');
const bookRoutes = require ('./routes/bookRoutes');
const transactionRoutes = require ('./routes/transactionRoutes');

const app = express ();
app.use (bodyParser.json ());

// Connect to MongoDB Atlas
mongoose
  .connect (process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then (() => console.log ('Connected to MongoDB Atlas'))
  .catch (err => console.error ('Failed to connect to MongoDB Atlas', err));

// Routes
app.use ('/api/users', userRoutes);
app.use ('/api/books', bookRoutes);
app.use ('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen (PORT, () => console.log (`Server running on port ${PORT}`));
