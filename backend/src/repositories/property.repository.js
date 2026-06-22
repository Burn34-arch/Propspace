const Property = require('../models/Property');

const findAll = (filter = {}) =>
  Property.find(filter).populate('author', 'username name avatar').sort({ createdAt: -1 });

const findById = (id) =>
  Property.findById(id).populate('author', 'username name avatar');

const findByAuthor = (authorId) =>
  Property.find({ author: authorId }).populate('author', 'username name avatar').sort({ createdAt: -1 });

const create = (data) => Property.create(data);

const updateById = (id, data) =>
  Property.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('author', 'username name avatar');

const deleteById = (id) => Property.findByIdAndDelete(id);

module.exports = { findAll, findById, findByAuthor, create, updateById, deleteById };
