import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, totalPrice } = location.state || {};

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default COD
  const [loading, setLoading] = useState(false);

  if (!product) {
    return <div className="text-center p-10 font-bold text-red-500">⚠️ No product selected for checkout!</div>;
  }

  // --- Razorpay Payment Gateway Handler ---
  // const handleOnlinePayment = async (userInfo) => {
  //   try {
  //     // 1. Backend se Razorpay Order ID mangwayen
  //     const orderRes = await axios.post('http://localhost:5000/api/orders/razorpay', { amount: totalPrice });
  //     const { id: razorpayOrderId, amount, currency } = orderRes.data;

  //     // 2. Razorpay Checkout Options Configure karein
  //     const options = {
  //       key: "rzp_test_SzVtRBXAWOvYNT", // Apni Test Key Yahan Dalein
  //       amount: amount,
  //       currency: currency,
  //       name: "Premium 3D Covers Store",
  //       description: `Payment for ${product.name}`,
  //       order_id: razorpayOrderId,
  //       handler: async function (response) {
  //         // Ye function tab chalega jab payment successful ho jayegi
  //         const verifyData = {
  //           razorpay_order_id: response.razorpay_order_id,
  //           razorpay_payment_id: response.razorpay_payment_id,
  //           razorpay_signature: response.razorpay_signature,
  //           productData: {
  //             product: product._id,
  //             customerName: userInfo.name,
  //             phone: phone,
  //             address: address,
  //             price: totalPrice
  //           }
  //         };

  //         // Backend par verify karwayen
  //         const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', verifyData);
  //         if (verifyRes.data.success) {
  //           alert("🎉 Online Payment Successful & Order Placed!");
  //           navigate('/');
  //         }
  //       },
  //       prefill: {
  //         name: userInfo.name,
  //         contact: phone,
  //       },
  //       theme: {
  //         color: "#9333EA", // Purple Theme for Premium Look
  //       },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (err) {
  //     console.error("Payment Error:", err);
  //     alert("Payment gateway open karne mein dikkat aayi.");
  //   }
  // };


  //new
//   const handleOnlinePayment = async (userInfo) => {
//   try {
//     // 1. Backend se Razorpay Order ID mangwayen
//     const orderRes = await axios.post('http://localhost:5000/api/orders/razorpay', { amount: totalPrice });
//     const { id: razorpayOrderId, amount, currency } = orderRes.data;

//     // 2. Razorpay Checkout Options Configure karein
//     const options = {
//       key: "rzp_test_SzVtRBXAWOvYNT", // Apni Test Key Yahan Dalein
//       amount: amount,
//       currency: currency,
//       name: "Premium 3D Covers Store",
//       description: `Payment for ${product.name}`,
//       order_id: razorpayOrderId,
//       handler: async function (response) {
//         // Ye function tab chalega jab payment successful ho jayegi
//         const verifyData = {
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,
//           productData: {
//             // product: product._id,
//     //         products: [
//     //   {
//     //     product: product._id,
//     //     quantity: quantity
//     //   }
//     // ],

//     products: req.body.productData.products, // [{ product: ..., quantity: ... }]
//             customerName: userInfo.name,
            
//             // 🌟 BACKEND SE MATCH KARNE KE LIYE KEYS FIXED KIYA
//             phoneNumber: phone,          // Backend schema ke mutabik 'phoneNumber'
//             address: address,
//             totalAmount: totalPrice,     // Backend schema ke mutabik 'totalAmount'
            
//             // 🌟 FLIPKART MODEL: Product ke creator (Vendor) ki ID yahan se bhej rahe hain
//             sellerId: product.vendorId || product.sellerId 
//           }
//         };

//         // Backend par verify karwayen
//         const verifyRes = await axios.post('http://localhost:5000/api/orders/verify', verifyData);
//         if (verifyRes.data.success) {
//           alert("🎉 Online Payment Successful & Order Placed!");
//           navigate('/dashboard'); // 🌟 Direct dashboard bhej do taaki user apna order dekh sake
//           window.location.href = '/dashboard';
//         }
//       },
//       prefill: {
//         name: userInfo.name,
//         contact: phone,
//       },
//       theme: {
//         color: "#9333EA", // Purple Theme for Premium Look
//       },
//     };

