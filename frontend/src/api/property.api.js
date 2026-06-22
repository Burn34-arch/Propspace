import api from './axiosInstance';

export const fetchProperties = (params) => api.get('/properties', { params });
export const fetchPropertyById = (id) => api.get(`/properties/${id}`);
export const fetchMyListings = () => api.get('/properties/my-listings');
export const createProperty = (data) => api.post('/properties', data);
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);
