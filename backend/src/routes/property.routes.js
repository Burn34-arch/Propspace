const express = require('express');
const { body } = require('express-validator');
const protect = require('../middleware/auth.middleware');
const {
  getAll, getById, getMyListings, create, update, remove,
} = require('../controllers/property.controller');

const router = express.Router();

router.get('/', getAll);
router.get('/my-listings', protect, getMyListings);
router.get('/:id', getById);

router.post(
  '/',
  protect,
  [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('description').notEmpty().trim().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('city').notEmpty().trim().withMessage('City is required'),
    body('country').notEmpty().trim().withMessage('Country is required'),
    body('propertyType').isIn(['Apartment', 'House', 'Studio']).withMessage('Invalid property type'),
    body('listingType').isIn(['rent', 'sale']).withMessage('Invalid listing type'),
  ],
  create
);

router.put('/:id', protect, update);
router.delete('/:id', protect, remove);

module.exports = router;
