const { validationResult } = require('express-validator');
const propertyService = require('../services/property.service');

const getAll = async (req, res, next) => {
  try {
    const properties = await propertyService.getAllProperties(req.query);
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    res.json(property);
  } catch (err) {
    next(err);
  }
};

const getMyListings = async (req, res, next) => {
  try {
    const properties = await propertyService.getMyProperties(req.user._id);
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const property = await propertyService.createProperty(req.body, req.user._id);
    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const property = await propertyService.updateProperty(req.params.id, req.body, req.user._id);
    res.json(property);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await propertyService.deleteProperty(req.params.id, req.user._id);
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, getMyListings, create, update, remove };
