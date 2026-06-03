import axios from 'axios';

const API = axios.create({
  baseURL: 'https://quleep-3d-portal.onrender.com/api/products'
});

export const getProducts = (search = '') => API.get(`?search=${search}`);
export const getProductById = (id) => API.get(`/${id}`);
export const createProduct = (productData) => API.post('/', productData);