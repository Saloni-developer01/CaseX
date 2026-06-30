// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function SubscriptionPayment() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   // Agar user logged in nahi hai, toh use block kar do
//   if (!userInfo) {
//     return <div className="text-center p-12 font-bold text-red-500">🔒 Access Denied! Please login first.</div>;
//   }

//   // const handleSubscriptionPayment = async () => {
//   //   setLoading(true);
//   //   setError('');

//   //   try {
//   //     // 1. Backend par Razorpay subscription order intent create karna
//   //     // Note: Hum abhi ke liye vahi orders endpoint ya dedicated subscription endpoint trigger kar sakte hain
//   //     const { data } = await axios.post('http://localhost:5000/api/orders/razorpay', {
//   //       amount: 499 // Monthly subscription fees ₹499 fixed
//   //     }, {
//   //       headers: { Authorization: `Bearer ${userInfo.token}` }
//   //     });

//   //     // 2. Razorpay Checkout Options configure karna
//   //     const options = {
//   //       key: "rzp_test_SzVtRBXAWOvYNT", // Yahan apna Razorpay Test Key daalna
//   //       amount: data.amount,
//   //       currency: data.currency,
//   //       name: "CaseX Premium Seller Hub",
//   //       description: "Monthly Vendor Subscription Pass",
//   //       image: "https://via.placeholder.com/100", // Aapka logo
//   //       order_id: data.id,
//   //       handler: async function (response) {
//   //         try {
//   //           // 3. Payment verification ke liye backend API call
//   //           // SubscriptionPayment.jsx ke andar verify-subscription body ko aise update karein:
//   //           const verifyRes = await axios.post('http://localhost:5000/api/orders/verify-subscription', {
//   //             razorpay_order_id: response.razorpay_order_id,
//   //             razorpay_payment_id: response.razorpay_payment_id,
//   //             razorpay_signature: response.razorpay_signature,
//   //             vendorEmail: userInfo.email // 🌟 Yeh line email supply karegi backend ko
//   //           }, {
//   //             headers: { Authorization: `Bearer ${userInfo.token}` }
//   //           });

//   //           if (verifyRes.status === 200) {
//   //             // 4. LocalStorage update karna taaki UI immediate change ho jaye
//   //             const updatedUserInfo = { ...userInfo, isSubscribed: true };
//   //             localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
              
//   //             alert('🎉 Payment Successful! Your Vendor Account is now Activated.');
//   //             navigate('/dashboard'); // Direct dashboard bhejo jahan "+ Add My Product" active milega
//   //           }
//   //         } catch (err) {
//   //           console.error("Verification failed:", err);
//   //           setError("Payment verify nahi ho payi. Please support se contact karein.");
//   //         }
//   //       },
//   //       prefill: {
//   //         name: userInfo.name,
//   //         email: userInfo.email,
//   //         contact: "9999999999"
//   //       },
//   //       theme: {
//   //         color: "#d97706" // Amber-500 brand theme color matching with active bar
//   //       }
//   //     };

//   //     const rzp = new window.Razorpay(options);
//   //     rzp.open();

//   //   } catch (err) {
//   //     console.error("Subscription initiation error:", err);
//   //     setError(err.response?.data?.message || "Razorpay gateway initialize nahi ho paya.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };




//   const handleSubscriptionPayment = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       // 🌟 FIXED ROUTE: Humne dedicated subscription intent endpoint ko hit kiya
//       const { data } = await axios.post('http://localhost:5000/api/orders/razorpay-subscription', {
//         amount: 499 
//       }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });

//       const options = {
//         key: "rzp_test_SzVtRBXAWOvYNT", 
//         amount: data.amount,
//         currency: data.currency,
//         name: "CaseX Premium Seller Hub",
//         description: "Monthly Vendor Subscription Pass",
//         image: "https://via.placeholder.com/100", 
//         order_id: data.id,
//         handler: async function (response) {
//           try {
//             const verifyRes = await axios.post('http://localhost:5000/api/orders/verify-subscription', {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               vendorEmail: userInfo.email 
//             }, {
//               headers: { Authorization: `Bearer ${userInfo.token}` }
//             });

//             if (verifyRes.status === 200) {
//               // LocalStorage update with subscription data
//               const updatedUserInfo = { 
//                 ...userInfo, 
//                 isSubscribed: true,
//                 subscriptionStatus: 'active'
//               };
//               localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
              
