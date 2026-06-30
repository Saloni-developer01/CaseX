// // new with 10% commission
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import VendorDashboard from './VendorDashboard';
// import { useNavigate } from 'react-router-dom';

// // export function SubscriptionStatusBanner() {
// //   const navigate = useNavigate();
// //   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// //   if (!userInfo || userInfo.role !== 'vendor') return null;

// //   const expiryDate = userInfo.subscriptionExpiresAt ? new Date(userInfo.subscriptionExpiresAt) : null;
// //   const currentDate = new Date();

// //   let daysLeft = 0;
// //   if (expiryDate) {
// //     const differenceInTime = expiryDate.getTime() - currentDate.getTime();
// //     daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
// //   }

// //   // Case 1: Expired Status
// //   if (!userInfo.isSubscribed || userInfo.subscriptionStatus === 'expired' || daysLeft <= 0) {
// //     return (
// //       <div className="bg-red-500 text-white text-center p-4 text-sm font-bold flex justify-center items-center gap-3 rounded-2xl mb-6 shadow-md">
// //         <span>🚨 Aapka Monthly Vendor Subscription khatam ho chuka hai! Naye products add karne ke liye abhi renew karein.</span>
// //         <button 
// //           onClick={() => navigate('/subscription-payment')} 
// //           className="bg-white text-red-600 px-3 py-1 rounded-xl text-xs font-black shadow-md hover:bg-gray-100 transition"
// //         >
// //           🔄 Renew Now
// //         </button>
// //       </div>
// //     );
// //   }

// //   // Case 2: Warning Banner (5 days or less)
// //   if (daysLeft <= 5) {
// //     return (
// //       <div className="bg-amber-500 text-white text-center p-4 text-sm font-bold flex justify-center items-center gap-3 rounded-2xl mb-6 shadow-md">
// //         <span>⚠️ Warning: Aapka Vendor Pass **{daysLeft} din** mein expire hone wala hai. Continuous selling ke liye renew kar lein.</span>
// //         <button 
// //           onClick={() => navigate('/subscription-payment')} 
// //           className="bg-white text-amber-600 px-3 py-1 rounded-xl text-xs font-black shadow-md hover:bg-gray-100 transition"
// //         >
// //           ⚡ Renew Pass
// //         </button>
// //       </div>
// //     );
// //   }

// //   // Case 3: Safe Zone (Clean display badge)
// //   return (
// //     <div className="mb-6 w-full text-center">
// //       <div className="text-sm font-bold text-emerald-700 bg-emerald-50 px-6 py-3 rounded-2xl inline-block border border-emerald-200 shadow-sm w-full">
// //         🛡️ Premium Membership Status: Active Premium ( {daysLeft} Days Remaining )
// //       </div>
// //     </div>
// //   );
// // }



// // 📄 Dashboard.jsx ke top par is code ko update kar lo:
// export function SubscriptionStatusBanner() {
//   const navigate = useNavigate();
//   // 🌟 FIX: direct localStorage se data read karo fresh calculations ke liye
//   const localUser = JSON.parse(localStorage.getItem('userInfo'));

//   if (!localUser || localUser.role !== 'vendor') return null;

//   const expiryDate = localUser.subscriptionExpiresAt ? new Date(localUser.subscriptionExpiresAt) : null;
//   const currentDate = new Date();

//   let daysLeft = 0;
//   if (expiryDate) {
//     const differenceInTime = expiryDate.getTime() - currentDate.getTime();
//     daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
//   }

//   // Case 1: Expired Status
//   if (!localUser.isSubscribed || localUser.subscriptionStatus === 'expired' || daysLeft <= 0) {
//     return (
//       <div className="bg-red-500 text-white text-center p-4 text-sm font-bold flex justify-center items-center gap-3 rounded-2xl mb-6 shadow-md">
//         <span>🚨 Aapka Monthly Vendor Subscription khatam ho chuka hai! Naye products add karne ke liye abhi renew karein.</span>
//         <button 
//           onClick={() => navigate('/subscription-payment')} 
//           className="bg-white text-red-600 px-3 py-1 rounded-xl text-xs font-black shadow-md hover:bg-gray-100 transition"
//         >
//           🔄 Renew Now
//         </button>
//       </div>
//     );
//   }

