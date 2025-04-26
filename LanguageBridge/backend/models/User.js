const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // later hashed
  role: { type: String, enum: ['customer', 'driver'], default: 'customer' },
  driverId: String // unique driver id
});

module.exports = mongoose.model('User', userSchema);
