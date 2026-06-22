const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { user, token } = await authService.register(req.body);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { user, token } = await authService.login(req.body);
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
