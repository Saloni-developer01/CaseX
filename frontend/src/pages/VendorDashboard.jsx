// import React, { useState, useEffect } from 'react';
// import { requestPayoutAPI, getMyPayoutsAPI } from '../services/api';
// import { useLocation } from 'react-router-dom';

// export default function VendorDashboard() {
// const location = useLocation();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   const [showModal, setShowModal] = useState(false);
//   const [history, setHistory] = useState([]);
  
//   // Form fields
//   const [amount, setAmount] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const [ifscCode, setIfscCode] = useState('');
//   const [accountHolderName, setAccountHolderName] = useState('');
//   const [bankName, setBankName] = useState('');

//   // Example total earning (Isse tum apne logic se dynamic fetch kar rahe hoge)
// const dynamicBalance = location.state?.currentBalance || "0.00";

//   useEffect(() => {
//     fetchPayoutHistory();
//   }, []);

//   const fetchPayoutHistory = async () => {
//     try {
//       const res = await getMyPayoutsAPI(userInfo.token);
//       setHistory(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePayoutSubmit = async (e) => {
//     e.preventDefault();
//     if (Number(amount) > dynamicBalance) {
//       return alert("Aapke wallet mein itna balance nahi hai!");
//     }

//     try {
//       const payload = { amount, accountNumber, ifscCode, accountHolderName, bankName };
//       await requestPayoutAPI(payload, userInfo.token);
//       alert("🎉 Payout Request Sent Successfully!");
//       setShowModal(false);
//       fetchPayoutHistory(); // History refresh karo
//     } catch (err) {
//       alert(err.response?.data?.message || "Request failed");
//     }
//   };

//   return (
//     <div className="p-8 max-w-6xl mx-auto space-y-8">
//       {/* Wallet Card */}
//       <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center">
//         <div>
//           <p className="text-purple-200 text-sm font-semibold uppercase tracking-wider">Total Earnings Balance</p>
//           <h2 className="text-4xl font-black mt-1">₹{dynamicBalance}</h2>
//         </div>
//         <button 
//           onClick={() => setShowModal(true)}
//           className="bg-white text-purple-700 font-black px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
//         >
//           💰 Withdraw Money
//         </button>
//       </div>

//       {/* Request Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <form onSubmit={handlePayoutSubmit} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
//             <h3 className="text-xl font-black text-gray-800">Bank Account Details</h3>
            
//             <input type="number" required placeholder="Amount (Min ₹100)" className="w-full p-3 border rounded-xl" value={amount} onChange={(e) => setAmount(e.target.value)} />
//             <input type="text" required placeholder="Account Holder Name" className="w-full p-3 border rounded-xl" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
//             <input type="text" required placeholder="Account Number" className="w-full p-3 border rounded-xl" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
//             <input type="text" required placeholder="IFSC Code" className="w-full p-3 border rounded-xl" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
//             <input type="text" required placeholder="Bank Name (e.g. SBI, HDFC)" className="w-full p-3 border rounded-xl" value={bankName} onChange={(e) => setBankName(e.target.value)} />

//             <div className="flex gap-3 pt-2">
//               <button type="button" onClick={() => setShowModal(false)} className="w-1/2 py-3 bg-gray-100 rounded-xl font-bold text-gray-500">Cancel</button>
//               <button type="submit" className="w-1/2 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-md hover:bg-purple-700">Submit Request</button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Payout History Table */}
//       <div className="bg-white border rounded-3xl p-6 shadow-sm">
//         <h3 className="text-lg font-black text-gray-800 mb-4">Payout History</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b text-gray-400 text-xs uppercase font-bold">
//                 <th className="pb-3">Date</th>
//                 <th className="pb-3">Amount</th>
//                 <th className="pb-3">Bank Details</th>
//                 <th className="pb-3">Status</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm font-semibold text-gray-600">
//               {history.map((req) => (
//                 <tr key={req._id} className="border-b last:border-0">
//                   <td className="py-4">{new Date(req.createdAt).toLocaleDateString()}</td>
//                   <td className="py-4 text-purple-600 font-bold">₹{req.amount}</td>
//                   <td className="py-4 text-xs">
//                     {req.bankDetails.bankName} ({req.bankDetails.accountNumber.slice(-4)})
//                   </td>
//                   <td className="py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                       req.status === 'Approved' ? 'bg-green-100 text-green-700' :
//                       req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
//                     }`}>
//                       {req.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
































































// 📄 src/pages/VendorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { requestPayoutAPI, getMyPayoutsAPI } from '../services/api';
import { useLocation } from 'react-router-dom';