//               alert('🎉 Payment Successful! Your Vendor Account is now Activated.');
//               navigate('/dashboard'); 
//             }
//           } catch (err) {
//             console.error("Verification failed:", err);
//             setError("Payment verify nahi ho payi. Please support se contact karein.");
//           }
//         },
//         prefill: {
//           name: userInfo.name,
//           email: userInfo.email,
//           contact: "9999999999"
//         },
//         theme: {
//           color: "#d97706" 
//         }
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();

//     } catch (err) {
//       console.error("Subscription initiation error:", err);
//       setError(err.response?.data?.message || "Razorpay gateway initialize nahi ho paya.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 my-12">
      
//       {/* Upper Status Bar */}
//       <div className="text-center space-y-3 mb-10">
//         <span className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
//           Premium Shop Verification Required
//         </span>
//         <h2 className="text-3xl font-black text-gray-800 tracking-tight">Activate Your CaseX Digital Dukaan 🏬</h2>
//         <p className="text-sm text-gray-400 max-w-md mx-auto">
//           Flipkart seller model ki tarah apna vendor account active kariye, automatic product live kijiye aur orders aane par 100% payout paayein.
//         </p>
//       </div>

//       {/* Pricing Card Setup */}
//       <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-5">
        
//         {/* Left Side: Features Details */}
//         <div className="p-8 md:col-span-3 space-y-6">
//           <h3 className="font-bold text-gray-800 text-lg">Vendor Feature Perks:</h3>
          
//           <ul className="space-y-4">
//             <li className="flex items-start gap-3 text-sm text-gray-600">
//               <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
//               <div>
//                 <strong className="text-gray-800 block">Unlimited Product Uploads</strong>
//                 Aap jitne chahein utne custom phone cases or 3D models setup list kar sakte hain.
//               </div>
//             </li>
//             <li className="flex items-start gap-3 text-sm text-gray-600">
//               <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
//               <div>
//                 <strong className="text-gray-800 block">Personal Incoming Shop Orders Panel</strong>
//                 Direct customers ke delivery addresses aur custom specs aapke portal par load honge.
//               </div>
//             </li>
//             <li className="flex items-start gap-3 text-sm text-gray-600">
//               <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
//               <div>
//                 <strong className="text-gray-800 block">0% Commission on Initial Sales</strong>
//                 SaaS model pass active hone par direct pure earning payout direct aapke account mein transfer hoga.
//               </div>
//             </li>
//           </ul>
//         </div>

//         {/* Right Side: Pricing Action Call */}
//         <div className="bg-gray-50/70 border-t md:border-t-0 md:border-l border-gray-100 p-8 flex flex-col justify-center items-center text-center md:col-span-2">
//           <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Monthly Pass</span>
//           <div className="my-3">
//             <span className="text-4xl font-black text-gray-900">₹499</span>
//             <span className="text-xs text-gray-400 font-semibold"> /month</span>
//           </div>
//           <p className="text-[11px] text-gray-400 mb-6">Cancel or update plan dynamically anytime from settings.</p>

//           {error && <p className="text-xs text-red-500 font-semibold mb-3">{error}</p>}

//           <button
//             onClick={handleSubscriptionPayment}
//             disabled={loading}
//             className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-2xl transition shadow-md shadow-amber-500/20 disabled:opacity-50 text-sm"
//           >
//             {loading ? 'Processing Gateway...' : '🔒 Unlock My Shop Now'}
//           </button>
//         </div>

//       </div>

//     </div>
//   );
// }














































