import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// Global request interceptor — attach Bearer token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('propspace_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response interceptor — handle token expiry
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('propspace_token');
      localStorage.removeItem('propspace_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
