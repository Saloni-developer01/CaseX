// // 📄 src/pages/AdminPayouts.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function AdminPayouts() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   useEffect(() => {
//     fetchPayoutRequests();
//   }, []);

//   const fetchPayoutRequests = async () => {
//     try {
//       // Saari requests admin ke liye fetch ho rahi hain
//       const res = await axios.get('http://localhost:5000/api/payouts/admin/all', {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       setRequests(res.data);
//     } catch (err) {
//       console.error("Requests fetch karne me error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Status ko Approve ya Reject karne ka function
// //   const handleStatusUpdate = async (id, newStatus) => {
// //     const adminMessage = prompt(`Optional message/reason for ${newStatus}:`);
// //     try {
// //       await axios.put(`http://localhost:5000/api/payouts/admin/update/${id}`, 
// //         { status: newStatus, adminMessage },
// //         { headers: { Authorization: `Bearer ${userInfo.token}` } }
// //       );
// //       alert(`🎉 Request successfully ${newStatus}!`);
// //       fetchPayoutRequests(); // List refresh karo live data ke liye
// //     } catch (err) {
// //       console.error("Update failed:", err);
// //       alert("Status badalne mein dikkat aayi.");
// //     }
// //   };

// // 📄 AdminPayouts.jsx ke andar handleStatusUpdate ko aise badlo:

// const handleStatusUpdate = async (id, newStatus) => {
//   // 🚫 Prompt hataya! Koi alert box nahi khulega direct status update hoga
//   try {
//     const res = await axios.put(`http://localhost:5000/api/payouts/admin/update/${id}`, 
//       { 
//         status: newStatus, 
//         adminMessage: newStatus === 'Approved' ? 'Your payout has been processed successfully.' : 'Rejected by Admin.' 
//       },
//       { headers: { Authorization: `Bearer ${userInfo.token}` } }
//     );
    
//     alert(`🎉 Request successfully ${newStatus}!`);
//     fetchPayoutRequests(); // List ko live reload karega page bina refresh kiye
//   } catch (err) {
//     console.error("Update failed:", err);
//     alert("Status badalne mein koi dikkat aayi. Backend console check karein.");
//   }
// };

//   if (loading) return <div className="text-center p-12 font-bold">Loading requests...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 my-6 space-y-6">
//       <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
//         <h2 className="text-2xl font-black">💰 Admin Payout Control Room</h2>
//         <p className="text-xs text-slate-400 mt-1">Yahan se aap vendors ke bank accounts me paise transfer karke requests approve kar sakte hain.</p>
//       </div>

//       <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
//         {requests.length === 0 ? (
//           <div className="p-12 text-center text-gray-400 font-semibold">Koi bhi payout request pending nahi hai. 👍</div>
//         ) : (
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-slate-50 border-b text-gray-500 text-xs font-bold uppercase">
//               <tr>
//                 <th className="p-4">Vendor Info</th>
//                 <th className="p-4">Amount Requested</th>
//                 <th className="p-4">Bank Account Details</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm font-semibold text-gray-700">
//               {requests.map((req) => (
//                 <tr key={req._id} className="border-b last:border-0 hover:bg-slate-50/50 transition">
//                   {/* Vendor Details */}
//                   <td className="p-4">
//                     <div className="font-bold text-gray-800">{req.vendorId?.name || "Unknown Vendor"}</div>
//                     <div className="text-xs text-gray-400">{req.vendorId?.email}</div>
//                   </td>
                  
//                   {/* Amount */}
//                   <td className="p-4 text-purple-600 font-black text-base">₹{req.amount}</td>
                  
//                   {/* Bank Details */}
//                   <td className="p-4 text-xs space-y-0.5 text-gray-600">
//                     <div><span className="font-bold text-gray-400">Holder:</span> {req.bankDetails?.accountHolderName}</div>
//                     <div><span className="font-bold text-gray-400">A/C No:</span> {req.bankDetails?.accountNumber}</div>
//                     <div><span className="font-bold text-gray-400">IFSC:</span> {req.bankDetails?.ifscCode}</div>
//                     <div className="italic text-purple-500">[{req.bankDetails?.bankName}]</div>
//                   </td>
                  
