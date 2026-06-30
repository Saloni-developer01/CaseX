// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function AdminVendors() {
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   // 1. Fetch all vendors on component load
//   useEffect(() => {
//     const fetchVendors = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/admin/vendors', {
//           headers: { Authorization: `Bearer ${userInfo?.token}` }
//         });
//         setVendors(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.data?.message || "Vendors load nahi ho paaye");
//         setLoading(false);
//       }
//     };
//     if (userInfo?.token) fetchVendors();
//   }, []);

//   // 2. Toggle Block/Unblock Handler
//   const handleToggleBlock = async (vendorId, currentBlockedStatus) => {
//     const confirmMsg = currentBlockedStatus 
//       ? "Kya aap is Vendor ko UNBLOCK karna chahte hain?" 
//       : "🚨🚨🚨 Kya aap sach me is Vendor ko BLOCK karna chahte hain? Wo apna portal chalane ya login karne me asmarth ho jayega.";
    
//     if (!window.confirm(confirmMsg)) return;

//     try {
//       const res = await axios.put(`http://localhost:5000/api/admin/users/${vendorId}/block`, {}, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       alert(res.data.msg);
      
//       // Page reload kiye bina instant UI update:
//       setVendors(vendors.map(v => v._id === vendorId ? { ...v, isBlocked: !currentBlockedStatus } : v));
//     } catch (err) {
//       alert(err.response?.data?.message || "Block action failed");
//     }
//   };

//   // 3. Permanent Hard Delete Handler
//   const handleDeleteVendor = async (vendorId) => {
//     if (!window.confirm("⚠️ ATTENTION: Kya aap is vendor ko database se PERMANENTLY DELETE karna chahte hain? Iska poora data aur profile saaf ho jayegi!")) return;

//     try {
//       const res = await axios.delete(`http://localhost:5000/api/admin/users/${vendorId}`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       alert(res.data.msg);
      
//       // UI se filter out kardo taaki reload na karna pade
//       setVendors(vendors.filter(v => v._id !== vendorId));
//     } catch (err) {
//       alert(err.response?.data?.message || "Deletion failed");
//     }
//   };

//   if (loading) return <div className="p-6 text-center font-bold text-gray-500">Loading Vendors Control Room...</div>;
//   if (error) return <div className="p-6 text-center text-red-500 font-bold">⚠️ Error: {error}</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        
//         <h2 className="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
//           👩‍💼 Admin Vendor Verification & Control Room
//         </h2>

//         {vendors.length === 0 ? (
//           <p className="text-gray-500 text-center py-8 font-medium">Platform par abhi koi bhi vendor registered nahi hai.</p>
//         ) : (
//           <div className="overflow-x-auto rounded-2xl border border-gray-100">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-700 font-bold text-sm border-b">
//                   <th className="p-4">Vendor Name</th>
//                   <th className="p-4">Email</th>
//                   <th className="p-4">Status</th>
//                   <th className="p-4 text-center">Actions / Controls</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {vendors.map((vendor) => (
//                   <tr key={vendor._id} className="border-b last:border-b-0 hover:bg-slate-50 transition duration-200">
//                     <td className="p-4 font-bold text-gray-800 capitalize">{vendor.name}</td>
//                     <td className="p-4 text-sm text-gray-600">{vendor.email}</td>
//                     <td className="p-4">
//                       <span className={`px-3 py-1 text-xs font-black rounded-full ${
//                         vendor.isBlocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
//                       }`}>
//                         {vendor.isBlocked ? '🚫 Blocked' : '✅ Active'}
//                       </span>
//                     </td>
//                     <td className="p-4 flex justify-center gap-3">
//                       {/* Block/Unblock Button */}
//                       <button
//                         onClick={() => handleToggleBlock(vendor._id, vendor.isBlocked)}
//                         className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
//                           vendor.isBlocked 
//                             ? 'bg-amber-500 hover:bg-amber-600 text-white' 
//                             : 'bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600'
//                         }`}
//                       >
//                         {vendor.isBlocked ? '🔓 Unblock Account' : '🚫 Block Account'}
//                       </button>

//                       {/* Hard Delete Button */}
//                       <button
//                         onClick={() => handleDeleteVendor(vendor._id)}
//                         className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all duration-200 shadow-sm"
//                       >
//                         🗑️ Delete Permanently
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

























