//   // Case 2: Warning Banner (5 days or less)
//   if (daysLeft <= 5) {
//     return (
//       <div className="bg-amber-500 text-white text-center p-4 text-sm font-bold flex justify-center items-center gap-3 rounded-2xl mb-6 shadow-md">
//         <span>⚠️ Warning: Aapka Vendor Pass **{daysLeft} din** mein expire hone wala hai. Continuous selling ke liye renew kar lein.</span>
//         <button 
//           onClick={() => navigate('/subscription-payment')} 
//           className="bg-white text-amber-600 px-3 py-1 rounded-xl text-xs font-black shadow-md hover:bg-gray-100 transition ml-2"
//         >
//           ⚡ Renew Pass
//         </button>
//       </div>
//     );
//   }

//   // Case 3: Safe Zone (Clean display badge)
//   return (
//     <div className="mb-6 w-full text-center">
//       <div className="text-sm font-bold text-emerald-700 bg-emerald-50 px-6 py-3 rounded-2xl inline-block border border-emerald-200 shadow-sm w-full">
//         🛡️ Premium Membership Status: 🟢 Active Premium ( {daysLeft} Days Remaining )
//       </div>
//     </div>
//   );
// }


// export default function Dashboard() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Analytics States
//   const [totalSales, setTotalSales] = useState(0);
//   const [adminEarnings, setAdminEarnings] = useState(0);
//   const [vendorWallet, setVendorWallet] = useState(0);
//   const [payoutHistory, setPayoutHistory] = useState([]);
  
//   // Dynamic user data state to avoid stale localStorage issues
//   const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('userInfo')));

//   useEffect(() => {
//     // Sync current user context on mount
//     const updatedUser = JSON.parse(localStorage.getItem('userInfo'));
//     if (updatedUser) {
//       setCurrentUser(updatedUser);
//     }
//   }, []);

//   useEffect(() => {
//     const fetchMyOrdersAndPayouts = async () => {
//       if (!currentUser) return setLoading(false);
//       try {
//         const res = await axios.get('http://localhost:5000/api/orders', {
//           headers: { Authorization: `Bearer ${currentUser.token}` }
//         });
        
//         const role = currentUser.role?.toLowerCase();

//         if (role === 'admin') {
//           setOrders(res.data);
//           const globalSales = res.data.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
//           const globalCommission = res.data.reduce((acc, curr) => acc + (Number(curr.commissionEarned) || (Number(curr.totalAmount) * 0.10 || 0)), 0);
//           setTotalSales(globalSales);
//           setAdminEarnings(globalCommission);

//         } else if (role === 'vendor') {
//           const vendorOrders = res.data.filter(order => {
//             if (order.sellerId === currentUser._id) return true;
            
//             const hasVendorProduct = order.products?.some(p => 
//               p.product?.vendorId === currentUser._id || 
//               p.product?.sellerId === currentUser._id ||
//               p.product?.seller === currentUser.name
//             );
            
//             return hasVendorProduct;
//           });

//           setOrders(vendorOrders);

//           const netWalletIncome = vendorOrders.reduce((acc, curr) => acc + (Number(curr.vendorPayout) || (Number(curr.totalAmount) * 0.90 || 0)), 0);

//           const payoutRes = await axios.get('http://localhost:5000/api/payouts/my-requests', {
//             headers: { Authorization: `Bearer ${currentUser.token}` }
//           });
//           setPayoutHistory(payoutRes.data);

//           const totalWithdrawn = payoutRes.data
//             .filter(req => req.status === 'Approved')
//             .reduce((sum, req) => sum + Number(req.amount), 0);

//           const finalCalculatedWallet = netWalletIncome - totalWithdrawn;
//           setVendorWallet(Number(finalCalculatedWallet).toFixed(2));

//         } else {
//           const myOrders = res.data.filter(orders => orders.customerName === currentUser.name);
//           setOrders(myOrders);
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyOrdersAndPayouts();
//   }, [currentUser]);

//   if (!currentUser) {
//     return <div className="text-center p-12 font-bold text-red-500">🔒 Please login to view your dashboard!</div>;
//   }

//   const userRole = currentUser.role?.toLowerCase();

