// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Cart() {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!userInfo) return setLoading(false);
//       try {
//         const res = await axios.get('http://localhost:5000/api/cart', {
//           headers: { Authorization: `Bearer ${userInfo.token}` }
//         });
//         setCart(res.data);
//       } catch (err) {
//         console.error("Cart load karne me dikkat:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCart();
//   }, []);

//   const updateQuantityHandler = async (productId, currentQty, change) => {
//     const newQty = currentQty + change;
//     if (newQty < 1) return; // 1 se kam nahi ho sakti quantity

//     try {
//       const res = await axios.post('http://localhost:5000/api/cart/add', 
//         { productId, quantity: newQty },
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       setCart(res.data);
//     } catch (err) {
//       alert("Quantity update nahi ho payi");
//     }
//   };

//   const removeItemHandler = async (productId) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/cart/remove', 
//         { productId },
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       setCart(res.data);
//       alert("Removed from Cart 🛒");
//     } catch (err) {
//       alert("Item remove karne me dikkat aayi");
//     }
//   };

//   // Price calculation logic
//   const subtotal = cart?.items?.reduce((acc, item) => acc + (item.product?.price * item.quantity), 0) || 0;
//   const totalMRP = cart?.items?.reduce((acc, item) => acc + ((item.product?.mrp || item.product?.price) * item.quantity), 0) || 0;
//   const discount = totalMRP - subtotal;

//   if (!userInfo) {
//     return <div className="text-center p-12 font-bold text-red-500">🔒 Shopping Cart dekhne ke liye please login karein!</div>;
//   }

//   if (loading) {
//     return <div className="text-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto"></div></div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-black text-gray-800 mb-6">🛒 My Shopping Cart</h2>

//       {!cart || cart.items.length === 0 ? (
//         <div className="text-center py-16 bg-white border border-dashed rounded-3xl p-8">
//           <p className="text-gray-400 font-medium mb-4">Aapka cart khali hai. Kuch mast 3D covers add karo!</p>
//           <Link to="/" className="bg-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-purple-700">Explore Products</Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
//           {/* Left Column: Items List */}
//           <div className="lg:col-span-2 space-y-4">
//             {cart.items.map((item) => (
//               <div key={item.product?._id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm flex gap-4 items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <img src={item.product?.images?.[0]} alt={item.product?.name} className="w-20 h-20 object-contain bg-slate-50 rounded-2xl border" />
//                   <div>
//                     <h4 className="font-bold text-gray-800 line-clamp-1">{item.product?.name}</h4>
//                     <p className="text-xs text-gray-400 capitalize">{item.product?.category}</p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-purple-600 font-black">₹{item.product?.price}</span>
//                       {item.product?.mrp > item.product?.price && (
//                         <span className="text-xs text-gray-400 line-through">₹{item.product?.mrp}</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quantity Controls & Remove */}
//                 <div className="flex flex-col items-end gap-3">
//                   <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
//                     <button onClick={() => updateQuantityHandler(item.product?._id, item.quantity, -1)} className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-200">-</button>
//                     <span className="px-3 py-1 text-sm font-bold text-gray-800">{item.quantity}</span>
//                     <button onClick={() => updateQuantityHandler(item.product?._id, item.quantity, 1)} className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-200">+</button>
//                   </div>
//                   <button onClick={() => removeItemHandler(item.product?._id)} className="text-xs text-red-500 font-bold hover:underline">Remove 🗑️</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Column: Flipkart Style Price Summary */}
//           <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm h-fit space-y-4">
//             <h3 className="text-lg font-bold text-gray-800 border-b pb-2 uppercase tracking-wide text-gray-400">Price Details</h3>
//             <div className="space-y-2 text-sm text-gray-600">
//               <div className="flex justify-between">
//                 <span>Price ({cart.items.length} items)</span>
//                 <span>₹{totalMRP}</span>
//               </div>
//               <div className="flex justify-between text-green-600 font-medium">
//                 <span>Discount</span>
//                 <span>- ₹{discount}</span>
//               </div>
//               <div className="flex justify-between text-gray-700">
//                 <span>Delivery Charges</span>
//                 <span className="text-green-600 font-bold">FREE</span>
//               </div>
//               <div className="border-t pt-3 flex justify-between text-lg font-black text-gray-900">
//                 <span>Total Amount</span>
//                 <span>₹{subtotal}</span>
//               </div>
//             </div>