//     const populatedOrder = await Order.findById(savedOrder._id).populate({
//       path: 'products.product',
//       model: 'Product'
//     });

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (err) {
//     console.error("Payment Error:", err);
//     alert("Payment gateway open karne mein dikkat aayi.");
//   }
// };




// --- Razorpay Payment Gateway Handler (Fixed) ---
  const handleOnlinePayment = async (userInfo) => {
    try {
      // 1. Backend se Razorpay Order ID mangwayen
      const orderRes = await axios.post('https://casex-backend-h0xv.onrender.com/api/orders/razorpay', { amount: totalPrice });
      const { id: razorpayOrderId, amount, currency } = orderRes.data;

      // 2. Razorpay Checkout Options Configure karein
      const options = {
        key: "rzp_test_SzVtRBXAWOvYNT", // Apni Test Key Yahan Dalein
        amount: amount,
        currency: currency,
        name: "Premium 3D Covers Store",
        description: `Payment for ${product.name}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          // Ye function tab chalega jab payment successful ho jayegi
          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            productData: {
              // 🌟 FIXED: req.body hata kar proper local data bhej rahe hain
              products: [
                {
                  product: product._id,
                  quantity: quantity
                }
              ],
              customerName: userInfo.name,
              phoneNumber: phone,          // Backend schema ke mutabik 'phoneNumber'
              address: address,
              totalAmount: totalPrice,     // Backend schema ke mutabik 'totalAmount'
              sellerId: product.vendorId || product.sellerId 
            }
          };

          // Backend par verify karwayen
          const verifyRes = await axios.post('https://casex-backend-h0xv.onrender.com/api/orders/verify', verifyData);
          if (verifyRes.data.success) {
            alert("🎉 Online Payment Successful & Order Placed!");
            // 🌟 FIXED: Direct dashboard redirect with hard reload taaki fresh data fetch ho sake
            window.location.href = '/dashboard';
          }
        },
        prefill: {
          name: userInfo.name,
          contact: phone,
        },
        theme: {
          color: "#9333EA", // Purple Theme for Premium Look
        },
      };

      // 🌟 REMOVED: Mongoose query yahan se hata di hai (Wo backend ka kaam hai)

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("We couldn't connect to the payment gateway at the moment. Please try again later.");
    }
  };

  // --- Main Form Submit ---
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      alert("Please login first!");
      return navigate('/login');
    }

    if (paymentMethod === 'Online') {
      setLoading(false);
      await handleOnlinePayment(userInfo);
    } else {
      // Cash on Delivery Logic
      try {
        const orderData = {
          // product: product._id,
          products: [
          {
            product: product._id,
            quantity: quantity
          }
        ],
          // productName: product.name,
          totalAmount: totalPrice,
          customerName: userInfo.name,
          phoneNumber: phone,
          address: address,
          status: 'Pending',
          paymentStatus: 'Pending (COD)'
        };

        await axios.post('https://casex-backend-h0xv.onrender.com/api/orders', orderData, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        alert("🎉 COD Order Placed Successfully!");
        navigate('/');
      } catch (err) {
        console.error("COD Error:", err.response?.data); // Isse console mein exact error dikhegi
        alert("Order failed. Try again.");
      } finally {
        setLoading(false);
      }
    }
  };



  return (
    // <div className="max-w-4xl mx-auto p-6 bg-white border my-12 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
    //   {/* Left side Summary */}
    //   <div className="bg-slate-50/80 p-6 rounded-2xl space-y-4 border border-slate-100 flex flex-col justify-between">
    //     <div>
    //       <h3 className="font-black text-xl text-gray-800 mb-4">📦 Order Summary</h3>
    //       <div className="border-b pb-3 flex items-center gap-4">
    //         <img src={product.images?.[0]} alt={product.name} className="w-16 h-16 object-contain bg-white border rounded-xl" />
    //         <div>
    //           <h4 className="font-bold text-purple-700">{product.name}</h4>
    //           <p className="text-xs text-gray-400 uppercase font-semibold">Qty: {quantity}</p>
    //         </div>
    //       </div>
    //     </div>
        
    //     <div className="space-y-2 text-sm font-semibold text-gray-600 border-t pt-4">
    //       <div className="flex justify-between"><span>Subtotal:</span><span>₹{totalPrice}</span></div>
    //       <div className="flex justify-between text-emerald-600"><span>Delivery Charges:</span><span>FREE</span></div>
    //       <div className="flex justify-between border-t pt-2 text-gray-800 font-black text-base">
    //         <span>Total Payable:</span><span className="text-purple-600 text-lg">₹{totalPrice}</span>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Right side form */}
    //   <form onSubmit={handlePlaceOrder} className="space-y-4">
    //     <h3 className="font-black text-xl text-gray-800">🚚 Shipping & Payment</h3>
        
    //     <div>
    //       <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
    //       <input 
    //         type="tel" required placeholder="e.g. 98765xxxxx" 
    //         className="w-full p-3 border rounded-xl outline-none text-sm focus:ring-2 focus:ring-purple-500"
    //         value={phone} onChange={(e) => setPhone(e.target.value)}
    //       />
    //     </div>

    //     <div>
    //       <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Delivery Address</label>
    //       <textarea 
    //         required rows="2" placeholder="Full address with pincode" 
    //         className="w-full p-3 border rounded-xl outline-none text-sm focus:ring-2 focus:ring-purple-500 resize-none"
    //         value={address} onChange={(e) => setAddress(e.target.value)}
    //       />
    //     </div>

    //     {/* 💳 Payment Method Selector */}
    //     <div className="space-y-2 pt-2">
    //       <label className="block text-xs font-bold text-gray-500 uppercase">Choose Payment Method</label>
    //       <div className="grid grid-cols-2 gap-3">
    //         <button
    //           type="button"
    //           onClick={() => setPaymentMethod('COD')}
    //           className={`p-3 rounded-xl border-2 font-bold text-xs transition ${
    //             paymentMethod === 'COD' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500'
    //           }`}
    //         >
    //           💵 Cash On Delivery
    //         </button>
    //         <button
    //           type="button"
    //           onClick={() => setPaymentMethod('Online')}
    //           className={`p-3 rounded-xl border-2 font-bold text-xs transition ${
    //             paymentMethod === 'Online' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500'
    //           }`}
    //         >
    //           💳 Pay Online (UPI/Card)
    //         </button>
    //       </div>
    //     </div>

    //     <button 
    //       type="submit" disabled={loading}
    //       className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm rounded-xl shadow-md uppercase tracking-wider hover:opacity-90 transition mt-4"
    //     >
    //       {loading ? "Processing..." : paymentMethod === 'Online' ? "Proceed to Pay 💳" : `Confirm COD Order 🚀`}
    //     </button>
    //   </form>
    // </div>

















































    // new
    <div className="bg-white min-h-screen py-8 sm:py-12 selection:bg-purple-600 selection:text-white">
  <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white border border-slate-100 rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x md:divide-slate-100">
      
      {/* Left Side: Order Premium Summary Block */}
      <div className="bg-slate-50/60 p-6 sm:p-8 flex flex-col justify-between relative space-y-8">
        <div className="absolute left-0 top-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="space-y-5">
          <div>
            <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-[11px] font-black uppercase tracking-wider border border-purple-100/30">
              Secure Checkout
            </span>
            <h3 className="font-black text-3xl text-slate-800 tracking-tight mt-3 flex items-center gap-2">
              📦 Order Summary
            </h3>
          </div>

          <div className="bg-white border border-slate-100/80 p-4 rounded-2xl flex items-center gap-4 shadow-sm transition hover:shadow-md duration-200">
            <img 
              src={product.images?.[0] || 'https://via.placeholder.com/100'} 
              alt={product.name} 
              className="w-28 h-28 object-contain bg-slate-50 border border-slate-100 rounded-xl p-1 shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-black text-purple-700 text-xl truncate tracking-tight">
                {product.name}
              </h4>
              <p className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-black uppercase tracking-wider inline-block mt-1">
                Qty: {quantity}
              </p>
            </div>
          </div>
        </div>
        
        {/* Financial Billing Matrix Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-100 p-5 rounded-2xl space-y-3.5 text-sm font-semibold text-slate-600 shadow-inner">
          <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Subtotal</span>
            <span className="font-mono text-slate-700 text-sm font-black">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
            <span className="text-slate-400">Delivery Charges</span>
            <span className="text-emerald-600 font-black text-xs bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">FREE</span>
          </div>
          
          <div className="border-t border-slate-100 pt-3.5 flex justify-between items-center text-slate-800 font-black text-sm uppercase tracking-wide">
            <span>Total Payable</span>
            <span className="text-purple-700 font-black text-xl tracking-tight">₹{totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Right Side: Shipping & Channels Form */}
      <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-5 flex flex-col justify-center bg-white">
        <div>
          <h3 className="font-black text-2xl text-slate-800 tracking-tight flex items-center gap-2">
            🚚 Shipping & Payment
          </h3>
          <p className="text-[12px] text-slate-400 font-semibold mt-0.5">Monitor delivery progress and manage shipping information efficiently.</p>
        </div>
        
        {/* Phone Input Box Field */}
        <div className="space-y-1">
          <label className="block text-[12px] font-black text-slate-400 uppercase tracking-wider">Phone Number</label>
          <div className="relative">
            <input 
              type="tel" 
              required 
              placeholder="e.g. 98765xxxxx" 
              className="w-full p-3.5 bg-slate-50 border border-slate-100 focus:border-purple-500 focus:bg-white rounded-xl outline-none text-xs font-bold transition shadow-inner font-mono"
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Textarea Box Address Specifications */}
        <div className="space-y-1">
          <label className="block text-[12px] font-black text-slate-400 uppercase tracking-wider">Delivery Address</label>
          <textarea 
            required 
            rows="2" 
            placeholder="Full address with pincode, landmark and city details" 
            className="w-full p-3.5 bg-slate-50 border border-slate-100 focus:border-purple-500 focus:bg-white rounded-xl outline-none text-xs font-bold transition shadow-inner resize-none leading-relaxed"
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* 💳 Payment Method Channels Selector Option Panel */}
        <div className="space-y-2 pt-1">
          <label className="block text-[12px] font-black text-slate-400 uppercase tracking-wider">Choose Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('COD')}
              className={`p-3.5 rounded-xl border-2 font-black text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center gap-1.5 active:scale-95 ${
                paymentMethod === 'COD' 
                  ? 'border-purple-600 bg-purple-50/50 text-purple-700 shadow-sm' 
                  : 'border-slate-100 bg-slate-50/40 text-slate-400 font-bold hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              💵 COD
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('Online')}
              className={`p-3.5 rounded-xl border-2 font-black text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center gap-1.5 active:scale-95 ${
                paymentMethod === 'Online' 
                  ? 'border-purple-600 bg-purple-50/50 text-purple-700 shadow-sm' 
                  : 'border-slate-100 bg-slate-50/40 text-slate-400 font-bold hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              💳 Online
            </button>
          </div>
        </div>

        {/* Absolute Submission CTA Trigger */}
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-black text-xs rounded-xl shadow-md shadow-purple-100 uppercase tracking-widest hover:opacity-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
          >
            {loading ? "Processing Pipeline..." : paymentMethod === 'Online' ? "Proceed to Pay 💳" : `Confirm COD Order 🚀`}
          </button>
        </div>
      </form>
      
    </div>
  </div>
</div>
  );
}
