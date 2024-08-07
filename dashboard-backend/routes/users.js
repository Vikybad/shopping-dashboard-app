const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register user
router.post('/register', async (req, res) => {
  try {
    console.log('HIT on register api', req.body);
    const { username, email, password, mobileNumber, image } = req.body;
    if (!(username || email || mobileNumber)) {
      return res.send({ msg: `Please enter username or email or mobileNumber` })
    }
    if (!password) {
      return res.send({ msg: `Please enter the password` })
    }
    let user = await User.findOne({ $or: [{ email }, { username }, { mobileNumber }] });
    if (user) return res.json({ msg: 'User already exists' });

    user = new User({ username, email, password, mobileNumber, image });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    console.log('HIT on login api', req.body);
    const { login, password } = req.body;
    if (!(login)) {
      return res.send({ msg: `Please enter username/email/mobileNumber` });
    }
    if (!password) {
      return res.send({ msg: `Please enter the password to login` });
    }
    let user = await User.findOne({
      $or: [{ email: login }, { username: login }, { mobileNumber: login }]
    });
    console.log('user:', user);
    if (!user) return res.json({ msg: 'NO USER FOUND' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user data
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;