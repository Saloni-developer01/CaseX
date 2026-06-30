// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function AdminUsersManager() {
//   const [activeTab, setActiveTab] = useState('vendors'); // 'vendors' ya 'customers'
//   const [usersList, setUsersList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   // Fetch users function
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const endpoint = activeTab === 'vendors' ? 'vendors' : 'customers';
//       // 🌟 FIXED: URL changed from /api/admin to /api/auth to match your server.js mount
//       const res = await axios.get(`http://localhost:5000/api/auth/${endpoint}`, {
//         headers: { Authorization: `Bearer ${userInfo?.token}` }
//       });
//       setUsersList(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || `Data load nahi ho paya. Endpoint check karein.`);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userInfo?.token) {
//       fetchUsers();
//     }
//   }, [activeTab]);

//   // Toggle Block Action
//   const handleToggleBlock = async (userId, currentBlockedStatus) => {
//     const targetType = activeTab === 'vendors' ? 'Vendor' : 'Customer';
//     const confirmMsg = currentBlockedStatus 
//       ? `Kya aap is ${targetType} ko UNBLOCK karna chahte hain?` 
//       : `🚨 Kya aap is ${targetType} ko BLOCK karna chahte hain? Ye user login ya portal use nahi kar payega!`;
    
//     if (!window.confirm(confirmMsg)) return;

//     try {
//       // 🌟 FIXED: URL changed to match authRoutes system
//       const res = await axios.put(`http://localhost:5000/api/auth/users/${userId}/block`, {}, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       alert(res.data.msg);
      
//       // Instant State Update without full page reload
//       setUsersList(usersList.map(u => u._id === userId ? { ...u, isBlocked: !currentBlockedStatus } : u));
//     } catch (err) {
//       alert(err.response?.data?.message || "Action failed");
//     }
//   };

//   // Hard Delete Action
//   const handleDeleteUser = async (userId) => {
//     const targetType = activeTab === 'vendors' ? 'Vendor' : 'Customer';
//     if (!window.confirm(`⚠️ ATTENTION: Kya aap is ${targetType} ko PERMANENTLY DELETE karna chahte hain? Saara data hamesha ke liye saaf ho jayega.`)) return;

//     try {
//       // 🌟 FIXED: URL changed to match authRoutes system
//       const res = await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });
//       alert(res.data.msg);
      
//       // Filter out deleted user from UI state instantly
//       setUsersList(usersList.filter(u => u._id !== userId));
//     } catch (err) {
//       alert(err.response?.data?.message || "Deletion failed");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen font-sans">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
        
//         {/* Header Title */}
//         <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
//           🛡️ Admin Control Center: Management Room
//         </h2>

//         {/* Tab Buttons System */}
//         <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
//           <button
//             onClick={() => setActiveTab('vendors')}
//             className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
//               activeTab === 'vendors' 
//                 ? 'bg-purple-600 text-white shadow-md' 
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             🏪 Registered Vendors ({activeTab === 'vendors' ? usersList.length : '...'})
//           </button>
          
//           <button
//             onClick={() => setActiveTab('customers')}
//             className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
//               activeTab === 'customers' 
//                 ? 'bg-purple-600 text-white shadow-md' 
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             🛍️ Active Customers ({activeTab === 'customers' ? usersList.length : '...'})
//           </button>
//         </div>

