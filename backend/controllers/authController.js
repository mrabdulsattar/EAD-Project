const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

const authController = {
  getProfile: async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        message: 'Profile loaded',
        data: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
          status: req.user.status,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const allowedFields = ['name', 'email', 'profilePicture'];
      const updates = {};

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) updates[field] = req.body[field];
      });

      const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password');
      res.status(200).json({
        success: true,
        message: 'Profile updated',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: 'user',
      });

      const token = generateToken(user);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      if (user.status === 'blocked') {
        return res.status(403).json({ success: false, message: 'Your account has been blocked. Contact support.' });
      }

      const isMatch = await user.comparePassword(req.body.password);

      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = generateToken(user);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
