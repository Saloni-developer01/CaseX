import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Diamond, DiamondIcon, Gem, Shield, ShieldCheck } from 'lucide-react';
import axios from 'axios';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [userWishlist, setUserWishlist] = useState([]); // 🌟 Wishlist state banayi
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [selectedEditProduct, setSelectedEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts(search);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // 2. 🌟 Naya useEffect: User ki current wishlist fetch karne ke liye
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userInfo || !userInfo.token) return;
      try {
        const res = await axios.get('http://localhost:5000/api/auth/wishlist', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        // Sirf product IDs ka array nikal kar state me save karenge
        const ids = res.data.map(item => item._id);
        setUserWishlist(ids);
      } catch (err) {
        console.error("Wishlist fetch karne me dikkat:", err);
      }
    };
    fetchWishlist();
  }, []);


  // Delete handler function (ProductList me hi handle ho jayega)
const handleDeleteClick = async (productId) => {
  if (window.confirm("🗑️ This product will be permanently deleted and cannot be recovered.")) {
    try {
      
      // Apni api call karein
      const token = userInfo?.token;
      await axios.delete(`http://localhost:5000/api/products/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("🎉 Product deleted successfully!");
      window.location.reload(); // State update ya page refresh
    } catch (err) {
      console.error(err);
      alert("We couldn't delete the product at the moment. Please try again later.");
    }
  }
};


  return (
    <div className="max-w-[88%] mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      

      {/* Hero Banner */}
      {/* <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 p-8 md:p-12 shadow-xl mb-10">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-300/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Product Inventory Hub
            </h1>

            <p className="text-white/80 mt-4 text-lg">
              Manage dynamic products and experience interactive real-time 3D models.
            </p>
          </div>

          <Link
            to="/add-product"
            className="bg-white text-orange-500 font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            + Register New Product
          </Link>

        </div>
      </div> */}


<div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#390E7B] via-[#390E7B] to-[#ff6a00] py-12 lg:py-6 px-4 sm:px-6 md:px-8 mb-10 shadow-2xl min-h-auto lg:min-h-[500px] flex items-center">
      
  {/* Background Subtle Geometric & Wave Effects */}
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40 z-0">
    <div className="absolute top-10 left-[35%] w-32 h-32 rounded-full bg-[#6306a1] opacity-200"></div>
    {/* Decorative dots pattern simulation */}
    <div className="absolute top-3 right-4 grid grid-cols-3 gap-4 opacity-80">
      {[...Array(16)].map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
      ))}
    </div>
    {/* Abstract background waves */}
    <svg className="absolute bottom-0 left-0 w-full min-w-[1024px] lg:w-full" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,128L120,138.7C240,149,480,171,720,165.3C960,160,1200,128,1320,112L1440,96L1440,200L1320,200C1200,200,960,200,720,200C480,200,240,200,120,200L0,200Z" fill="url(#wave-grad)" opacity="0.15"/>
      <defs>
        <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#ff7b00" />
        </linearGradient>
      </defs>
    </svg>
  </div>

  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
    
    {/* Left Content */}
    <div className="w-full lg:max-w-[50%] text-center lg:text-left p-2 sm:p-6 lg:p-10">
      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#6015A7] backdrop-blur-md text-[#E9DEF3] text-xs font-bold tracking-wider mb-6 border border-[#6015A7]">
        ✨PREMIUM COLLECTION
      </span>

      {/* Heading with exact gradient style */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1] lg:leading-[0.95]">
        <span className="text-white block mb-2">Premium</span>
        <span className="bg-gradient-to-r from-[#CF29DB] via-[#F8429D] to-[#fc705d] bg-clip-text text-transparent block pb-2">
          Phone Covers
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-[#C9BFD8] mt-4 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
        Stylish protection for every phone.
        <br />
        Choose your style. Protect in style.
      </p>

      {/* Features Row */}
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 md:gap-x-8 gap-y-4 mt-6 text-[#C9BFD8] border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#571198] flex items-center justify-center shadow-inner shrink-0">
             <ion-icon name="shield-checkmark-outline" style={{ color: '#ffffff', fontSize: '24px' }}></ion-icon>
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">Premium Quality</span>
        </div>
        
        <div className="w-[1px] h-6 bg-[#71609A] hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#881687] flex items-center justify-center shadow-inner shrink-0">
            <ion-icon name="diamond-outline" style={{ color: '#ffffff', fontSize: '24px' }}></ion-icon>
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">Trendy Designs</span>
        </div>

        <div className="w-[1px] h-6 bg-[#71609A] hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#9E3B49] flex items-center justify-center shadow-inner shrink-0">
            <ion-icon name="shield-checkmark-outline" style={{ color: '#ffffff', fontSize: '24px' }}></ion-icon>
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">Ultimate Protection</span>
        </div>
      </div>

      {/* Decorative dots pattern simulation */}
      <div className="absolute top-0 right-1/2 grid grid-cols-4 gap-4 opacity-50 hidden lg:grid">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
        ))}
      </div>
    </div>

    {/* Right Container (Showcase) */}
    <div className="hidden lg:flex relative flex flex-col justify-end items-center min-h-[360px] sm:min-h-[420px] lg:min-h-[450px] w-full lg:w-[50%] mt-6 lg:mt-0 p-2 sm:p-8 overflow-visible">
      
      {/* Background Decorative Stars/Glow */}
      <div className="absolute top-1/4 left-[3px] w-2 h-2 bg-white rounded-full animate-ping opacity-70"></div>
      
      {/* Sparkles / Chamkte hue Stars Background  */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-12 left-10 animate-pulse text-white text-xl font-bold opacity-80">✨</div>
        <div className="absolute top-4 right-1/4 animate-ping text-white text-sm opacity-60" style={{ animationDuration: '3s' }}>✦</div>
        <div className="absolute bottom-1/3 left-4 text-white text-xs opacity-40">✦</div>
        <div className="absolute top-1/2 right-4 animate-pulse w-3 h-3 bg-white rotate-45 opacity-80"></div>
        <div className="absolute bottom-[30px] right-10 animate-pulse text-white text-lg opacity-75">✨</div>
      </div>
      
      {/* Master Scaling Wrapper for Mobile Screens */}
      <div className="relative flex flex-col items-center w-full transform scale-75 xs:scale-85 sm:scale-100 origin-bottom transition-transform duration-300">
        
        {/* --- Phones Showcase Container --- */}
        <div className="relative flex justify-center items-end gap-3 sm:gap-6 z-10 -mb-10 sm:-mb-14">
          
          {/* 1. Left Phone: Butterfly & Glitter */}
          <div className="relative w-32 h-64 sm:w-44 sm:h-88 bg-gradient-to-tr from-[#c046e6] to-[#CCA7D7] border-[3px] sm:border-[4px] border-[#c84cee] rounded-[1.8rem] sm:rounded-[2rem] shadow-2xl transform -rotate-22 translate-y-1 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden shadow-[inset_0_4px_12px_rgba(255,255,255,0.35),0_12px_24px_rgba(0,0,0,0.7)]">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px]"></div>
            {/* Camera Bump */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-9 h-11 sm:w-12 sm:h-14 bg-[#ede6f7] border-[1px] border-[#c84cee] rounded-lg sm:rounded-xl backdrop-blur-sm flex flex-wrap p-0.5 sm:p-1 gap-0.5 sm:gap-1">
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-gray-700 rounded-full"></div>
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-gray-700 rounded-full"></div>
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-gray-700 rounded-full"></div>
            </div>
            {/* Butterfly Shapes */}
            <div className="absolute top-14 sm:top-18 right-4 sm:right-6 text-pink-400 opacity-80 animate-pulse text-3xl sm:text-5xl">🦋</div>
            <div className="absolute bottom-12 sm:bottom-16 left-4 sm:left-6 text-pink-400 opacity-90 text-2xl sm:text-4xl transform scale-125">🦋</div>
            <div className="absolute top-28 sm:top-40 left-10 sm:left-14 text-pink-300 opacity-90 text-2xl sm:text-4xl">🦋</div>
          </div>

          {/* 2. Center Phone: 3D Cute Toy Theme */}
          <div className="relative w-36 h-72 sm:w-48 sm:h-96 bg-[#ffb7ca] border-[4px] sm:border-[5px] border-[#fa8daa] rounded-[2.2rem] sm:rounded-[2.5rem] z-20 transform rotate-14 translate-y-[10px] transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer shadow-[inset_0_4px_12px_rgba(255,255,255,0.35),0_12px_24px_rgba(0,0,0,0.7)]">
            {/* Camera Bump */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-11 h-16 sm:w-14 sm:h-21 bg-[#ede6f7] border border-white/50 rounded-xl sm:rounded-2xl backdrop-blur-md flex flex-wrap p-1 sm:p-1.5 gap-0.5 sm:gap-1">
              <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 bg-gray-800 rounded-full border border-gray-600"></div>
              <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 bg-gray-800 rounded-full border border-gray-600"></div>
              <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 bg-gray-800 rounded-full border border-gray-600"></div>
            </div>
            {/* Ribbon/Bow Top Right */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#ff8fa3] text-white text-lg sm:text-2xl px-1.5 sm:px-2 py-0.5 rounded-full shadow-lg font-bold">💝</div>
            {/* Teddy Bear Center-Left */}
            <div className="absolute top-28 sm:top-38 left-3 sm:left-4 flex flex-col items-center bg-[#ffcad4] p-1 sm:p-2 rounded-full shadow-md border border-white/40">
              <div className="text-3xl sm:text-5xl leading-none">🧸</div>
            </div>
            {/* Bunny Top-Right */}
            <div className="absolute top-16 sm:top-20 right-3 sm:right-4 bg-[#ffcad4] p-1 sm:p-1.5 rounded-lg sm:rounded-xl shadow-md border border-white/40 text-2xl sm:text-4xl">🐰</div>
            {/* Bear Face Bottom-Right */}
            <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-6 bg-[#ffcad4] w-6 h-6 sm:w-8 sm:h-8 rounded-full shadow-md flex items-center justify-center text-3xl sm:text-5xl">🐻</div>
            {/* Ribbon Bottom-Left */}
            <div className="absolute bottom-8 sm:bottom-10 left-4 sm:left-6 text-3xl sm:text-4xl filter drop-shadow-md">🎀</div>
          </div>

          {/* 3. Right Phone: Pink & White Fur Texture */}
          <div className="relative w-32 h-64 sm:w-44 sm:h-88 bg-gradient-to-b from-[#f38aaf] via-[#E7A1BA] to-[#eb3467] border-[3px] sm:border-[4px] border-[#f06394] rounded-[1.8rem] sm:rounded-[2rem] shadow-2xl transform rotate-30 translate-y-6 transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden shadow-[inset_0_4px_12px_rgba(255,255,255,0.35),0_12px_24px_rgba(0,0,0,0.7)] right-6 sm:right-9">
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#fff,#fff_2px,transparent_2px,transparent_10px)]"></div>
            {/* Camera Bump */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-9 h-11 sm:w-12 sm:h-14 bg-[#ede6f7] border-[1.5px] sm:border-[2px] border-[#E7A1BA] rounded-lg sm:rounded-xl backdrop-blur-sm flex flex-wrap p-0.5 sm:p-1 gap-0.5 sm:gap-1">
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-gray-700 rounded-full"></div>
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-gray-700 rounded-full"></div>
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-gray-700 rounded-full"></div>
            </div>
            {/* Pink Fuzzy Sweater Pattern Overlay */}
            <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-[#ffb3c1]/80 to-transparent flex flex-col items-center justify-center">
              <div className="bg-[#ff4d6d] p-1.5 sm:p-3 rounded-full shadow-inner border border-white/50 text-white animate-bounce text-xl sm:text-3xl">
                ❤️
              </div>
            </div>
          </div>

        </div>

        {/* --- Exact Image Style Single Layer 3D Stage --- */}
        <div className="relative flex flex-col items-center z-0 w-full select-none">
          <div className="relative flex flex-col items-center w-full max-w-[340px] sm:max-w-[580px] md:max-w-[680px]">
            {/* 1. TOP SURFACE (Lid) */}
            <div className="w-full h-16 sm:h-24 md:h-30 bg-gradient-to-r from-[#4015b8] via-[#9c22e2] to-[#f4563a] rounded-[50%] border-t-[1.5px] border-r-[1.5px] border-white shadow-[inset_0_4px_12px_rgba(255,255,255,0.35),0_12px_24px_rgba(0,0,0,0.7)] relative z-20"></div>

            <div className="w-full h-5 sm:h-7 md:h-9 bg-gradient-to-r from-[#4015b8] via-[#9c22e2] to-[#f4563a] sm:-mt-[12px] md:-mt-[30px] relative z-10 overflow-hidden "></div>
            <div className="w-full h-5 sm:h-7 md:h-9 bg-gradient-to-r from-[#4015b8] via-[#9c22e2] to-[#f4563a] sm:-mt-[12px] md:-mt-[35px] relative z-10 overflow-hidden "></div>
            
            {/* 2. VERTICAL 3D WALL */}
            <div className="w-full h-5 sm:h-7 md:h-9 bg-gradient-to-r from-[#4015b8] via-[#9c22e2] to-[#f4563a] rounded-b-[50%] -mt-[8px] sm:-mt-[12px] md:-mt-[10px] relative z-10 overflow-hidden border-b border-black/20"></div>
            
            {/* 3. NEON TUBE LIGHT RING */}
            <div className="absolute bottom-[1px] sm:bottom-[2px] w-[99.5%] h-6 sm:h-8 md:h-10 bg-transparent rounded-b-[50%] border-b-[5.5px] border-[#f8fc15] blur-[1.5px] z-30 pointer-events-none shadow-[0_5px_15px_rgba(255,31,90,0.8)] mt-[-20px]"></div>
            
            {/* 4. FLOATING GLOW & REFLECTION */}
            <div className="absolute -bottom-4 w-[96%] h-[30px] sm:h-12 bg-gradient-to-r from-[#4015b8] via-[#9c22e2] to-[#f4563a] rounded-[50%] blur-xs opacity-80 z-0 pointer-events-none"></div>
            <div className="absolute -bottom-4 w-[100%] h-10 sm:h-14 bg-gradient-to-r from-[#ff1f5a] to-[#ff7849] rounded-[50%] blur-2xl opacity-70 z-0 pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>

      {/* Search Bar */}
      <div className="mb-10">
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-orange-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products instantly by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-5 py-5 bg-white border border-gray-200 rounded-3xl shadow-md focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 text-gray-700 placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-20 text-center shadow-sm">
          <div className="text-6xl mb-4">📦</div>

          <h3 className="text-xl font-bold text-gray-700 mb-2">
            No Products Found
          </h3>

          <p className="text-gray-500">
            No inventory matched your search criteria.
          </p>
        </div>
      ) : (
        <>
          {/* Stats Header */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

            <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl mb-3">
                📦
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {products.length}
              </h3>
              <p className="text-gray-500 text-sm">
                Total Products
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-3">
                🏷️
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {
                  [...new Set(products.map(item => item.category))]
                    .length
                }
              </h3>
              <p className="text-gray-500 text-sm">
                Categories
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-3">
                ✅
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {products.length}
              </h3>
              <p className="text-gray-500 text-sm">
                Active Products
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-3">
                🎲
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {products.length}
              </h3>
              <p className="text-gray-500 text-sm">
                3D Models
              </p>
            </div>

          </div> */}

          {/* Product Cards */}

          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => {

              const isOwner = userInfo?._id === product.vendorId || userInfo?._id === product.vendor || userInfo?.role?.toLowerCase() === 'admin';
              return (
              <ProductCard
                key={product._id}
                product={product}
                // 🌟 Yeh do props zaroor pass karein
                isInitiallyLiked={userWishlist.includes(product._id)}
                userWishlist={userWishlist}
                setUserWishlist={setUserWishlist}
                // 🌟 Yeh naye props pass karein
          isOwner={isOwner}
          onDelete={() => handleDeleteClick(product._id)}
          onEdit={() => setSelectedEditProduct(product)}
              /> );
})}
          </div>

          {/* footer */}
          <div className="mt-14 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-orange-100">

            <div className="grid md:grid-cols-4 gap-8">

              <div>
                <div className="text-3xl mb-3">🎲</div>
                <h4 className="font-bold text-gray-800">
                  Interactive 3D Models
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  Explore products with real-time 3D experience.
                </p>
              </div>

              <div>
                <div className="text-3xl mb-3">🛡️</div>
                <h4 className="font-bold text-gray-800">
                  Secure & Reliable
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  Your product data stays protected.
                </p>
              </div>

              <div>
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-bold text-gray-800">
                  Real-time Updates
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  Instant inventory and product updates.
                </p>
              </div>

              <div>
                <div className="text-3xl mb-3">🎧</div>
                <h4 className="font-bold text-gray-800">
                  24/7 Support
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  Help whenever you need it.
                </p>
              </div>

            </div>
          </div>
        </>
      )}


      {/* 🌟 QUICK POP-UP EDIT MODAL */}
{selectedEditProduct && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-150">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-black text-gray-800">✏️ Edit Product Details</h3>
        <button 
          onClick={() => setSelectedEditProduct(null)} 
          className="text-gray-400 hover:text-gray-600 font-bold text-lg"
        >
          ✕
        </button>
      </div>

      <form onSubmit={async (e) => {
        e.preventDefault();
        try {
          const token = userInfo?.token;

          const { _id, __v, ...updateData } = selectedEditProduct;
          await axios.put(`http://localhost:5000/api/products/update/${_id}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
          
          // await axios.put(`http://localhost:5000/api/products/update/${selectedEditProduct._id}`, selectedEditProduct, {
          //   headers: { Authorization: `Bearer ${token}` }
          // });
          alert("🎉 Product updated successfully!");
          setSelectedEditProduct(null);
          window.location.reload();
        } catch (err) {
          console.error(err);
          alert("We couldn't complete the update at the moment. Please try again later.");
        }
      }} className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Product Name</label>
          <input 
            type="text" 
            value={selectedEditProduct.name || ''} 
            onChange={(e) => setSelectedEditProduct({...selectedEditProduct, name: e.target.value})}
            className="w-full border rounded-xl p-2.5 text-sm focus:outline-purple-500" 
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Price (₹)</label>
          <input 
            type="number" 
            value={selectedEditProduct.price || ''} 
            onChange={(e) => setSelectedEditProduct({...selectedEditProduct, price: e.target.value})}
            className="w-full border rounded-xl p-2.5 text-sm focus:outline-purple-500" 
            required 
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Description</label>
          <textarea 
            value={selectedEditProduct.description || ''} 
            onChange={(e) => setSelectedEditProduct({...selectedEditProduct, description: e.target.value})}
            className="w-full border rounded-xl p-2.5 text-sm focus:outline-purple-500 h-20 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            type="button" 
            onClick={() => setSelectedEditProduct(null)} 
            className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-xs font-bold"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}