//         {/* Dynamic Content States */}
//         {loading ? (
//           <div className="p-12 text-center font-bold text-purple-600 animate-pulse">
//             🔄 Fetching latest system records...
//           </div>
//         ) : error ? (
//           <div className="p-6 text-center text-red-500 font-bold bg-red-50 rounded-2xl border border-red-100">
//             ⚠️ Error: {error}
//           </div>
//         ) : usersList.length === 0 ? (
//           <p className="text-gray-400 text-center py-12 font-medium">
//             Platform par koi bhi {activeTab === 'vendors' ? 'vendor' : 'customer'} registered nahi mila.
//           </p>
//         ) : (
//           <div className="overflow-x-auto rounded-2xl border border-gray-100">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider border-b">
//                   <th className="p-4">Name</th>
//                   <th className="p-4">Email Address</th>
//                   <th className="p-4">Account Status</th>
//                   <th className="p-4 text-center">Safety Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {usersList.map((user) => (
//                   <tr key={user._id} className="border-b last:border-b-0 hover:bg-slate-50/80 transition duration-150">
//                     <td className="p-4 font-bold text-gray-800 capitalize flex items-center gap-2">
//                       <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-black">
//                         {/* {user.name ? user.name.charAt(0) : 'U'} */}
//                         {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
//                       </div>
//                       {/* {user.name} */}
//                       {user.name || "Unknown User"}
//                     </td>
//                     <td className="p-4 text-sm text-gray-600 font-medium">{user.email}</td>
//                     <td className="p-4">
//                       <span className={`px-3 py-1 text-xs font-black rounded-full inline-block ${
//                         user.isBlocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
//                       }`}>
//                         {user.isBlocked ? '🚫 Blocked' : '✅ Active'}
//                       </span>
//                     </td>
//                     <td className="p-4 flex justify-center gap-3">
//                       {/* Toggle Block Button */}
//                       <button
//                         onClick={() => handleToggleBlock(user._id, user.isBlocked)}
//                         className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 ${
//                           user.isBlocked 
//                             ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm' 
//                             : 'bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200'
//                         }`}
//                       >
//                         {user.isBlocked ? '🔓 Unblock' : '🚫 Block Account'}
//                       </button>

//                       {/* Delete Button */}
//                       <button
//                         onClick={() => handleDeleteUser(user._id)}
//                         className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all duration-150 shadow-sm"
//                       >
//                         🗑️ Delete
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

