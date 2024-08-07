require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));