export default function VendorDashboard() {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [showModal, setShowModal] = useState(false);
  const [history, setHistory] = useState([]);
  
  // Form fields
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankName, setBankName] = useState('');

  // Example total earning
  const dynamicBalance = location.state?.currentBalance || "0.00";

  useEffect(() => {
    fetchPayoutHistory();
  }, []);

  const fetchPayoutHistory = async () => {
    try {
      const res = await getMyPayoutsAPI(userInfo.token);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePayoutSubmit = async (e) => {
    e.preventDefault();
    if (Number(amount) > dynamicBalance) {
      return alert("Insufficient wallet balance for this withdrawal request.");
    }

    try {
      const payload = { amount, accountNumber, ifscCode, accountHolderName, bankName };
      await requestPayoutAPI(payload, userInfo.token);
      alert("🎉 Payout Request Sent Successfully!");
      setShowModal(false);
      
      // Clear Form Fields after successful submission
      setAmount('');
      setAccountHolderName('');
      setAccountNumber('');
      setIfscCode('');
      setBankName('');
      
      fetchPayoutHistory(); // History refresh karo
    } catch (err) {
      alert(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="bg-white min-h-screen pb-12 selection:bg-purple-600 selection:text-white">
      <div className="max-w-[98rem] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Premium Wallet Earnings Card */}
        <div className="bg-gradient-to-r from-[#8f0b54] to-[#500361] rounded-[28px] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="absolute right-0 top-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="space-y-1">
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-black uppercase tracking-wider border border-white">
              Secure Vendor Ledger
            </span>
            <p className="text-purple-200/70 text-xs font-bold uppercase tracking-widest pt-3">Total Earnings Balance</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-0.5">₹{dynamicBalance}</h2>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-purple-950 font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md hover:bg-purple-50 transition-all duration-200 self-start sm:self-center border border-slate-100 flex items-center gap-2 active:scale-95"
          >
            💰 Withdraw Money
          </button>
        </div>

        {/* Request Modal Sheet */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
            <form 
              onSubmit={handlePayoutSubmit} 
              className="bg-white rounded-[28px] p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 transform scale-100 transition-all"
            >
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Bank Account Details</h3>
                <p className="text-[14px] text-slate-400 font-semibold mt-0.5">Enter your payout details to request a withdrawal.</p>
              </div>
              
              <div className="space-y-3 pt-2">
                <input 
                  type="number" 
                  required 
                  placeholder="Amount (Min ₹100)" 
                  className="w-full p-3 bg-slate-50 border border-slate-100 focus:border-purple-500 focus:bg-white rounded-xl text-s font-bold outline-none transition" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                />
                <input 
                  type="text" 
                  required 
                  placeholder="Account Holder Name" 
                  className="w-full p-3 bg-slate-50 border border-slate-100 focus:border-purple-500 focus:bg-white rounded-xl text-s font-bold outline-none transition capitalize" 
                  value={accountHolderName} 
                  onChange={(e) => setAccountHolderName(e.target.value)} 
                />
                <input 
                  type="text" 
                  required 
                  placeholder="Account Number" 
                  className="w-full p-3 bg-slate-50 border border-slate-100 focus:border-purple-500 focus:bg-white rounded-xl text-s font-bold font-mono outline-none transition" 
                  value={accountNumber} 
                  onChange={(e) => setAccountNumber(e.target.value)} 
                />
                <input 
                  type="text" 
                  required 
                  placeholder="IFSC Code" 
                  className="w-full p-3 bg-slate-50 border border-slate-100 focus:border-purple-500 focus:bg-white rounded-xl text-s font-black font-mono uppercase tracking-wider outline-none transition" 
                  value={ifscCode} 
                  onChange={(e) => setIfscCode(e.target.value)} 
                />
                <input 
                  type="text" 
                  required 
                  placeholder="Bank Name (e.g. SBI, HDFC)" 
                  className="w-full p-3 bg-slate-50 border border-slate-100 focus:border-purple-500 focus:bg-white rounded-xl text-xs font-bold outline-none transition uppercase" 
                  value={bankName} 
                  onChange={(e) => setBankName(e.target.value)} 
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200/70 text-slate-500 rounded-xl font-black text-xs uppercase tracking-wider transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-3 bg-gradient-to-r from-[#8f0b54] to-[#500361] hover:bg-purple-700 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md shadow-purple-200 transition"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Payout History Ledger System */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div>
            <h3 className="text-base text-[18px] font-black text-slate-800 tracking-tight">Payout History</h3>
            <p className="text-[14px] text-slate-400 font-semibold mt-0.5">View all your withdrawal requests and payout history in one place.</p>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-100 rounded-[20px] bg-slate-50/40">
              <span className="text-2xl block mb-1">📭</span>
              <p className="text-slate-400 text-s font-black uppercase tracking-wider">No Settlement Transactions</p>
              <p className="text-slate-400 text-[12px] mt-0.5">You haven't submitted any withdrawal requests yet.</p>
            </div>
          ) : (
            <div className="border border-slate-50 rounded-2xl overflow-hidden">
              
              {/* Desktop Structural Table (MD screens and above) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse m-0">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-400 font-black text-[11px] uppercase tracking-wider">
                      <th className="p-4">Settlement Date</th>
                      <th className="p-4">Amount Requested</th>
                      <th className="p-4">Linked Bank Channel</th>
                      <th className="p-4 pr-6">Status Pipeline</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-semibold text-slate-700 divide-y divide-slate-50">
                    {history.map((req) => (
                      <tr key={req._id} className="hover:bg-slate-50/40 transition duration-150">
                        <td className="p-4 text-xs font-mono text-slate-400 font-medium">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span className="text-purple-700 font-black tracking-tight">₹{req.amount}</span>
                        </td>
                        <td className="p-4 text-xs text-slate-600 font-medium">
                          <span className="uppercase text-slate-800 font-black">{req.bankDetails?.bankName}</span> 
                          <span className="text-slate-400 font-mono font-medium ml-1.5">
                            (•••• {req.bankDetails?.accountNumber?.slice(-4) || "0000"})
                          </span>
                        </td>
                        <td className="p-4 pr-6">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout Structure (Hidden on MD screens) */}
              <div className="md:hidden divide-y divide-slate-100 bg-white">
                {history.map((req) => (
                  <div key={req._id} className="p-4 space-y-3.5 hover:bg-slate-50/10 transition">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[9px] font-black rounded-full border ${
                        req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        req.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' : 
                        'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Disbursement Channel</p>
                        <p className="text-xs text-slate-700 font-bold mt-0.5">
                          <span className="uppercase font-black text-slate-800">{req.bankDetails?.bankName}</span>
                          <span className="font-mono text-slate-400 ml-1">
                            (••{req.bankDetails?.accountNumber?.slice(-4) || "0000"})
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-purple-700 font-black text-base tracking-tight">₹{req.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}