import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // 1. Fetch all vendors on component load
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/vendors', {
          headers: { Authorization: `Bearer ${userInfo?.token}` }
        });
        setVendors(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Vendors load nahi ho paaye");
        setLoading(false);
      }
    };
    if (userInfo?.token) fetchVendors();
  }, []);

  // 2. Toggle Block/Unblock Handler
  const handleToggleBlock = async (vendorId, currentBlockedStatus) => {
    const confirmMsg = currentBlockedStatus 
      ? "⚠️ Are you sure you want to unblock this vendor? They will regain access to their account and platform features." 
      : "🚨🚨🚨 Are you sure you want to block this vendor? They will no longer be able to access their account or vendor portal.";
    
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/admin/users/${vendorId}/block`, {}, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      alert(res.data.msg);
      
      // Page reload kiye bina instant UI update:
      setVendors(vendors.map(v => v._id === vendorId ? { ...v, isBlocked: !currentBlockedStatus } : v));
    } catch (err) {
      alert(err.response?.data?.message || "Block action failed");
    }
  };

  // 3. Permanent Hard Delete Handler
  const handleDeleteVendor = async (vendorId) => {
    if (!window.confirm("⚠️ ATTENTION: Are you sure you want to permanently delete this vendor? All associated account data, products, and records will be removed and cannot be recovered.")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/users/${vendorId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      alert(res.data.msg);
      
      // UI se filter out kardo taaki reload na karna pade
      setVendors(vendors.filter(v => v._id !== vendorId));
    } catch (err) {
      alert(err.response?.data?.message || "Deletion failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white p-6">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
        </div>
        <p className="mt-4 text-sm font-bold text-gray-400 uppercase tracking-widest">Loading Control Room...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white p-4">
        <div className="bg-red-50 border border-red-100 rounded-3xl p-6 max-w-md w-full text-center shadow-sm">
          <span className="text-3xl block mb-2">⚠️</span>
          <h4 className="text-base font-black text-red-900">System Error Encountered</h4>
          <p className="text-red-600 text-xs font-medium mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-purple-600 selection:text-white">
      <div className="max-w-[97rem] mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Header Block */}
        <div className="bg-gradient-to-r from-purple-900 to-slate-900 rounded-[28px] p-6 text-white shadow-xl mb-8 relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition duration-500"></div>
          <div>
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
              Root Authority Privilege
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-3 flex items-center gap-2">
              👩‍💼 Vendor Verification & Control Center
            </h2>
            <p className="text-xs text-purple-200 mt-1 font-medium opacity-80">
              Manage cryptographic profiles, authorization access lists, and hard storage database parameters.
            </p>
          </div>
        </div>

        {vendors.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-3xl max-w-xl mx-auto px-4">
            <span className="text-3xl block mb-2">📦</span>
            <p className="text-gray-400 text-sm font-semibold leading-relaxed">
              Platform par abhi koi bhi vendor registered nahi hai.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
            
            {/* Desktop Table Layout (Visible on MD and larger screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-gray-100 text-slate-400 font-black text-[11px] uppercase tracking-wider">
                    <th className="p-5">Vendor Profile</th>
                    <th className="p-5">Email Address</th>
                    <th className="p-5">Operational Status</th>
                    <th className="p-5 text-right pr-8">Access Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {vendors.map((vendor) => (
                    <tr key={vendor._id} className="hover:bg-slate-50/50 transition duration-200 group">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-purple-50 text-purple-700 font-black text-sm rounded-xl flex items-center justify-center uppercase shadow-inner">
                            {vendor.name ? vendor.name.slice(0, 2) : 'VN'}
                          </div>
                          <span className="font-black text-slate-800 text-sm capitalize tracking-tight">
                            {vendor.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-5 text-xs font-mono text-slate-500 font-medium">
                        {vendor.email}
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black rounded-full border ${
                          vendor.isBlocked 
                            ? 'bg-red-50 text-red-600 border-red-100' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          <span className="text-xs">{vendor.isBlocked ? '🚫' : '🟢'}</span>
                          {vendor.isBlocked ? 'Blocked' : 'Active Account'}
                        </span>
                      </td>
                      <td className="p-5 text-right pr-8">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleToggleBlock(vendor._id, vendor.isBlocked)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                              vendor.isBlocked 
                                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm' 
                                : 'bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-transparent hover:border-red-100'
                            }`}
                          >
                            {vendor.isBlocked ? '🔓 Unblock' : '🚫 Block'}
                          </button>

                          <button
                            onClick={() => handleDeleteVendor(vendor._id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-sm"
                          >
                            🗑️ Hard Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Stack View (Visible only on smaller screens) */}
            <div className="md:hidden divide-y divide-gray-100">
              {vendors.map((vendor) => (
                <div key={vendor._id} className="p-5 bg-white space-y-4 hover:bg-slate-50/30 transition">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 text-purple-700 font-black text-sm rounded-xl flex items-center justify-center uppercase shadow-inner shrink-0">
                        {vendor.name ? vendor.name.slice(0, 2) : 'VN'}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-slate-800 text-sm capitalize truncate tracking-tight">{vendor.name}</h4>
                        <p className="text-[11px] font-mono text-gray-400 truncate mt-0.5">{vendor.email}</p>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-black rounded-full border shrink-0 whitespace-nowrap ${
                      vendor.isBlocked 
                        ? 'bg-red-50 text-red-600 border-red-100' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {vendor.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
                    <button
                      onClick={() => handleToggleBlock(vendor._id, vendor.isBlocked)}
                      className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all ${
                        vendor.isBlocked 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {vendor.isBlocked ? '🔓 Unblock' : '🚫 Block'}
                    </button>

                    <button
                      onClick={() => handleDeleteVendor(vendor._id)}
                      className="w-full py-2.5 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all"
                    >
                      🗑️ Delete
                    </button>
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