//             <button 
//               onClick={() => navigate('/checkout', { state: { fromCart: true, cartItems: cart.items, totalAmount: subtotal } })}
//               className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold py-3 rounded-2xl text-center shadow-md hover:opacity-95 transition mt-4"
//             >
//               Proceed to Checkout 🚀
//             </button>
//           </div>

//         </div>
//       )}
//     </div>
//   );
// }







































import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo) return setLoading(false);
      try {
        const res = await axios.get('https://casex-backend-h0xv.onrender.com/api/cart', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        setCart(res.data);
      } catch (err) {
        console.error("Cart load karne me dikkat:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantityHandler = async (productId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    try {
      const res = await axios.post('https://casex-backend-h0xv.onrender.com/api/cart/add', 
        { productId, quantity: newQty },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setCart(res.data);
    } catch (err) {
      alert("We couldn't update the quantity at the moment. Please try again later.");
    }
  };

  const removeItemHandler = async (productId) => {
    try {
      const res = await axios.post('https://casex-backend-h0xv.onrender.com/api/cart/remove', 
        { productId },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setCart(res.data);
      alert("Removed from Cart 🛒");
    } catch (err) {
      alert("We couldn't remove this item at the moment. Please try again later.");
    }
  };

  // Safe Calculation Logic (checks if product exists)
  const validItems = cart?.items?.filter(item => item.product) || [];
  
  const subtotal = validItems.reduce((acc, item) => acc + ((item.product?.price || 0) * item.quantity), 0);
  const totalMRP = validItems.reduce((acc, item) => acc + (((item.product?.mrp) || (item.product?.price || 0)) * item.quantity), 0);
  const discount = totalMRP - subtotal;

  if (!userInfo) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-md text-center max-w-sm">
          <p className="text-red-500 font-bold text-xl mb-4">🔒 Access Denied</p>
          <p className="text-gray-500 text-sm mb-6">Shopping Cart dekhne ke liye please login karein!</p>
          <button onClick={() => navigate('/login')} className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-xl">Go to Login</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-gray-800 mb-8 flex items-center gap-3">
          🛒 My Shopping Cart <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full">{validItems.length} Items</span>
        </h2>

        {validItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-100 shadow-sm rounded-3xl p-8 max-w-md mx-auto">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-600 font-bold text-lg mb-2">Aapka cart khali hai</p>
            <p className="text-gray-400 text-sm mb-6">Chalo kuch mast customize 3D covers add karte hain!</p>
            <Link to="/" className="inline-block bg-purple-600 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-md hover:bg-purple-700 transition">Shop Now</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Items List */}
            <div className="lg:col-span-2 space-y-4">
              {validItems.map((item) => (
                <div key={item.product._id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between transition hover:shadow-md">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img 
                      src={item.product.images?.[0] || 'https://via.placeholder.com/150'} 
                      alt={item.product.name} 
                      className="w-20 h-20 object-contain bg-slate-50 rounded-2xl border flex-shrink-0" 
                    />
                    <div>
                      <h4 className="font-bold text-gray-800 text-base line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-gray-400 capitalize bg-slate-100 px-2 py-0.5 rounded w-fit mt-1">{item.product.category || 'Phone Cover'}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-purple-600 font-black text-base">₹{item.product.price}</span>
                        {item.product.mrp > item.product.price && (
                          <span className="text-xs text-gray-400 line-through">₹{item.product.mrp}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls & Remove */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 gap-3">
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                      <button type="button" onClick={() => updateQuantityHandler(item.product._id, item.quantity, -1)} className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-200">-</button>
                      <span className="px-3 py-1 text-sm font-bold text-gray-800">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantityHandler(item.product._id, item.quantity, 1)} className="px-3 py-1 font-bold text-gray-600 hover:bg-gray-200">+</button>
                    </div>
                    <button type="button" onClick={() => removeItemHandler(item.product._id)} className="text-xs text-red-500 font-bold hover:underline flex items-center gap-1">
                      <span>🗑️</span> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Price Summary */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4 lg:sticky lg:top-24">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider border-b pb-3">Price Details</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Price ({validItems.length} items)</span>
                  <span className="font-medium text-gray-800">₹{totalMRP}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="border-t border-dashed pt-4 flex justify-between text-xl font-black text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-purple-600">₹{subtotal}</span>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => navigate('/checkout', { state: { fromCart: true, cartItems: validItems, totalAmount: subtotal } })}
                className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold py-3.5 rounded-2xl text-center shadow-lg hover:opacity-95 transition-all transform active:scale-95 mt-4"
              >
                Proceed to Checkout 🚀
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}