// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// export default function Wishlist() {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (!userInfo) return setLoading(false);
//       try {
//         const res = await axios.get('http://localhost:5000/api/auth/wishlist', {
//           headers: { Authorization: `Bearer ${userInfo.token}` }
//         });
//         setWishlist(res.data);
//       } catch (err) {
//         console.error("Error fetching wishlist", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchWishlist();
//   }, []);

//   const handleRemove = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/auth/wishlist/${productId}`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       setWishlist(wishlist.filter(item => item._id !== productId));
//       alert("Removed from Wishlist 💔");
//     } catch (err) {
//       alert("Failed to remove item.");
//     }
//   };

//   if (!userInfo) {
//     return <div className="text-center p-12 font-bold text-red-500">🔒 Please login to view your wishlist!</div>;
//   }

//   if (loading) {
//     return <div className="text-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto"></div></div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-black text-gray-800 mb-6">❤️ My Saved Wishlist</h2>
      
//       {wishlist.length === 0 ? (
//         <div className="text-center py-16 bg-white border border-dashed rounded-3xl p-8">
//           <p className="text-gray-400 font-medium mb-4">Your wishlist is lonely. Add some beautiful 3D cases!</p>
//           <Link to="/" className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-purple-700">Explore Products</Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {wishlist.map((product) => (
//             <div key={product._id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
//               <div>
//                 <img src={product.images?.[0]} alt={product.name} className="w-full h-40 object-contain mb-3 bg-slate-50 rounded-2xl" />
//                 <h4 className="font-bold text-gray-800 line-clamp-1">{product.name}</h4>
//                 <p className="text-purple-600 font-black mt-1">₹{product.price}</p>
//               </div>
//               <div className="grid grid-cols-1 gap-2 mt-4">
//                 <Link to={`/product/${product._id}`} className="text-center bg-purple-50 text-purple-700 font-bold text-xs py-2 rounded-xl hover:bg-purple-100 transition">View Details</Link>
//                 <button onClick={() => handleRemove(product._id)} className="text-red-500 hover:text-red-700 font-bold text-xs py-1">Remove 🗑️</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




































import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userInfo) return setLoading(false);
      try {
        const res = await axios.get('https://casex-backend-h0xv.onrender.com/api/auth/wishlist', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        setWishlist(res.data);
      } catch (err) {
        console.error("Error fetching wishlist", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`https://casex-backend-h0xv.onrender.com/api/auth/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setWishlist(wishlist.filter(item => item._id !== productId));
      alert("Removed from Wishlist 💔");
    } catch (err) {
      alert("Failed to remove item.");
    }
  };

  // Auth Fallback UI
  if (!userInfo) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="bg-white border border-red-100 rounded-[32px] p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-inner">🔒</div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Authorization Failed</h3>
          <p className="text-gray-500 text-sm font-medium mt-2 mb-6">Please log in to your account to view or sync your curated personal wishlist.</p>
          <Link to="/login" className="block w-full py-3 bg-[#0e0826] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-purple-900 transition duration-300">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Premium Skeleton Spinner UI
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-purple-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#CF29DB] animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#E9DEF3] pb-16 selection:bg-purple-500 selection:text-white">
      <div className="max-w-[97rem] mx-auto px-4 py-10">
        
        {/* Wishlist Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-purple-950/30 pb-6 mb-8 gap-4">
          <div>
            <span className="px-3 py-1 bg-[#0e0826] text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-purple-500/20">
              User Dashboard
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0e0826] tracking-tight mt-5 flex items-center gap-3">
              ❤️ My Saved Wishlist
            </h2>
          </div>
          <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold text-[#0e0826] border border-white/10">
            Total Items: <span className="text-[#CF29DB] font-black">{wishlist.length}</span>
          </span>
        </div>
        
        {/* Empty State UI */}
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white border border-purple-950/10 rounded-[32px] p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl"></div>
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition duration-300">💔</div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Your wishlist is lonely</h3>
            <p className="text-gray-400 font-medium text-sm mt-2 mb-8 max-w-sm mx-auto leading-relaxed">
              Add some premium design smartphone cases and unlock state-of-the-art interactive 3D renderings!
            </p>
            <Link to="/" className="inline-block px-8 py-3.5 bg-gradient-to-r from-[#CF29DB] to-[#F8429D] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_4px_20px_rgba(207,41,219,0.3)] hover:opacity-90 transition-all duration-300 transform active:scale-95">
              Explore Products
            </Link>
          </div>
        ) : (
          
          /* Main Grid: Fully responsive card system (1 col mobile, 2 sm, 3 md, 4 lg) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div 
                key={product._id} 
                className="bg-white rounded-[24px] p-4 shadow-xl border border-purple-950/5 hover:border-purple-500/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Product Detail Wrappers */}
                <div>
                  {/* Image Container with Hover Scale */}
                  <div className="w-full h-48 bg-slate-50 rounded-2xl p-4 mb-4 flex items-center justify-center relative overflow-hidden select-none">
                    <img 
                      src={product.images?.[0]} 
                      alt={product.name} 
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                  </div>
                  
                  {/* Name and Price */}
                  <div className="px-1">
                    <h4 className="font-black text-slate-800 text-base tracking-tight line-clamp-1 group-hover:text-[#CF29DB] transition duration-200">
                      {product.name}
                    </h4>
                    <p className="text-[#CF29DB] font-black text-lg mt-1 tracking-tight">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
                
                {/* Responsive Grid Actions CTA buttons */}
                <div className="flex flex-col gap-2 mt-5">
                  <Link 
                    to={`/product/${product._id}`} 
                    className="text-center bg-[#0e0826] text-white font-black text-xs tracking-widest uppercase py-3 rounded-xl hover:bg-purple-900 transition-all duration-300 shadow-md"
                  >
                    View Details
                  </Link>
                  
                  <button 
                    onClick={() => handleRemove(product._id)} 
                    className="w-full text-center text-red-500/70 hover:text-red-600 font-bold text-xs py-2 border border-dashed border-transparent hover:border-red-200 rounded-xl transition duration-200 flex items-center justify-center gap-1.5"
                  >
                    Remove Asset 🗑️
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}