//   const handleUpdateStatus = async (orderId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, 
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${currentUser.token}` } }
//       );
//       alert(`🎉 Order status updated to ${newStatus}`);
//       window.location.reload();
//     } catch (err) {
//       console.error("Status update error:", err);
//       alert("Status badalne mein koi dikkat aayi.");
//     }
//   };

//   // Pre-calculate days left for the "Shop Status" card rendering logic
//   // const expiryDate = currentUser.subscriptionExpiresAt ? new Date(currentUser.subscriptionExpiresAt) : null;
//   // const currentDate = new Date();
//   // const daysLeft = expiryDate ? Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)) : 0;
//   // const isCurrentlySubscribed = currentUser.isSubscribed && daysLeft > 0;
//   // console.log(isCurrentlySubscribed);

//   // 🟢 NAYA CODES (Direct local storage read karega taaki instantly update ho):
//   const freshUserData = JSON.parse(localStorage.getItem('userInfo')) || currentUser;
//   const expiryDate = freshUserData.subscriptionExpiresAt ? new Date(freshUserData.subscriptionExpiresAt) : null;
//   const currentDate = new Date();
//   const daysLeft = expiryDate ? Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)) : 0;
  
//   // Is variable ko bilkul is tarah enforce karo:
//   const isCurrentlySubscribed = freshUserData.isSubscribed === true && daysLeft > 0;
  
//   console.log("Fresh Subscription Status:", isCurrentlySubscribed);
  
//   return (
//     <div className="max-w-5xl mx-auto p-6 my-6">
      
//       {/* 🌟 FIX 1: TOP BANNER ADDED HERE TO DISPLAY COUNTER DIRECTLY */}
//       <SubscriptionStatusBanner />

//       {/* 💳 Profile Header Banner */}
//       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl mb-8 flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-black">Welcome Back, {currentUser.name}! 👋</h2>
//           <p className="text-xs text-purple-100 mt-1 font-semibold">Email: {currentUser.email}</p>
//         </div>
//         <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
//           {currentUser.role || 'Customer'} Account
//         </span>
//       </div>

//       {/* ==================== 🛠️ PANEL 1: MAIN ADMIN VIEW ==================== */}
//       {userRole === 'admin' && (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="bg-white border rounded-3xl p-5 shadow-sm flex items-center justify-between">
//               <div>
//                 <span className="text-xs font-bold text-gray-400 uppercase">Total Network GMV Sales</span>
//                 <h4 className="text-2xl font-black text-gray-800 mt-1">₹{totalSales}</h4>
//                 <Link to="/admin/payouts" className="flex flex-col p-5 bg-amber-50 border border-amber-100 rounded-2xl hover:bg-amber-100/70 transition group mt-2">
//                   <span className="font-bold text-gray-800 text-sm">Review Vendor Payouts</span>
//                   <span className="text-[11px] text-gray-400 mt-0.5">Check bank account requests, approve transfers, and track system ledger.</span>
//                 </Link>
//               </div>
//               <span className="p-3 bg-purple-50 text-purple-600 rounded-2xl text-xl font-bold">📈</span>
//             </div>
//             <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 shadow-lg text-white flex items-center justify-between">
//               <div>
//                 <span className="text-xs font-bold text-emerald-100 uppercase">Platform Commission (Your Net Revenue 10%)</span>
//                 <h4 className="text-2xl font-black mt-1">₹{adminEarnings}</h4>
//               </div>
//               <span className="p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl text-xl font-bold">💰</span>
//             </div>
//           </div>

//           <div className="bg-white border rounded-3xl p-6 shadow-sm">
//             <h3 className="text-lg font-black text-gray-800 mb-2">⚙️ Admin Control Center</h3>
//             <p className="text-xs text-gray-400 mb-6">Manage global logistics, platform fees setup, and view master statistics.</p>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Link to="/admin/orders" className="flex flex-col p-5 bg-purple-50 border border-purple-100 rounded-2xl hover:bg-purple-100/70 transition group">
//                 <span className="font-bold text-gray-800 text-sm">Manage All Global Orders</span>
//                 <span className="text-[11px] text-gray-400 mt-0.5">Track shipping statuses and override data live.</span>
//               </Link>
//               <Link to="/admin/add-product" className="flex flex-col p-5 bg-red-50 border border-red-100 rounded-2xl hover:bg-red-100/70 transition group">
//                 <span className="font-bold text-gray-800 text-sm">Add Global 3D Case</span>
//                 <span className="text-[11px] text-gray-400 mt-0.5">Insert brand new phone cases to the public inventory list.</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ==================== 🏬 PANEL 2: VENDOR VIEW ==================== */}
//       {userRole === 'vendor' && (
//         <div className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-5 text-white shadow-md flex items-center justify-between">
//               <div>
//                 <span className="text-xs font-bold text-amber-100 uppercase">Your Shop Wallet Balance</span>
//                 <h4 className="text-2xl font-black mt-1">₹{vendorWallet}</h4>
//                 <p className="text-[10px] text-amber-50 mt-1">* 10% CaseX platform commission automatically deducted.</p>
//                 <Link to="/vendordashboard" state={{ currentBalance: vendorWallet }} className='bg-green-500 text-white px-3 py-1 rounded-xl text-xs font-bold inline-block mt-3 shadow-sm'>
//                   Withdraw
//                 </Link>
//               </div>
//               <span className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-xl">🏦</span>
//             </div>
            
//             {/* ==================== CLEAN VENDOR SHOP STATUS CARD ==================== */}
//             <div className="bg-white border p-5 rounded-3xl shadow-sm flex items-center justify-between">
//               <div>
//                 <span className="text-xs font-bold text-gray-400 uppercase">Shop Status</span>
//                 <h4 className="text-lg font-black text-gray-800 mt-1">
//                   {isCurrentlySubscribed ? (
//                     <span className="text-emerald-600">🟢 Active Premium ({daysLeft} Days Left)</span>
//                   ) : (
//                     <span className="text-red-500">🔴 Pass Expired / Incomplete</span>
//                   )}
//                 </h4>
//               </div>
              
//               {isCurrentlySubscribed ? (
//                 <Link to="/add-product" className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-emerald-700 transition">
//                   + Add Product
//                 </Link>
//               ) : (
//                 <Link to="/subscription-payment" className="bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-bold animate-pulse hover:bg-amber-600 transition">
//                   Activate Pass
//                 </Link>
//               )}
//             </div>
//           </div>

//           {/* Incoming Orders list */}
//           <div className="bg-white border rounded-3xl p-6 shadow-sm">
//             <h3 className="text-lg font-black text-gray-800 mb-4">🛒 Incoming Shop Orders (Aapki Kamai)</h3>
//             {loading ? (
//               <div className="text-center py-6"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div></div>
//             ) : orders.length === 0 ? (
//               <div className="text-center py-8 text-gray-400 text-sm border border-dashed rounded-2xl">
//                 Abhi tak kisi customer ne aapki shop se cover order nahi kiya hai.
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {orders.map((order) => (
//                   <div key={order._id} className="border border-gray-100 rounded-2xl p-4 flex justify-between items-center bg-slate-50/50 hover:shadow-sm transition">
//                     <div>
//                       <h4 className="font-bold text-sm text-gray-800">
//                         {order.products?.[0]?.product?.name || order.product?.name || 'Premium Listed Cover'}
//                       </h4>
//                       <p className="text-[11px] text-gray-400 mt-0.5">
//                         Buyer: <span className="text-gray-600 font-semibold">{order.customerName}</span> | Total Order value: ₹{order.totalAmount}
//                       </p>
//                       <p className="text-[10px] text-emerald-600 font-bold mt-1">Your Earnings (90%): ₹{order.vendorPayout || (order.totalAmount * 0.9)}</p>
//                     </div>
//                     <div className="flex flex-col items-end gap-2">
//                       <select 
//                         value={order.status} 
//                         onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
//                         className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-xl border border-amber-200 focus:outline-none"
//                       >
//                         <option value="Pending">⌛ Pending</option>
//                         <option value="Packed">📦 Packed</option>
//                         <option value="Shipped">🚚 Shipped</option>
//                         <option value="Delivered">🟢 Delivered</option>
//                       </select>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ==================== 📦 PANEL 3: CUSTOMER VIEW ==================== */}
//       {userRole !== 'admin' && userRole !== 'vendor' && (
//         <>
//           <h3 className="text-xl font-black text-gray-800 mb-4">📦 Your Order History</h3>
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto"></div>
//             </div>
//           ) : orders.length === 0 ? (
//             <div className="text-center py-12 bg-white border border-dashed rounded-3xl p-8 text-gray-400">
//               Hummm... Aapne abhi tak koi order nahi kiya hai. Ek mast 3D case order kijiye!
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {orders.map((order) => (
//                 <div key={order._id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 bg-slate-50 border rounded-xl flex items-center justify-center p-2">
//                       <img 
//                         src={order.products?.[0]?.product?.images?.[0] || order.product?.images?.[0] || 'https://placehold.co/150'} 
//                         alt="product" 
//                         className="max-h-full max-w-full object-contain"
//                       />
//                     </div>
//                     <div>
//                       <h4 className="font-bold text-gray-900 text-sm">{order.products?.[0]?.product?.name || order.product?.name || order.productName || 'Premium 3D Cover'}</h4>
//                       <p className="text-xs text-gray-400 font-semibold mt-0.5">Order ID: #{order._id.slice(-6).toUpperCase()}</p>
//                       <p className="text-[11px] text-gray-400">Ordered on: {new Date(order.orderedAt).toLocaleDateString()}</p>
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-500 max-w-xs">
//                     <span className="font-bold text-gray-700 block">Deliver to:</span>
//                     <p className="line-clamp-1">{order.address}</p>
//                   </div>
//                   <div className="flex md:flex-col justify-between w-full md:w-auto items-center md:items-end gap-2 border-t md:border-none pt-3 md:pt-0">
//                     <span className="text-base font-black text-purple-600">₹{order.totalAmount}</span>
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
//                       order.status === 'Delivered' ? 'bg-green-50 text-green-700' :
//                       order.status === 'Shipped' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
//                     }`}>
//                       • {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//     </div>
//   );
// }

































































