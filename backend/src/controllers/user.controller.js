const { validationResult } = require('express-validator');
const userService = require('../services/user.service');

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user._id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const user = await userService.updateProfile(req.user._id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const result = await userService.changePassword(req.user._id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile, changePassword };
