// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   // Saare orders load karne ka function
//   const fetchAllOrders = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/orders', {
//         headers: { Authorization: `Bearer ${userInfo?.token}` }
//       });
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Error fetching admin orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   // Status badalne ka handler
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus }, {
//         headers: { Authorization: `Bearer ${userInfo?.token}` }
//       });
//       alert(`🎉 Order status updated to ${newStatus}`);
//       fetchAllOrders(); // List refresh karne ke liye
//     } catch (err) {
//       alert("Status update karne mein error aayi");
//       console.error(err);
//     }
//   };

//   if (!userInfo || userInfo.role?.toLowerCase() !== 'admin') {
//     return <div className="text-center p-12 font-bold text-red-500">🛑 Access Denied! Sirf Admin hi is page ko dekh sakta hai.</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 my-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-black text-gray-800">💼 Admin Central: Manage Orders</h2>
//         <span className="bg-purple-100 text-purple-700 font-bold px-4 py-1.5 rounded-full text-xs uppercase">
//           Total Orders: {orders.length}
//         </span>
//       </div>

//       {loading ? (
//         <div className="text-center py-12">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto"></div>
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="text-center py-12 text-gray-400 border border-dashed rounded-3xl bg-white">
//           Abhi tak koi orders nahi aaye hain.
//         </div>
//       ) : (
//         <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
//                   <th className="p-4">Customer / Contact</th>
//                   <th className="p-4">Product Details</th>
//                   <th className="p-4">Amount</th>
//                   <th className="p-4">Address</th>
//                   <th className="p-4 text-center">Actions / Status</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm font-semibold text-gray-700 divide-y divide-gray-50">
//                 {orders.map((order) => (
//                   <tr key={order._id} className="hover:bg-slate-50/50 transition">
//                     {/* User Info */}
//                     <td className="p-4">
//                       <div className="font-bold text-gray-900">{order.customerName}</div>
//                       <div className="text-xs text-gray-400 mt-0.5">{order.phoneNumber}</div>
//                     </td>

//                     {/* Product Summary */}
//                     {/* <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <img 
//                           src={order.product?.images?.[0] || 'https://via.placeholder.com/50'} 
//                           alt="product" 
//                           className="w-10 h-10 object-contain bg-slate-50 border rounded-lg"
//                         />
//                         <div>
//                           <div className="text-purple-700 font-bold text-xs line-clamp-1">{order.product?.name || 'Deleted Product'}</div>
//                           <div className="text-[10px] text-gray-400 mt-0.5">Date: {new Date(order.orderedAt).toLocaleDateString()}</div>
//                         </div>
//                       </div>
//                     </td> */}


//                     {/* Product Summary Section Ko Isse Replace Karein */}
// <td className="p-4">
//   <div className="flex flex-col gap-3">
//     {order.products && order.products.length > 0 ? (
//       order.products.map((item, index) => (
//         <div key={index} className="flex items-center gap-3 border-b border-gray-50 last:border-0 pb-1 last:pb-0">
//           <img 
//             src={item.product?.images?.[0] || 'https://via.placeholder.com/50'} 
//             alt="product" 
//             className="w-10 h-10 object-contain bg-slate-50 border rounded-lg"
//           />
//           <div>
//             <div className="text-purple-700 font-bold text-xs line-clamp-1">
//               {item.product?.name || 'Deleted Product'}
//             </div>
//             <div className="text-[10px] text-gray-400 mt-0.5">
//               Qty: {item.quantity} | Date: {new Date(order.orderedAt).toLocaleDateString()}
//             </div>
//           </div>
//         </div>
//       ))
//     ) : (
//       <span className="text-xs text-gray-400">No Products Found</span>
//     )}
//   </div>
// </td>

//                     {/* Price */}
//                     <td className="p-4">
//                       <span className="text-purple-600 font-black">₹{order.totalAmount}</span>
//                     </td>

//                     {/* Address */}
//                     <td className="p-4 max-w-xs">
//                       <p className="text-xs text-gray-500 line-clamp-2">{order.address}</p>
//                     </td>

//                     {/* Status Select dropdown */}
//                     <td className="p-4 text-center">
//                       <select
//                         value={order.status}
//                         onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                         className={`p-2 rounded-xl text-xs font-bold uppercase outline-none border transition cursor-pointer ${
//                           order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
//                           order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
//                           'bg-amber-50 text-amber-600 border-amber-200'
//                         }`}
//                       >
//                         <option value="Pending">🕒 Pending</option>
//                         <option value="Shipped">📦 Shipped</option>
//                         <option value="Delivered">🎉 Delivered</option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



























































// 📄 src/pages/AdminOrders.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Saare orders load karne ka function
  const fetchAllOrders = async () => {
    try {
      const res = await axios.get('https://casex-backend-h0xv.onrender.com/api/orders', {
        headers: { Authorization: `Bearer ${userInfo?.token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching admin orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Status badalne ka handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://casex-backend-h0xv.onrender.com/api/orders/${orderId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${userInfo?.token}` }
      });
      alert(`🎉 Order status updated to ${newStatus}`);
      fetchAllOrders(); // List refresh karne ke liye
    } catch (err) {
      alert("Unable to update the order status. Please try again.");
      console.error(err);
    }
  };

  if (!userInfo || userInfo.role?.toLowerCase() !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-white">
        <div className="bg-red-50 border border-red-100 rounded-[24px] p-8 max-w-md w-full text-center shadow-sm">
          <span className="text-3xl block mb-3">🛑</span>
          <h4 className="text-sm font-black text-red-900 uppercase tracking-wider">Access Denied</h4>
          <p className="text-red-600 text-xs font-semibold mt-1">
            Sirf authorized system admin hi is terminal logs ko access kar sakte hain.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-purple-600 selection:text-white">
      <div className="max-w-[97rem] mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Premium Header Banner */}
        <div className="bg-gradient-to-r from-[#8f0b54] to-[#500361] rounded-[28px] p-6 text-white shadow-xl mb-8 relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="absolute right-0 top-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-wider border border-white">
              Fulfillment Command Center
            </span>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight mt-4 flex items-center gap-2">
              💼 Admin Central: Manage Orders
            </h2>
            <p className="text-s text-purple-200/80 mt-3 font-medium max-w-xl">
              Manage customer orders, track deliveries, and monitor order status from one place.
            </p>
          </div>
          <div className="shrink-0 self-start sm:self-center">
            <span className="bg-white/10 text-white border border-white/10 font-black px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-inner">
              Total Logs: {orders.length}
            </span>
          </div>
        </div>

        {/* Dynamic Content States Area */}
        {loading ? (
          /* Seamless Inline Spinner (Borders removed to prevent screen flashing) */
          <div className="min-h-[300px] flex flex-col items-center justify-center bg-white p-6">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
            </div>
            <p className="mt-4 text-[10px] font-black text-purple-600/70 uppercase tracking-widest animate-pulse">
              Syncing Logistics Streams...
            </p>
          </div>
        ) : orders.length === 0 ? (
          /* Empty State Dashboard */
          <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-[24px] max-w-md mx-auto px-4">
            <span className="text-3xl block mb-2">📭</span>
            <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-wider">
              No Invoices Generated
            </p>
            <p className="text-slate-400 text-xs mt-1">
              No orders have been placed on the platform yet.
            </p>
          </div>
        ) : (
          /* Responsive Main Data Container */
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden">
            
            {/* Desktop View Table (MD Screens and Above) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-400 font-black text-[12px] uppercase tracking-wider">
                    <th className="p-5">Customer / Contact</th>
                    <th className="p-5">Product Details</th>
                    <th className="p-5">Amount</th>
                    <th className="p-5">Shipping Address</th>
                    <th className="p-5 text-center pr-8">Actions / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm font-semibold text-gray-700">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50/40 transition duration-150 items-start">
                      
                      {/* Customer Info */}
                      <td className="p-5 align-top">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-s font-black border border-purple-100/40 shadow-inner shrink-0">
                            {order.customerName ? order.customerName.charAt(0).toUpperCase() : 'C'}
                          </div>
                          <div>
                            <div className=" font-black text-slate-800 tracking-tight capitalize">
                              {order.customerName || "Unknown Buyer"}
                            </div>
                            <div className="text-s font-mono text-slate-400 font-medium mt-0.5">
                              {order.phoneNumber || "No Contact"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Product Summaries Iteration */}
                      <td className="p-5 align-top min-w-[240px]">
                        <div className="flex flex-col gap-3">
                          {order.products && order.products.length > 0 ? (
                            order.products.map((item, index) => (
                              <div key={index} className="flex items-center gap-3 border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                                <img 
                                  src={item.product?.images?.[0] || 'https://via.placeholder.com/50'} 
                                  alt="product" 
                                  className="w-13 h-13 object-contain bg-slate-50 border border-slate-100 rounded-xl p-0.5 shrink-0"
                                />
                                <div className="min-w-0">
                                  <div className="text-purple-700 font-black text-s line-clamp-1 tracking-tight">
                                    {item.product?.name || 'Deleted Product'}
                                  </div>
                                  <div className="text-[11px] text-slate-400 font-bold mt-0.5">
                                    Qty: <span className="text-slate-700 font-black">{item.quantity}</span> | <span className="font-mono text-[11px]">{new Date(order.orderedAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 font-medium italic">No Products Found</span>
                          )}
                        </div>
                      </td>

                      {/* Total Gross Amount */}
                      <td className="p-5 align-top">
                        <span className="text-purple-700 font-black text-base tracking-tight block mt-1">
                          ₹{order.totalAmount}
                        </span>
                      </td>

                      {/* Shipping Destination */}
                      <td className="p-5 align-top max-w-xs">
                        <p className="text-s text-slate-500 font-medium leading-relaxed mt-1 line-clamp-3">
                          {order.address || "No shipping address mapped."}
                        </p>
                      </td>

                      {/* Pipeline Status Select Configuration */}
                      <td className="p-5 text-center pr-8 align-top">
                        <div className="inline-block mt-0.5">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`p-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider outline-none border transition cursor-pointer shadow-sm ${
                              order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:border-emerald-400' :
                              order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200 focus:border-blue-400' :
                              'bg-amber-50 text-amber-600 border-amber-200 focus:border-amber-400'
                            }`}
                          >
                            <option value="Pending" className="bg-white text-slate-700 font-bold">🕒 Pending</option>
                            <option value="Shipped" className="bg-white text-slate-700 font-bold">📦 Shipped</option>
                            <option value="Delivered" className="bg-white text-slate-700 font-bold">🎉 Delivered</option>
                          </select>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View Stack Cards Layout (Hidden on MD Screens) */}
            <div className="md:hidden divide-y divide-slate-100">
              {orders.map((order) => (
                <div key={order._id} className="p-5 space-y-4 hover:bg-slate-50/20 transition">
                  
                  {/* Customer Meta Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-black shrink-0 shadow-inner">
                        {order.customerName ? order.customerName.charAt(0).toUpperCase() : 'C'}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-slate-800 text-sm capitalize truncate tracking-tight">
                          {order.customerName || "Unknown Buyer"}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">{order.phoneNumber || "No Contact"}</p>
                      </div>
                    </div>
                    
                    {/* Amount Block Asset */}
                    <div className="text-right shrink-0">
                      <span className="text-purple-700 font-black text-sm tracking-tight block">₹{order.totalAmount}</span>
                    </div>
                  </div>

                  {/* Products Nested List Mapping */}
                  <div className="p-3 bg-slate-50/60 rounded-2xl space-y-3 border border-slate-100/40">
                    {order.products && order.products.length > 0 ? (
                      order.products.map((item, index) => (
                        <div key={index} className="flex items-center gap-2.5 border-b border-slate-100/40 last:border-0 pb-2 last:pb-0">
                          <img 
                            src={item.product?.images?.[0] || 'https://via.placeholder.com/50'} 
                            alt="product" 
                            className="w-8 h-8 object-contain bg-white border border-slate-100 rounded-lg p-0.5 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h5 className="text-purple-700 font-bold text-[11px] truncate tracking-tight">
                              {item.product?.name || 'Deleted Product'}
                            </h5>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                              Qty: <span className="text-slate-700 font-black">{item.quantity}</span> | <span className="font-mono text-[9px]">{new Date(order.orderedAt).toLocaleDateString()}</span>
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-400 italic text-center py-1">No products linked</div>
                    )}
                  </div>

                  {/* Destination Address Wrapper */}
                  <div className="text-[11px] text-slate-500 font-medium bg-slate-50/20 px-1 py-0.5">
                    <span className="font-bold text-slate-400 block uppercase tracking-wider text-[9px] mb-0.5">Shipping Location</span>
                    {order.address || "No target address specified."}
                  </div>

                  {/* Mobile Actions Processing Select Bar */}
                  <div className="pt-1">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`w-full p-2.5 rounded-xl text-xs font-black uppercase tracking-wider outline-none border transition text-center shadow-sm cursor-pointer ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-amber-50 text-amber-600 border-amber-200'
                      }`}
                    >
                      <option value="Pending" className="text-slate-700 font-bold">🕒 State: Pending</option>
                      <option value="Shipped" className="text-slate-700 font-bold">📦 State: Shipped</option>
                      <option value="Delivered" className="text-slate-700 font-bold">🎉 State: Delivered</option>
                    </select>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}