export default function AdminUsersManager() {
  const [activeTab, setActiveTab] = useState('vendors'); // 'vendors' ya 'customers'
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Fetch users function
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = activeTab === 'vendors' ? 'vendors' : 'customers';
      // 🌟 FIXED: URL changed from /api/admin to /api/auth to match your server.js mount
      const res = await axios.get(`http://localhost:5000/api/auth/${endpoint}`, {
        headers: { Authorization: `Bearer ${userInfo?.token}` }
      });
      setUsersList(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || `Data load nahi ho paya. Endpoint check karein.`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.token) {
      fetchUsers();
    }
  }, [activeTab]);

  // Toggle Block Action
  const handleToggleBlock = async (userId, currentBlockedStatus) => {
    const targetType = activeTab === 'vendors' ? 'Vendor' : 'Customer';
    const confirmMsg = currentBlockedStatus 
      ? `⚠️ Are you sure you want to unblock this ${targetType}? They will regain access to their account and platform features.` 
      : `🚨 Are you sure you want to block this ${targetType}? They will no longer be able to log in or access the platform.`;
    
    if (!window.confirm(confirmMsg)) return;

    try {
      // 🌟 FIXED: URL changed to match authRoutes system
      const res = await axios.put(`http://localhost:5000/api/auth/users/${userId}/block`, {}, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      alert(res.data.msg);
      
      // Instant State Update without full page reload
      setUsersList(usersList.map(u => u._id === userId ? { ...u, isBlocked: !currentBlockedStatus } : u));
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  // Hard Delete Action
  const handleDeleteUser = async (userId) => {
    const targetType = activeTab === 'vendors' ? 'Vendor' : 'Customer';
    if (!window.confirm(`⚠️ ATTENTION: Kya aap is ${targetType} ko PERMANENTLY DELETE karna chahte hain? Saara data hamesha ke liye saaf ho jayega.`)) return;

    try {
      // 🌟 FIXED: URL changed to match authRoutes system
      const res = await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      alert(res.data.msg);
      
      // Filter out deleted user from UI state instantly
      setUsersList(usersList.filter(u => u._id !== userId));
    } catch (err) {
      alert(err.response?.data?.message || "Deletion failed");
    }
  };

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-purple-600 selection:text-white">
      <div className="max-w-[98rem] mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Core Header Banner */}
        <div className="bg-gradient-to-r from-[#8f0b54] to-[#500361] rounded-[28px] p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-wider border ">
            Security Control Terminal
          </span>
          <h2 className="text-xl sm:text-4xl font-black tracking-tight mt-5 flex items-center gap-2">
            🛡️ Admin Control Center: Management Room
          </h2>
          <p className="text-s text-purple-200/80 mt-3 font-medium max-w-xl">
            Manage customers and vendors, monitor activity, control access permissions, and maintain a secure marketplace from one place.
          </p>
        </div>

        {/* Tab Buttons System Layout */}
        <div className="flex flex-wrap gap-2.5 mb-6 bg-slate-50 p-1.5 rounded-2xl w-max max-w-full">
          <button
            onClick={() => setActiveTab('vendors')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 ${
              activeTab === 'vendors' 
                ? 'border border-[#8f0b54] text-[#8f0b54] shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🏪 Registered Vendors ({activeTab === 'vendors' && !loading ? usersList.length : '...'})
          </button>
          
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 ${
              activeTab === 'customers' 
                ? 'border border-[#8f0b54] text-[#8f0b54] shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🛍️ Active Customers ({activeTab === 'customers' && !loading ? usersList.length : '...'})
          </button>
        </div>

        {/* Dynamic Content States Area */}
        {loading ? (
          /* Inline Content Loader - Ab header aur tabs apni jagah stay karenge! */
          <div className="p-12 text-center font-bold text-purple-600 animate-pulse">
             🔄 Fetching latest system records...
          </div>
        ) : error ? (
          /* Inline Content Error Container */
          <div className="min-h-[250px] flex items-center justify-center bg-white p-4">
            <div className="bg-red-50 border border-red-100 rounded-[24px] p-6 max-w-md w-full text-center shadow-sm">
              <span className="text-2xl block mb-2">⚠️</span>
              <h4 className="text-sm font-black text-red-900">System Pipeline Error</h4>
              <p className="text-red-600 text-xs font-semibold mt-1">{error}</p>
            </div>
          </div>
        ) : usersList.length === 0 ? (
          /* Empty Records Container */
          <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-[24px] max-w-md mx-auto px-4">
            <span className="text-3xl block mb-2">📭</span>
            <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-wider">
              No Profile Records Found
            </p>
            <p className="text-slate-400 text-xs mt-1">
              No {activeTab === 'vendors' ? 'vendor' : 'customer'} have joined the platform yet.
            </p>
          </div>
        ) : (
          /* Main Responsive Container */
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden">
            
            {/* Desktop View Table (MD screens and above) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse m-0">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-400 font-black text-[13px] uppercase tracking-wider">
                    <th className="p-5">Account Name</th>
                    <th className="p-5">Email Address</th>
                    <th className="p-5">Account Status</th>
                    <th className="p-5 text-center pr-8">Safety Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {usersList.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/40 transition duration-150">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-black border border-purple-100/40 shadow-inner">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <span className="font-black text-slate-800 text-s capitalize tracking-tight">
                            {user.name || "Unknown User"}
                          </span>
                        </div>
                      </td>
                      <td className="p-5 text-s font-mono text-slate-500 font-medium">
                        {user.email}
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[13px] font-black rounded-full border ${
                          user.isBlocked ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          <span className="text-s">{user.isBlocked ? '🚫' : '🟢'}</span>
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="p-5 text-center pr-8">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 ${
                              user.isBlocked 
                                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm' 
                                : 'bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-transparent hover:border-red-100'
                            }`}
                          >
                            {user.isBlocked ? '🔓 Unblock' : '🚫 Block'}
                          </button>

                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 shadow-sm"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View Stack Cards (Hidden on MD screens) */}
            <div className="md:hidden divide-y divide-slate-100">
              {usersList.map((user) => (
                <div key={user._id} className="p-5 space-y-4 hover:bg-slate-50/20 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-black shrink-0 shadow-inner">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-slate-800 text-sm capitalize truncate tracking-tight">
                          {user.name || "Unknown User"}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">{user.email}</p>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-black rounded-full border shrink-0 whitespace-nowrap ${
                      user.isBlocked ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>

                  {/* Actions Grid for Touch Targets */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                    <button
                      onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                      className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all ${
                        user.isBlocked ? 'bg-amber-500 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {user.isBlocked ? '🔓 Unblock' : '🚫 Block'}
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="w-full py-2.5 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-sm"
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