//                   {/* Status Badge */}
//                   <td className="p-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                       req.status === 'Approved' ? 'bg-green-100 text-green-700' :
//                       req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
//                     }`}>
//                       {req.status}
//                     </span>
//                   </td>
                  
//                   {/* Action Buttons */}
//                   <td className="p-4 text-center">
//                     {req.status === 'Pending' ? (
//                       <div className="flex justify-center gap-2">
//                         <button 
//                           onClick={() => handleStatusUpdate(req._id, 'Approved')} 
//                           className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition"
//                         >
//                           Approve ✅
//                         </button>
//                         <button 
//                           onClick={() => handleStatusUpdate(req._id, 'Rejected')} 
//                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition"
//                         >
//                           Reject ❌
//                         </button>
//                       </div>
//                     ) : (
//                       <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Processed</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
































































// 📄 src/pages/AdminPayouts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPayouts() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchPayoutRequests();
  }, []);

  const fetchPayoutRequests = async () => {
    try {
      // Saari requests admin ke liye fetch ho rahi hain
      const res = await axios.get('https://casex-backend-h0xv.onrender.com/api/payouts/admin/all', {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Requests fetch karne me error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Status ko Approve ya Reject karne ka function
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axios.put(`https://casex-backend-h0xv.onrender.com/api/payouts/admin/update/${id}`, 
        { 
          status: newStatus, 
          adminMessage: newStatus === 'Approved' ? 'Your payout has been processed successfully.' : 'Rejected by Admin.' 
        },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      
      alert(`🎉 Request successfully ${newStatus}!`);
      fetchPayoutRequests(); // List ko live reload karega page bina refresh kiye
    } catch (err) {
      console.error("Update failed:", err);
      alert("We couldn't update the status at the moment. Please try again later.");
    }
  };


  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-purple-600 selection:text-white">
      <div className="max-w-[97rem] mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Premium Header Banner */}
        <div className="bg-gradient-to-r from-[#8f0b54] to-[#500361] rounded-[28px] p-7 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-wider border border-white">
            Financial Ledger Console
          </span>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight mt-4 flex items-center gap-2">
            💰 Admin Payout Control Room
          </h2>
          <p className="text-s text-purple-200/80 mt-3 font-medium max-w-xl">
            Review withdrawal requests, manage vendor payouts, and track transaction status efficiently.
          </p>
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
              Fetching Payout Ledgers...
            </p>
          </div>
        ) : requests.length === 0 ? (
          /* Empty State Dashboard */
          <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-[24px] max-w-md mx-auto px-4">
            <span className="text-3xl block mb-2">👍</span>
            <p className="text-slate-400 text-s font-bold leading-relaxed uppercase tracking-wider">
              Settlements Up To Date
            </p>
            <p className="text-slate-400 text-xs mt-1">
              No pending payout requests at the moment.
            </p>
          </div>
        ) : (
          /* Responsive Main Data Container */
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden">
            
            {/* Desktop View Table (MD Screens and Above) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-400 font-black text-[11px] uppercase tracking-wider">
                    <th className="p-5">Vendor Info</th>
                    <th className="p-5">Amount Requested</th>
                    <th className="p-5">Bank Account Details</th>
                    <th className="p-5">Status</th>
                    <th className="p-5 text-center pr-8">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm font-semibold text-gray-700">
                  {requests.map((req) => (
                    <tr key={req._id} className="hover:bg-slate-50/40 transition duration-150">
                      {/* Vendor Meta */}
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-black border border-purple-100/40 shadow-inner">
                            {req.vendorId?.name ? req.vendorId.name.charAt(0).toUpperCase() : 'V'}
                          </div>
                          <div>
                            <div className="font-black text-slate-800 tracking-tight capitalize">
                              {req.vendorId?.name || "Unknown Vendor"}
                            </div>
                            <div className="text-xs font-mono text-slate-400 font-medium mt-0.5">
                              {req.vendorId?.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Amount Field */}
                      <td className="p-5">
                        <span className="text-purple-700 font-black text-base tracking-tight">
                          ₹{req.amount}
                        </span>
                      </td>

                      {/* Bank Specifications */}
                      <td className="p-5 text-xs text-slate-600 font-medium space-y-1">
                        <div><span className="font-bold text-slate-400">Holder:</span> {req.bankDetails?.accountHolderName}</div>
                        <div><span className="font-bold text-slate-400">A/C No:</span> <span className="font-mono">{req.bankDetails?.accountNumber}</span></div>
                        <div><span className="font-bold text-slate-400">IFSC:</span> <span className="font-mono text-purple-600 font-bold">{req.bankDetails?.ifscCode}</span></div>
                        <div className="text-[10px] font-black uppercase text-purple-500/80 tracking-wide pt-0.5">
                          🏛️ {req.bankDetails?.bankName}
                        </div>
                      </td>

                      {/* Dynamic Status Badges */}
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black rounded-full border ${
                          req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          req.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' : 
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          <span className="text-xs">
                            {req.status === 'Approved' ? '🟢' : req.status === 'Rejected' ? '🚫' : '⏳'}
                          </span>
                          {req.status}
                        </span>
                      </td>

                      {/* Control Panel Actions */}
                      <td className="p-5 text-center pr-8">
                        {req.status === 'Pending' ? (
                          <div className="inline-flex gap-2">
                            <button 
                              onClick={() => handleStatusUpdate(req._id, 'Approved')} 
                              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition duration-150"
                            >
                              Approve ✅
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(req._id, 'Rejected')} 
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition duration-150"
                            >
                              Reject ❌
                            </button>
                          </div>
                        ) : (
                          <span className="px-3 py-1 bg-slate-100 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
                            Processed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View Stack Cards Layout (Hidden on MD Screens) */}
            <div className="md:hidden divide-y divide-slate-100">
              {requests.map((req) => (
                <div key={req._id} className="p-5 space-y-4 hover:bg-slate-50/20 transition">
                  
                  {/* Vendor Info Header block */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-black shrink-0 shadow-inner">
                        {req.vendorId?.name ? req.vendorId.name.charAt(0).toUpperCase() : 'V'}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-slate-800 text-sm capitalize truncate tracking-tight">
                          {req.vendorId?.name || "Unknown Vendor"}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">{req.vendorId?.email}</p>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-black rounded-full border shrink-0 whitespace-nowrap ${
                      req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      req.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' : 
                      'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  {/* Pricing Matrix Breakdown & Bank Records */}
                  <div className="p-4 bg-slate-50/50 rounded-2xl space-y-3 border border-slate-100/40">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100/60">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Requested Funds</span>
                      <span className="text-purple-700 font-black text-lg tracking-tight">₹{req.amount}</span>
                    </div>

                    <div className="text-[11px] text-slate-600 font-medium space-y-1">
                      <div><span className="font-bold text-slate-400">Holder:</span> {req.bankDetails?.accountHolderName}</div>
                      <div><span className="font-bold text-slate-400">A/C No:</span> <span className="font-mono text-slate-800">{req.bankDetails?.accountNumber}</span></div>
                      <div><span className="font-bold text-slate-400">IFSC:</span> <span className="font-mono text-purple-600 font-bold">{req.bankDetails?.ifscCode}</span></div>
                      <div className="text-[10px] font-black uppercase text-purple-500 tracking-wide pt-1">
                        🏛️ {req.bankDetails?.bankName}
                      </div>
                    </div>
                  </div>

                  {/* Actions Touch Targets Grid */}
                  <div className="pt-2">
                    {req.status === 'Pending' ? (
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(req._id, 'Approved')} 
                          className="w-full py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center shadow-sm transition"
                        >
                          Approve ✅
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(req._id, 'Rejected')} 
                          className="w-full py-2.5 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center shadow-sm transition"
                        >
                          Reject ❌
                        </button>
                      </div>
                    ) : (
                      <div className="w-full py-2 bg-slate-50 text-slate-400 text-center rounded-xl text-xs font-black uppercase tracking-wider border border-slate-100">
                        Processed Asset Locked
                      </div>
                    )}
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