import axios from 'axios';

const API = axios.create({
  baseURL: 'https://casex-backend-h0xv.onrender.com/api/products'
});

export const getProducts = (search = '') => API.get(`?search=${search}`);
export const getProductById = (id) => API.get(`/${id}`);
export const createProduct = (productData) => API.post('/', productData);
// Naya Order API call function (Make sure URL http hi ho local ke liye)
export const createOrder = (orderData) => axios.post('https://casex-backend-h0xv.onrender.com/api/orders', orderData);
export const getAllOrders = () => axios.get('https://casex-backend-h0xv.onrender.com/api/orders');
export const updateOrderStatus = (id, statusData) => axios.put(`https://casex-backend-h0xv.onrender.com/api/orders/${id}`, statusData);


// Payout APIs
export const requestPayoutAPI = (payoutData, token) => 
  axios.post('https://casex-backend-h0xv.onrender.com/api/payouts/request', payoutData, { headers: { Authorization: `Bearer ${token}` } });

export const getMyPayoutsAPI = (token) => 
  axios.get('https://casex-backend-h0xv.onrender.com/api/payouts/my-requests', { headers: { Authorization: `Bearer ${token}` } });

export const getAdminPayoutsAPI = (token) => 
  axios.get('https://casex-backend-h0xv.onrender.com/api/payouts/admin/all', { headers: { Authorization: `Bearer ${token}` } });

export const updatePayoutStatusAPI = (id, statusData, token) => 
  axios.put(`https://casex-backend-h0xv.onrender.com/api/payouts/admin/update/${id}`, statusData, { headers: { Authorization: `Bearer ${token}` } });



// Product update karne ke liye
export const updateProductAPI = (id, productData, token) => 
  API.put(`/products/update/${id}`, productData, { headers: { Authorization: `Bearer ${token}` } });

// Product delete karne ke liye
export const deleteProductAPI = (id, token) => 
  API.delete(`/products/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });