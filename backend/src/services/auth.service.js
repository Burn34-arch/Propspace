const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/user.repository');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const register = async ({ username, email, password }) => {
  const emailExists = await userRepo.findByEmail(email);
  if (emailExists) throw { status: 400, message: 'Email already in use' };

  const usernameExists = await userRepo.findByUsername(username);
  if (usernameExists) throw { status: 400, message: 'Username already taken' };

  const user = await userRepo.create({ username, email, password });
  const token = generateToken(user._id);
  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw { status: 401, message: 'Invalid email or password' };

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw { status: 401, message: 'Invalid email or password' };

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { register, login };