import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SubscriptionPayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Agar user logged in nahi hai, toh use block kar do
  if (!userInfo) {
    return <div className="text-center p-12 font-bold text-red-500">🔒 Access Denied! Please login first.</div>;
  }

  const handleSubscriptionPayment = async () => {
    setLoading(true);
    setError('');

    try {
      // 🌟 FIXED ROUTE: Humne dedicated subscription intent endpoint ko hit kiya
      const { data } = await axios.post('http://localhost:5000/api/orders/razorpay-subscription', {
        amount: 499 
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });

      const options = {
        key: "rzp_test_SzVtRBXAWOvYNT", 
        amount: data.amount,
        currency: data.currency,
        name: "CaseX Premium Seller Hub",
        description: "Monthly Vendor Subscription Pass",
        image: "https://via.placeholder.com/100", 
        order_id: data.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post('http://localhost:5000/api/orders/verify-subscription', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              vendorEmail: userInfo.email 
            }, {
              headers: { Authorization: `Bearer ${userInfo.token}` }
            });

            if (verifyRes.status === 200) {
              // 🌟 FIX: LocalStorage update with precise subscription status
              // const updatedUserInfo = { 
              //   ...userInfo, 
              //   isSubscribed: true,
              //   subscriptionStatus: 'active',
              // };
              const updatedUserInfo = { 
    ...userInfo, 
    isSubscribed: verifyRes.data.user.isSubscribed,
    subscriptionStatus: verifyRes.data.user.subscriptionStatus,
    subscriptionStartedAt: verifyRes.data.user.subscriptionStartedAt,
    subscriptionExpiresAt: verifyRes.data.user.subscriptionExpiresAt, // 🔥 Yeh sabse zaroori tha
  };
              localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
              
              alert('🎉 Payment Successful! Your Vendor Account is now Activated.');
              
              // 🌟 CRITICAL FIX: Direct navigation ke sath window.location.href use karenge 
              // taaki state seamlessly completely reset aur block-free ho jaye!
              window.location.href = '/'; 
            }
          } catch (err) {
            console.error("Verification failed:", err);
            setError("Payment verify nahi ho payi. Please support se contact karein.");
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: "9999999999"
        },
        theme: {
          color: "#d97706" 
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Subscription initiation error:", err);
      setError(err.response?.data?.message || "Razorpay gateway initialize nahi ho paya.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="max-w-3xl mx-auto p-6 my-12">
      
    //   {/* Upper Status Bar */}
    //   <div className="text-center space-y-3 mb-10">
    //     <span className="bg-amber-100 text-amber-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
    //       Premium Shop Verification Required
    //     </span>
    //     <h2 className="text-3xl font-black text-gray-800 tracking-tight">Activate Your CaseX Digital Dukaan 🏬</h2>
    //     <p className="text-sm text-gray-400 max-w-md mx-auto">
    //       Flipkart seller model ki tarah apna vendor account active kaerke, automatic product live kijiye aur orders aane par business shuru karein.
    //     </p>
    //   </div>

    //   {/* Pricing Card Setup */}
    //   <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-5">
        
    //     {/* Left Side: Features Details */}
    //     <div className="p-8 md:col-span-3 space-y-6">
    //       <h3 className="font-bold text-gray-800 text-lg">Vendor Feature Perks:</h3>
          
    //       <ul className="space-y-4">
    //         <li className="flex items-start gap-3 text-sm text-gray-600">
    //           <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
    //           <div>
    //             <strong className="text-gray-800 block">Unlimited Product Uploads</strong>
    //             Monthly Pass active hote hi aap bina kisi block limits ke jitne chahein utne custom phone cases or 3D models list kar sakte hain.
    //           </div>
    //         </li>
    //         <li className="flex items-start gap-3 text-sm text-gray-600">
    //           <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
    //           <div>
    //             <strong className="text-gray-800 block">Personal Incoming Shop Orders Panel</strong>
    //             Direct customers ke delivery addresses aur custom specs aapke vendor portal par instantly load honge.
    //           </div>
    //         </li>
    //         <li className="flex items-start gap-3 text-sm text-gray-600">
    //           <span className="text-emerald-500 font-bold text-lg leading-none">✓</span>
    //           <div>
    //             <strong className="text-gray-800 block">30-Days Full Access</strong>
    //             SaaS model monthly pass activate hone par direct dashboard support aur custom setup maintain rahega.
    //           </div>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Right Side: Pricing Action Call */}
    //     <div className="bg-gray-50/70 border-t md:border-t-0 md:border-l border-gray-100 p-8 flex flex-col justify-center items-center text-center md:col-span-2">
    //       <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Monthly Pass</span>
    //       <div className="my-3">
    //         <span className="text-4xl font-black text-gray-900">₹499</span>
    //         <span className="text-xs text-gray-400 font-semibold"> /month</span>
    //       </div>
    //       <p className="text-[11px] text-gray-400 mb-6">Apne vendor panel ko fully functional rakhne ke liye har mahine extend karein.</p>

    //       {error && <p className="text-xs text-red-500 font-semibold mb-3">{error}</p>}

    //       <button
    //         onClick={handleSubscriptionPayment}
    //         disabled={loading}
    //         className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-2xl transition shadow-md shadow-amber-500/20 disabled:opacity-50 text-sm"
    //       >
    //         {loading ? 'Processing Gateway...' : '🔒 Unlock My Shop Now'}
    //       </button>
    //     </div>

    //   </div>

    // </div>

















































    //new
    <div className="bg-white min-h-screen py-8 sm:py-12 selection:bg-amber-500 selection:text-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Upper Elite Status Bar */}
    <div className="text-center space-y-3 mb-10">
      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-amber-200/40 shadow-sm animate-pulse">
        🛡️ Premium Shop Verification Required
      </span>
      <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight max-w-xl mx-auto leading-tight">
        Activate Your CaseX Digital Dukaan 🏬
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
        Activate your vendor account and start selling products instantly. Manage orders, grow your store, and reach more customers with ease.
      </p>
    </div>

    {/* Premium Split Pricing Grid Matrix */}
    <div className="bg-white border border-slate-100 rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-5 gap-0 transition-all duration-300">
      
      {/* Left Side: Premium Core Perks Panel */}
      <div className="p-10 sm:p-8 md:col-span-3 space-y-7 bg-white flex flex-col justify-center">
        <div>
          <h3 className="font-black text-slate-800 text-s uppercase tracking-wider text-purple-700">
            Vendor Feature Perks:
          </h3>
          <p className="text-[13px] text-slate-400 font-semibold mt-0.5">Unlock premium features and exclusive tools to grow your business.</p>
        </div>
        
        <ul className="space-y-4">
          <li className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-600 group">
            <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5 shadow-sm">
              ✓
            </span>
            <div className="min-w-0">
              <strong className="text-slate-800 font-black tracking-tight text-[15px] sm:text-s block">Unlimited Product Uploads</strong>
              <p className="text-slate-400 text-s font-medium leading-relaxed mt-0.5">
                List unlimited phone covers and 3D designs without any restrictions while your monthly pass remains active.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-600 group">
            <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5 shadow-sm">
              ✓
            </span>
            <div className="min-w-0">
              <strong className="text-slate-800 font-black tracking-tight text-[15px] sm:text-s block">Personal Incoming Shop Orders Panel</strong>
              <p className="text-slate-400 text-s font-medium leading-relaxed mt-0.5">
                Receive customer orders instantly, including delivery details and product specifications, directly in your vendor dashboard.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-600 group">
            <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5 shadow-sm">
              ✓
            </span>
            <div className="min-w-0">
              <strong className="text-slate-800 font-black tracking-tight text-[15px] sm:text-s block">30-Days Full Access</strong>
              <p className="text-slate-400 text-s font-medium leading-relaxed mt-0.5">
                Enjoy full access to all vendor features, dashboard tools, and dedicated platform support for 30 days.
              </p>
            </div>
          </li>
        </ul>
      </div>

      {/* Right Side: Premium Conversion Trigger */}
      <div className="bg-gradient-to-b from-slate-50/80 to-slate-50/30 border-t md:border-t-0 md:border-l border-slate-100/80 p-6 sm:p-8 flex flex-col justify-center items-center text-center md:col-span-2 relative">
        <div className="absolute right-0 bottom-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <span className="text-[10px] bg-slate-200/60 text-slate-500 px-2.5 py-1 rounded-md font-black uppercase tracking-widest shadow-inner">
          Monthly Pass
        </span>
        
        <div className="my-4 flex items-baseline justify-center gap-1">
          <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">₹499</span>
          <span className="text-xs text-slate-400 font-black uppercase tracking-wider">/mo</span>
        </div>
        
        <p className="text-[13px] text-slate-400 font-medium mb-6 leading-relaxed max-w-[200px]">
          Keep your vendor account active and continue accessing all premium selling features with monthly renewal.
        </p>

        {/* Dynamic Errors Guard */}
        {error && (
          <div className="w-full bg-red-50 border border-red-100 text-red-600 p-2.5 rounded-xl text-[11px] font-bold mb-4 animate-fadeIn">
            ⚠️ {error}
          </div>
        )}

        {/* Interactive Payment Gateway CTA */}
        <button
          onClick={handleSubscriptionPayment}
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-widest py-4 px-4 rounded-xl shadow-md shadow-amber-500/10 hover:opacity-95 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {loading ? "Processing Gateway..." : "🔒 ACTIVATE VENDOR ACCOUNT"}
        </button>
      </div>

    </div>
  </div>
</div>
  );
}