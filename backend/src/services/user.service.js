const bcrypt = require('bcryptjs');
const userRepo = require('../repositories/user.repository');

const getProfile = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) throw { status: 404, message: 'User not found' };
  return user;
};

const updateProfile = async (userId, { name, phone, avatar }) => {
  const user = await userRepo.updateById(userId, { name, phone, avatar });
  if (!user) throw { status: 404, message: 'User not found' };
  return user;
};

const changePassword = async (userId, { oldPassword, newPassword }) => {
  const user = await userRepo.findById(userId);
  if (!user) throw { status: 404, message: 'User not found' };

  const isMatch = await user.matchPassword(oldPassword);
  if (!isMatch) throw { status: 400, message: 'Old password is incorrect' };

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
  return { message: 'Password updated successfully' };
};

module.exports = { getProfile, updateProfile, changePassword };
