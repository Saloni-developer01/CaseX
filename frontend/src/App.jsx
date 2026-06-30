import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import ProductListing from './pages/ProductListing';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import AdminOrders from './pages/AdminOrders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Dashboard from './pages/Dashboard';
import SubscriptionPayment from './pages/SubscriptionPayment';
import Cart from './pages/Cart';
import VendorDashboard from './pages/VendorDashboard';
import AdminPayouts from './pages/AdminPayouts';
import AdminVendors from './pages/AdminVendors';
import AdminUsersManager from './pages/AdminUsersManager';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50/50 antialiased">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscription-payment" element={<SubscriptionPayment />} />
          <Route path="/vendordashboard" element={<VendorDashboard />} />
          <Route path="/admin/payouts" element={<AdminPayouts />} />
          {/* <Route path="/adminvendor" element={<AdminVendors />} /> */}
          <Route path="/adminvendor" element={<AdminUsersManager />} />
        </Routes>
      </Router>
    </div>
  );
}