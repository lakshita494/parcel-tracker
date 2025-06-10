// server.js

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Dummy tracking data
const trackingDB = {
  '123': {
    status: 'Delivered',
    location: 'Mumbai Hub',
    eta: '9 June 2025'
  },
  '456': {
    status: 'In Transit',
    location: 'Bangalore Facility',
    eta: '12 June 2025'
  },
  '789': {
    status: 'Out for Delivery',
    location: 'Jaipur Center',
    eta: 'Today'
  }
};

// API endpoint to get tracking info
app.get('/track/:id', (req, res) => {
  const id = req.params.id;
  if (trackingDB[id]) {
    res.json({ id, ...trackingDB[id] });
  } else {
    res.status(404).json({ error: 'Tracking ID not found' });
  }
});

// Dummy register endpoint
app.post('/register', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  res.json({ message: `User ${name} registered successfully with email ${email}` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
