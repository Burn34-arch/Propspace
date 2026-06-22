const propertyRepo = require('../repositories/property.repository');

const buildFilter = ({ city, minPrice, maxPrice, propertyType, listingType }) => {
  const filter = {};
  if (city) filter.city = { $regex: city, $options: 'i' };
  if (propertyType) filter.propertyType = propertyType;
  if (listingType) filter.listingType = listingType;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  return filter;
};

const getAllProperties = (query) => {
  const filter = buildFilter(query);
  return propertyRepo.findAll(filter);
};

const getPropertyById = async (id) => {
  const property = await propertyRepo.findById(id);
  if (!property) throw { status: 404, message: 'Property not found' };
  return property;
};

const getMyProperties = (userId) => propertyRepo.findByAuthor(userId);

const createProperty = (data, userId) =>
  propertyRepo.create({ ...data, author: userId });

const updateProperty = async (id, data, userId) => {
  const property = await propertyRepo.findById(id);
  if (!property) throw { status: 404, message: 'Property not found' };
  if (property.author._id.toString() !== userId.toString())
    throw { status: 403, message: 'Not authorized to update this property' };
  return propertyRepo.updateById(id, data);
};

const deleteProperty = async (id, userId) => {
  const property = await propertyRepo.findById(id);
  if (!property) throw { status: 404, message: 'Property not found' };
  if (property.author._id.toString() !== userId.toString())
    throw { status: 403, message: 'Not authorized to delete this property' };
  return propertyRepo.deleteById(id);
};

module.exports = { getAllProperties, getPropertyById, getMyProperties, createProperty, updateProperty, deleteProperty };
