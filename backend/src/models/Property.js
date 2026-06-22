const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    propertyType: {
      type: String,
      required: true,
      enum: ['Apartment', 'House', 'Studio'],
    },
    listingType: {
      type: String,
      required: true,
      enum: ['rent', 'sale'],
      default: 'sale',
    },
    images: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
