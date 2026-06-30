// import axios from 'axios';
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function ProductCard({ product }) {
//     const navigate = useNavigate();
  
//     // Is function ko apne main page component ke andar rakhna jahan products list ho rahe hain:
// const handleWishlistToggle = async (productId) => {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   if (!userInfo) {
//     alert("🔒 Please login first to save items!");
//     return;
//   }

//   try {
//     const res = await axios.post('http://localhost:5000/api/users/wishlist/toggle', 
//       { productId }, 
//       { headers: { Authorization: `Bearer ${userInfo.token}` } }
//     );
    
//     alert(res.data.msg);
//     // Optional: Agar tum state manage kar rahe ho toh yahan local array bhi update kar sakte ho icon fill karne ke liye
//   } catch (err) {
//     console.error(err);
//     alert("Wishlist modify karne mein error aaya.");
//   }
// };


//   return (
//     <div className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

//       {/* Product Image */}
//       {/* <div className="h-56 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
//         <div className="w-32 h-32 rounded-2xl bg-white/70 backdrop-blur-sm flex items-center justify-center text-6xl shadow-lg">
//           📦
//         </div>
//       </div> */}

//       {/* 🌟 1. Phone Cover Image Section */}
//     <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
//       {/* ❤️ Wishlist Floating Button */}
//   <button 
//     onClick={() => handleWishlistToggle(product._id)}
//     className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:scale-110 transition duration-300"
//     title="Save to Wishlist"
//   >
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 hover:fill-red-500">
//       <path strokeLinecap="round" strokeLinejoin="round" d="String.raw`M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z`" />
//     </svg>
//   </button>

//       {product.images && product.images.length > 0 ? (
//         <img 
//           src={product.images[0]} 
//           alt={product.name} 
//           className="w-full h-full object-contain hover:scale-105 transition duration-300"
//         />
//       ) : (
//         <span className="text-gray-400 text-sm">No Image Available</span>
//       )}
//     </div>

//     {/* Badge */}
//     <div className="flex justify-between items-center mb-2">
//       <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
//         {product.category || 'Phone Cover'}
//       </span>
//       <span className="text-xs text-gray-500 font-medium">{product.materialType}</span>
//     </div>

//     {/* Title */}
//     <h3 className="text-lg font-bold text-gray-800 capitalize">{product.name}</h3>
    
//     {/* Supported Models Info */}
//     <p className="text-xs text-gray-400 my-1 truncate">
//       Fits: {product.supportedModels?.join(', ') || 'All Models'}
//     </p>


//     {/* 🌟 2. Price & MRP Discount Section */}
//     <div className="flex items-baseline gap-2 my-2">
//       <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
//       {product.mrp && product.mrp > product.price && (
//         <>
//           <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
//           <span className="text-xs font-bold text-green-600">
//             ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF)
//           </span>
//         </>
//       )}
//     </div>

//     {/* View Details Button */}
//     <button 
//       onClick={() => navigate(`/product/${product._id}`)} 
//       className="w-full mt-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium py-2 rounded-xl text-sm"
//     >
//       View Details & 3D Model →
//     </button>

//       {/* <div className="p-5">

//         Top Row
//         <div className="flex items-center justify-between mb-4">
//           <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
//             🛒 {product.category}
//           </span>

//           <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full">
//             Active
//           </span>
//         </div>

//         Product Name
//         <h3 className="text-3xl font-bold text-gray-800 mb-4 line-clamp-1">
//           {product.name}
//         </h3>

//         Price
//         <div className="mb-6">
//           <p className="text-gray-500 text-sm mb-1">
//             Price
//           </p>

//           <p className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
//             ₹{product.price.toLocaleString('en-IN')}
//           </p>
//         </div>

//         Button
//         <Link
//           to={`/product/${product._id}`}
//           className="block text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
//         >
//           View Details & 3D Model →
//         </Link>

//       </div> */}
//     </div>
//   );
// }





















import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, isInitiallyLiked, userWishlist, setUserWishlist, isOwner, onEdit, onDelete }) {
  const navigate = useNavigate();

  // 🌟 Local state taaki icon turant change ho sake click par
  const [isLiked, setIsLiked] = useState(isInitiallyLiked);

  // Jab parent component se wishlist update ho kar aaye, toh local state sync karein
  useEffect(() => {
    setIsLiked(isInitiallyLiked);
  }, [isInitiallyLiked]);

  const handleWishlistToggle = async (productId) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      alert("🔒 Please login first to save items!");
      return;
    }

    try {
      setIsLiked(!isLiked);
      const res = await axios.post('http://localhost:5000/api/auth/wishlist/toggle', 
        { productId }, 
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );

      // Parent state ko bhi update karo taaki pure app me data sync rahe
      if (res.data.action === "added") {
        setUserWishlist([...userWishlist, productId]);
        setIsLiked(true);
      } else {
        setUserWishlist(userWishlist.filter(id => id !== productId));
        setIsLiked(false);
      }
      
      alert(res.data.msg);
    } catch (err) {
      console.error(err);
      alert("Unable to update your wishlist. Please try again.");
    }
  };


  // Is function ko component ke andar handleWishlistToggle ke neeche rakhna:
const handleAddToCart = async (productId) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    alert("🔒 Please login first to add items to cart!");
    return;
  }

  try {
    // By default quantity 1 bhejenge card se
    await axios.post('http://localhost:5000/api/cart/add', 
      { productId, quantity: 1 }, 
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );
    
    alert("🛒 Added to Cart successfully!");
    
    // 🌟 Tip: Agar tumne pooray app me Context API ya Redux lagaya hai, 
    // toh yahan se navbar ka count turant update ho jayega. 
    // Agar nahi lagaya, toh abhi temporary page reload karwa sakte ho count sync ke liye:
    window.location.reload(); 
  } catch (err) {
    console.error(err);
    alert("Unable to add the item to your cart. Please try again.");
  }
};


const isLoggedIn = !!localStorage.getItem('userInfo');

  return (
    // Yahan relative class lagayi hai taaki heart icon iske upar float kare
    <div className="relative group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-4">
      
      {/* ❤️ Wishlist Floating Button - Pure Layout Top Layer */}
      {/* <button 
        onClick={() => handleWishlistToggle(product._id)}
        className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:scale-110 transition duration-300 border border-gray-100"
        title="Save to Wishlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 hover:fill-red-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button> */}

      {/* new */}
      <button 
        onClick={() => handleWishlistToggle(product._id)}
        // 🌟 Dil ka color conditionally change ho raha hai yahan text-red-500 ya text-gray-400 se
        className={`absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md transition duration-300 border border-gray-100 ${
          isLiked ? 'text-red-500 scale-110' : 'text-gray-400 hover:text-red-500 hover:scale-110'
        }`}
        title={isLiked ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          // 🌟 Agar liked h toh fill="currentColor" (red fill hoga), nahi toh fill="none"
          fill={isLiked ? "currentColor" : "none"} 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </button>

      {/* 🌟 1. Phone Cover Image Section */}
      <div className="w-full h-48 bg-gray-50 rounded-2xl overflow-hidden mb-4 flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-contain hover:scale-105 transition duration-300"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image Available</span>
        )}
      </div>

      {/* Badge */}
      <div className="flex justify-between items-center mb-2">
        <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {product.category || 'Phone Cover'}
        </span>
        <span className="text-xs text-gray-500 font-medium">{product.materialType}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 capitalize">{product.name}</h3>
      
      {/* Supported Models Info */}
      <p className="text-xs text-gray-400 my-1 truncate">
        Fits: {product.supportedModels?.join(', ') || 'All Models'}
      </p>

      {/* 🌟 2. Price & MRP Discount Section */}
      <div className="flex items-baseline gap-2 my-2">
        <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
        {product.mrp && product.mrp > product.price && (
          <>
            <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
            <span className="text-xs font-bold text-green-600">
              ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF)
            </span>
          </>
        )}
      </div>

      {/* View Details Button */}
      {/* <button 
        onClick={() => navigate(`/product/${product._id}`)} 
        className="w-full mt-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium py-2 rounded-xl text-sm"
      >
        View Details & 3D Model →
      </button> */}

      <div className="flex gap-2 mt-2">
  <button 
    onClick={() => navigate(`/product/${product._id}`)} 
    className="flex-1 bg-gradient-to-r from-[#7a128c] via-[#e22289] to-[#f4563a] text-white font-medium py-2 rounded-xl text-xs transition hover:opacity-90"
  >
    View Details →
  </button>


  {/* 🌟 Neeche card ke end me ye buttons add karein agar user owner hai */}
      {isLoggedIn && isOwner && (
        <>
          <button 
            onClick={onEdit} 
            className="flex-1 bg-blue-500 text-white py-1.5 rounded-xl text-xs font-bold hover:bg-blue-600 transition"
          >
            ✏️ Edit Product
          </button>
          <button 
            onClick={onDelete} 
            className="flex-1 bg-red-500 text-white py-1.5 rounded-xl text-xs font-bold hover:bg-red-600 transition"
          >
            🗑️ Delete
          </button>
        </>
      )}
  
  {/* <button 
    onClick={() => handleAddToCart(product._id)} 
    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-xl text-xs transition flex items-center justify-center gap-1"
  >
    <span>🛒</span> Add to Cart
  </button> */}
</div>
    </div>
  );
}