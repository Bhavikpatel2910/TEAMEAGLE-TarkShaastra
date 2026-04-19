<<<<<<< HEAD
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

function getJwtSecret() {
  return process.env.JWT_SECRET || 'stampede-window-predictor-dev-secret';
}

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

function buildDemoUser(email, role = 'admin') {
  const safeEmail = String(email || 'demo@local').trim().toLowerCase();
  const safeRole = ['police', 'transport', 'admin'].includes(role) ? role : 'admin';

  return {
    id: 'demo-user',
    name: safeEmail.split('@')[0] || 'demo',
    email: safeEmail,
    role: safeRole,
  };
}

=======
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔹 Register User
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

<<<<<<< HEAD
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    if (!isDbConnected()) {
      return res.status(201).json({
        msg: 'User registered successfully',
        user: buildDemoUser(email, role || 'admin'),
      });
    }

=======
    // check if user exists
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

<<<<<<< HEAD
=======
    // hash password
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
<<<<<<< HEAD
      role,
    });

    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
=======
      role
    });

    res.json({ msg: 'User registered successfully', user });

>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

<<<<<<< HEAD
=======
// 🔹 Login User
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    if (!isDbConnected()) {
      const user = buildDemoUser(email, 'admin');
      const token = jwt.sign(user, getJwtSecret(), { expiresIn: '1d' });
      return res.json({
        msg: 'Login successful',
        token,
        user,
      });
    }

=======
    // check user
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

<<<<<<< HEAD
=======
    // compare password
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

<<<<<<< HEAD
    const token = jwt.sign(
      { id: String(user._id), name: user.name, email: user.email, role: user.role },
      getJwtSecret(),
=======
    // generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
      { expiresIn: '1d' }
    );

    res.json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
<<<<<<< HEAD
        email: user.email,
        role: user.role,
      },
    });
=======
        role: user.role
      }
    });

>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

<<<<<<< HEAD
exports.getMe = async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      });
    }

=======
// 🔹 Get Current User
exports.getMe = async (req, res) => {
  try {
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