// new with 10% commission
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VendorDashboard from './VendorDashboard';
import { useNavigate } from 'react-router-dom';

export function SubscriptionStatusBanner() {
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem('userInfo'));

  if (!localUser || localUser.role !== 'vendor') return null;

  const expiryDate = localUser.subscriptionExpiresAt ? new Date(localUser.subscriptionExpiresAt) : null;
  const currentDate = new Date();

  let daysLeft = 0;
  if (expiryDate) {
    const differenceInTime = expiryDate.getTime() - currentDate.getTime();
    daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  }

  // Case 1: Expired Status
  if (!localUser.isSubscribed || localUser.subscriptionStatus === 'expired' || daysLeft <= 0) {
    return (
      <div className="bg-red-500 text-white text-center p-4 text-sm font-bold flex flex-col sm:flex-row justify-center items-center gap-3 rounded-2xl mb-6 shadow-md border border-red-400/20">
        <span>🚨 Your vendor subscription is no longer active. Please renew your plan to add new products.</span>
        <button 
          onClick={() => navigate('/subscription-payment')} 
          className="bg-white text-red-600 px-4 py-1.5 rounded-xl text-xs font-black shadow-md hover:bg-gray-100 transition whitespace-nowrap"
        >
          🔄 Renew Now
        </button>
      </div>
    );
  }

  // Case 2: Warning Banner (5 days or less)
  if (daysLeft <= 5) {
    return (
      <div className="bg-amber-500 text-white text-center p-4 text-sm font-bold flex flex-col sm:flex-row justify-center items-center gap-3 rounded-2xl mb-6 shadow-md border border-amber-400/20">
        <span>⚠️ Warning: Aapka Vendor Pass **{daysLeft} din** mein expire hone wala hai. Continuous selling ke liye renew kar lein.</span>
        <button 
          onClick={() => navigate('/subscription-payment')} 
          className="bg-white text-amber-600 px-4 py-1.5 rounded-xl text-xs font-black shadow-md hover:bg-gray-100 transition whitespace-nowrap"
        >
          ⚡ Renew Pass
        </button>
      </div>
    );
  }

  // Case 3: Safe Zone (Clean display badge)
  return (
    <div className="mb-6 w-full text-center">
      <div className="text-s font-bold text-[#16C60C]  px-6 py-3 rounded-2xl inline-block border border-emerald-500/20 shadow-sm w-full backdrop-blur-md">
        🛡️ Premium Membership Status: <span className="text-[#16C60C]">🟢 Active Premium</span> ( {daysLeft} Days Remaining )
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Analytics States
  const [totalSales, setTotalSales] = useState(0);
  const [adminEarnings, setAdminEarnings] = useState(0);
  const [vendorWallet, setVendorWallet] = useState(0);
  const [payoutHistory, setPayoutHistory] = useState([]);
  
  // Dynamic user data state to avoid stale localStorage issues
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('userInfo')));

  useEffect(() => {
    const updatedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (updatedUser) {
      setCurrentUser(updatedUser);
    }
  }, []);

  useEffect(() => {
    const fetchMyOrdersAndPayouts = async () => {
      if (!currentUser) return setLoading(false);
      try {
        const res = await axios.get('https://casex-backend-h0xv.onrender.com/api/orders', {
          headers: { Authorization: `Bearer ${currentUser.token}` }
        });
        
        const role = currentUser.role?.toLowerCase();

        if (role === 'admin') {
          setOrders(res.data);
          const globalSales = res.data.reduce((acc, curr) => acc + (Number(curr.totalAmount) || 0), 0);
          const globalCommission = res.data.reduce((acc, curr) => acc + (Number(curr.commissionEarned) || (Number(curr.totalAmount) * 0.10 || 0)), 0);
          setTotalSales(globalSales);
          setAdminEarnings(globalCommission);

        } else if (role === 'vendor') {
          const vendorOrders = res.data.filter(order => {
            if (order.sellerId === currentUser._id) return true;
            
            const hasVendorProduct = order.products?.some(p => 
              p.product?.vendorId === currentUser._id || 
              p.product?.sellerId === currentUser._id ||
              p.product?.seller === currentUser.name
            );
            
            return hasVendorProduct;
          });

          setOrders(vendorOrders);

          const netWalletIncome = vendorOrders.reduce((acc, curr) => acc + (Number(curr.vendorPayout) || (Number(curr.totalAmount) * 0.90 || 0)), 0);

          const payoutRes = await axios.get('https://casex-backend-h0xv.onrender.com/api/payouts/my-requests', {
            headers: { Authorization: `Bearer ${currentUser.token}` }
          });
          setPayoutHistory(payoutRes.data);

          const totalWithdrawn = payoutRes.data
            .filter(req => req.status === 'Approved')
            .reduce((sum, req) => sum + Number(req.amount), 0);

          const finalCalculatedWallet = netWalletIncome - totalWithdrawn;
          setVendorWallet(Number(finalCalculatedWallet).toFixed(2));

        } else {
          const myOrders = res.data.filter(orders => orders.customerName === currentUser.name);
          setOrders(myOrders);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrdersAndPayouts();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#0e0826]">
        <div className="bg-white border border-red-100 rounded-[32px] p-8 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-inner">🔒</div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Access Denied</h3>
          <p className="text-gray-500 text-sm font-medium mt-2 mb-6">Please login to access secure administrative or customer system ledgers.</p>
          <Link to="/login" className="block w-full py-3 bg-[#0e0826] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-purple-900 transition duration-300">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const userRole = currentUser.role?.toLowerCase();

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`https://casex-backend-h0xv.onrender.com/api/orders/${orderId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      alert(`🎉 Order status updated to ${newStatus}`);
      window.location.reload();
    } catch (err) {
      console.error("Status update error:", err);
      alert("Oops! The status could not be updated at this time.");
    }
  };

  const freshUserData = JSON.parse(localStorage.getItem('userInfo')) || currentUser;
  const expiryDate = freshUserData.subscriptionExpiresAt ? new Date(freshUserData.subscriptionExpiresAt) : null;
  const currentDate = new Date();
  const daysLeft = expiryDate ? Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)) : 0;
  
  const isCurrentlySubscribed = freshUserData.isSubscribed === true && daysLeft > 0;

  return (
    <div className="min-h-screen text-[#0e0826] pb-16 selection:bg-purple-500 selection:text-white">
      <div className="max-w-[98rem] mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Top Fresh Banner Counter */}
        <SubscriptionStatusBanner />

        {/* Profile Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#8f0b54] to-[#500361] rounded-[32px] p-6 sm:p-8 text-white shadow-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition duration-500"></div>
          <div>
            <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-widest border border-white">
              Welcome Back
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-4">
              {currentUser.name}! 👋
            </h2>
            <p className="text-s text-purple-100 mt-3 font-medium opacity-90">
              Secured Session Token Reference: <span className="font-mono bg-black/10 px-1.5 py-0.5 rounded">{currentUser.email}</span>
            </p>
          </div>
          <span className="self-start sm:self-center px-4 py-2 bg-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg border border-white/20">
            {currentUser.role || 'Customer'} Space
          </span>
        </div>

        {/* ==================== PANEL 1: MAIN ADMIN VIEW ==================== */}
        {userRole === 'admin' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Global Network Sales Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-xl border border-purple-950/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[14px] font-black text-[#4d417c] uppercase tracking-wider">Total Network GMV Sales</span>
                    <span className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-lg font-bold">📈</span>
                  </div>
                  <h4 className="text-3xl font-black text-[#4d417c] tracking-tight">₹{totalSales}</h4>
                </div>
                
                <Link to="/admin/payouts" className="mt-6 flex flex-col p-4 bg-amber-50/60 border border-amber-200/60 rounded-2xl hover:bg-amber-100/50 transition duration-200 group">
                  <span className="font-black text-slate-800 text-xs uppercase tracking-wider flex items-center justify-between">
                    Review Vendor Payouts
                    <span className="transform group-hover:translate-x-1 transition duration-200">➔</span>
                  </span>
                  <span className="text-[11px] text-gray-500 mt-1 font-medium leading-relaxed">
                    Check bank account requests, approve transfers, and track system ledger.
                  </span>
                </Link>
              </div>

              {/* Platform Commission Card */}
              <div className="bg-gradient-to-br from-purple-900 via-[#067949] to-[#08261c] rounded-[24px] p-6 shadow-xl border border-purple-500/10 flex items-center justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl pointer-events-none"></div>
                <div>
                  <span className="text-[14px] font-black text-purple-300 uppercase tracking-wider block">
                    Platform Commission (Net Revenue 10%)
                  </span>
                  <h4 className="text-3xl font-black text-white tracking-tight mt-2">₹{adminEarnings}</h4>
                  <p className="text-[14px] text-gray-400 mt-2 font-medium">Real-time automatic calculation system</p>
                </div>
                <span className="p-4 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-2xl text-xl font-bold shadow-inner">💰</span>
              </div>
            </div>

            {/* Admin Control Actions */}
            <div className="bg-white rounded-[24px] p-6 shadow-xl border border-purple-950/5">
              <div className="mb-6">
                <h3 className="text-lg font-black text-[#4d417c] tracking-tight">⚙️ Admin Control Center</h3>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Manage global logistics, platform fees setup, and view master statistics.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/admin/orders" className="flex flex-col p-4 bg-purple-50/50 border border-purple-100 rounded-2xl hover:bg-purple-100 transition duration-200">
                  <span className="font-black text-slate-800 text-xs uppercase tracking-wider">Manage All Global Orders</span>
                  <span className="text-[11px] text-gray-400 font-medium mt-1">Track shipping statuses and override data live.</span>
                </Link>
                <Link to="/add-product" className="flex flex-col p-4 bg-red-50/50 border border-red-100 rounded-2xl hover:bg-red-100 transition duration-200">
                  <span className="font-black text-slate-800 text-xs uppercase tracking-wider">Add Global 3D Case</span>
                  <span className="text-[11px] text-gray-400 font-medium mt-1">Insert brand new phone cases to the public inventory list.</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 🏬 PANEL 2: VENDOR VIEW ==================== */}
        {userRole === 'vendor' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Wallet Balance Card */}
              <div className="bg-gradient-to-br from-purple-900 via-[#067949] to-[#08261c] rounded-[24px] p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-amber-100 uppercase tracking-wider">Your Shop Wallet Balance</span>
                    <span className="p-2 bg-white/20 backdrop-blur-sm rounded-xl text-lg">🏦</span>
                  </div>
                  <h4 className="text-3xl font-black tracking-tight">₹{vendorWallet}</h4>
                  <p className="text-[14px] text-white font-medium mt-1">* 10% CaseX platform commission automatically deducted.</p>
                </div>
                
                <div>
                  <Link to="/vendordashboard" state={{ currentBalance: vendorWallet }} className='inline-block bg-[#0e0826] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest mt-6 shadow-md hover:bg-purple-950 transition-all duration-200 transform active:scale-95'>
                    Withdraw Funds
                  </Link>
                </div>
              </div>
              
              {/* Shop Membership Status Card */}
              <div className="bg-white rounded-[24px] p-6 shadow-xl border border-purple-950/5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">Shop Status</span>
                  <h4 className="text-lg font-black text-slate-900 mt-2">
                    {isCurrentlySubscribed ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
                        🟢 Active Premium ({daysLeft} Days Left)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100">
                        🔴 Pass Expired / Incomplete
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium mt-2 leading-relaxed">
                    Premium passes guarantee structural exposure in customer feeds and unconstrained catalog updates.
                  </p>
                </div>
                
                <div className="mt-6">
                  {isCurrentlySubscribed ? (
                    <Link to="/add-product" className="inline-block text-center bg-[#0e0826] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:bg-purple-900 transition-all duration-200">
                      + Add Product
                    </Link>
                  ) : (
                    <Link to="/subscription-payment" className="inline-block text-center bg-amber-500 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest animate-pulse shadow-md hover:bg-amber-600 transition-all duration-200">
                      Activate Pass
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Incoming Orders list */}
            <div className="bg-white rounded-[24px] p-6 shadow-xl border border-purple-950/5">
              <div className="mb-6">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">🛒 Incoming Shop Orders </h3>
                <p className="text-s text-gray-400 font-medium mt-0.5">Track your custom earnings from third-party case purchases.</p>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="relative w-10 h-10 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-purple-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
                  </div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-s font-medium border-2 border-dashed border-gray-100 rounded-2xl max-w-xl mx-auto px-4 leading-relaxed">
                  💔 Your order list is empty right now. The first customer order could be just around the corner!
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50/40 hover:shadow-md hover:border-purple-200 transition duration-300">
                      <div>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-black rounded-md tracking-wider uppercase">
                          Product Node Asset
                        </span>
                        <h4 className="font-black text-sm text-slate-800 tracking-tight mt-1">
                          {order.products?.[0]?.product?.name || order.product?.name || 'Premium Listed Cover'}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-1 font-medium">
                          Buyer: <span className="text-slate-700 font-bold">{order.customerName}</span> | Gross Amount: ₹{order.totalAmount}
                        </p>
                        <p className="text-[11px] text-emerald-600 font-black mt-1.5 flex items-center gap-1">
                          <span>💰</span> Your Earnings (90%): ₹{order.vendorPayout || (order.totalAmount * 0.9)}
                        </p>
                      </div>
                      
                      <div className="sm:self-center self-start border-t sm:border-none pt-3 sm:pt-0 w-full sm:w-auto flex justify-between sm:justify-end items-center">
                        <span className="sm:hidden text-xs font-black text-gray-400 uppercase tracking-wider">Logistics Status</span>
                        <select 
                          value={order.status} 
                          onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                          className="text-xs font-black bg-white text-slate-800 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 cursor-pointer shadow-sm transition"
                        >
                          <option value="Pending">⌛ Pending</option>
                          <option value="Packed">📦 Packed</option>
                          <option value="Shipped">🚚 Shipped</option>
                          <option value="Delivered">🟢 Delivered</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== 📦 PANEL 3: CUSTOMER VIEW ==================== */}
        {userRole !== 'admin' && userRole !== 'vendor' && (
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-2xl font-black text-[#7f7f80] tracking-tight">📦 Your Order History</h3>
              <p className="text-xs text-[#cf85c5] font-medium mt-0.5">Review, audit and map your smartphone covers procurement status metrics.</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="relative w-10 h-10 mx-auto">
                  <div className="absolute inset-0 rounded-full border-4 border-purple-100"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-[#CF29DB] animate-spin"></div>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16 bg-white border border-dashed border-purple-950/10 rounded-[32px] p-8 max-w-xl mx-auto shadow-2xl">
                <p className="text-gray-400 font-medium text-sm mb-6">You haven't placed any orders yet. Find your perfect phone cover and place your first order today!</p>
                <Link to="/" className="inline-block bg-gradient-to-r from-[#CF29DB] to-[#F8429D] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md">
                  Browse Premium Cases
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white border border-purple-950/5 shadow-xl rounded-[24px] p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:border-purple-500/20 transition duration-300 relative overflow-hidden group">
                    
                    {/* Left: Product Metadata */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="w-29 h-29 bg-slate-50 border border-gray-100 rounded-2xl flex items-center justify-center p-2 shrink-0 select-none overflow-hidden">
                        <img 
                          src={order.products?.[0]?.product?.images?.[0] || order.product?.images?.[0] || 'https://placehold.co/150'} 
                          alt="product" 
                          className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      
                      <div className="min-w-0">
                        <h4 className="font-black text-slate-800 text-lg tracking-tight line-clamp-1 group-hover:text-[#CF29DB] transition duration-200">
                          {order.products?.[0]?.product?.name || order.product?.name || order.productName || 'Premium 3D Cover'}
                        </h4>
                        <p className="text-[16px] text-gray-400 font-mono mt-0.5 uppercase tracking-wider">
                          ID: #{order._id.slice(-6)}
                        </p>
                        <p className="text-[15px] text-gray-400 font-medium">
                          Date: {new Date(order.orderedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Shipping Reference */}
                    <div className="text-xs text-gray-500 max-w-xs md:border-l md:border-gray-100 md:pl-5 w-full md:w-auto">
                      <span className="font-black text-slate-700 uppercase text-[14px] tracking-wider block mb-0.5">Destination</span>
                      <p className="line-clamp-1 font-medium text-[16px] text-gray-500">{order.address}</p>
                    </div>

                    {/* Right: Pricing and Logistics Status Tags */}
                    <div className="flex md:flex-col justify-between w-full md:w-auto items-center md:items-end gap-2 border-t md:border-none pt-4 md:pt-0 border-slate-100">
                      <span className="text-2xl font-black text-[#CF29DB] tracking-tight">₹{order.totalAmount}</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        • {order.status}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}