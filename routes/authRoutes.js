const express = require('express');
const routers = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/models');
require('dotenv').config();

// Register
routers.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User successfully registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
routers.post('/login', async (req, res) => {
  const { email, password } = req.body;
console.log(process.env.JWT_SECRET);
console.log("2");
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token,message:"user successfully logged" });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = routers;
