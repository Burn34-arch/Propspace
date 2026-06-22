const express = require('express');
const { body } = require('express-validator');
const protect = require('../middleware/auth.middleware');
const { getProfile, updateProfile, changePassword } = require('../controllers/user.controller');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put(
  '/change-password',
  protect,
  [
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  changePassword
);

module.exports = router;
