// import express from 'express';
// import { createOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import Order from '../models/orderModel.js';
// const router = express.Router();

// router.post('/', createOrder);
// router.get('/', getAllOrders); // 🌟 Naya GET route
// router.put('/:id', updateOrderStatus); // 🌟 Naya PUT route


// // Razorpay Instance Initialize karein (Keys aapko Razorpay Dashboard se milengi)
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SzVtRBXAWOvYNT', 
//   key_secret: process.env.RAZORPAY_KEY_SECRET || 'j1oiIYmKVBpvUC9pbzfn56Ba'
// });

// // 1. Route: Payment Order Intent Create Karna
// router.post('/razorpay', async (req, res) => {
//   const { amount } = req.body;
  
//   try {
//     const options = {
//       amount: amount * 100, // Razorpay paise mein amount leta hai (e.g., ₹500 = 50000 paise)
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     if (!order) return res.status(500).send("Razorpay order creation failed");

//     res.json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server Error");
//   }
// });

// // 2. Route: Payment Verification aur Order Save Karna
// router.post('/verify', async (req, res) => {
//   const { 
//     razorpay_order_id, 
//     razorpay_payment_id, 
//     razorpay_signature,
//     productData 
//   } = req.body;

//   // Signature verification security ke liye zaroori hai
//   const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'j1oiIYmKVBpvUC9pbzfn56Ba');
//   shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//   const digest = shasum.digest("hex");

//   if (digest !== razorpay_signature) {
//     return res.status(400).json({ msg: "Transaction is not authentic/legit!" });
//   }

//   try {
//     // Agar signature match ho gaya, toh database mein order details save karein
//     const newOrder = new Order({
//       product: productData.product,
//       customerName: productData.customerName,
//       phoneNumber: productData.phoneNumber,
//       address: productData.address,
//       totalAmount: productData.totalAmount,
//       status: 'Paid',
//       paymentId: razorpay_payment_id,
//       orderId: razorpay_order_id
//     });

//     await newOrder.save();
//     res.json({ success: true, msg: "Payment Verified & Order Placed Successfully! 🎉" });
//   } catch (err) {
//     res.status(500).json({ msg: "Database error while saving order" });
//   }
// });


// // 3. Route: Logged-in user ke khud ke orders fetch karna (GET /api/orders/myorders)
// // Note: Isme aapka 'protect' middleware use hona chahiye jo req.user set karta hai.

// router.get('/myorders', async (req, res) => {
//   try {
//     // Agar aapke paas auth middleware hai, toh req.user._id se dhoondhein. 
//     // Agar middleware abhi access nahi de raha, toh hum query param ya customerName se filter kar sakte hain.
//     // Chalo abhi simple rakhne ke liye customerName ya token middleware se nikalte hain.
    
//     // Agar protect middleware laga hai:
//     // const orders = await Order.find({ customerName: req.user.name }).populate('product');
    
//     // Default safe approach: Saare orders laakar frontend filter kar lega ya name se match:
//     const orders = await Order.find().populate('product');
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Orders fetch karne mein dikkat aayi." });
//   }
// });

// export default router;






































//new
import express from 'express';
import { createOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js'; // 🌟 Subscription update ke liye User model import kiya
// import { protect } from '../middleware/authMiddleware.js'; // 🌟 Agar aapke paas protect middleware hai toh ise uncomment karein
import { protect, isAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', getAllOrders); // 🌟 Naya GET route
router.put('/:id', updateOrderStatus); // 🌟 Naya PUT route

// backend/routes/orderRoutes.js
router.put('/:id/status', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Razorpay Instance Initialize karein (Keys aapko Razorpay Dashboard se milengi)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SzVtRBXAWOvYNT', 
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'j1oiIYmKVBpvUC9pbzfn56Ba'
});

// 1. Route: Payment Order Intent Create Karna
router.post('/razorpay', async (req, res) => {
  const { amount } = req.body;
  
  try {
    const options = {
      amount: amount * 100, // Razorpay paise mein amount leta hai (e.g., ₹500 = 50000 paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send("Razorpay order creation failed");

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// 2. Route: Payment Verification aur Order Save Karna
// router.post('/verify', async (req, res) => {
//   const { 
//     razorpay_order_id, 
//     razorpay_payment_id, 
//     razorpay_signature,
//     productData 
//   } = req.body;

//   // Signature verification security ke liye zaroori hai
//   const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'j1oiIYmKVBpvUC9pbzfn56Ba');
//   shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//   const digest = shasum.digest("hex");

//   if (digest !== razorpay_signature) {
//     return res.status(400).json({ msg: "Transaction is not authentic/legit!" });
//   }

//   try {
//     // Agar signature match ho gaya, toh database mein order details save karein
//     const newOrder = new Order({
//       product: productData.product,
//       customerName: productData.customerName,
//       phoneNumber: productData.phoneNumber,
//       address: productData.address,
//       totalAmount: productData.totalAmount,
//       status: 'Paid',
//       paymentId: razorpay_payment_id,
//       orderId: razorpay_order_id
//     });

//     await newOrder.save();
//     res.json({ success: true, msg: "Payment Verified & Order Placed Successfully! 🎉" });
//   } catch (err) {
//     res.status(500).json({ msg: "Database error while saving order" });
//   }
// });


//new with 10% commission
// 2. Route: Payment Verification aur Order Save Karna (Updated with Commission)
// router.post('/verify', async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productData } = req.body;

//   const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'j1oiIYmKVBpvUC9pbzfn56Ba');
//   shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//   const digest = shasum.digest("hex");

//   if (digest !== razorpay_signature) {
//     return res.status(400).json({ msg: "Transaction is not authentic/legit!" });
//   }

//   // try {
//   //   // 🌟 AUTOMATIC COMMISSION CALCULATION (10% Platform Fee)
//   //   const amount = Number(productData.totalAmount);
//   //   const adminCommission = amount * 0.10; // 10% cut
//   //   const finalVendorShare = amount - adminCommission; // 90% to vendor

//   //   const newOrder = new Order({
//   //     product: productData.product,
//   //     customerName: productData.customerName,
//   //     phoneNumber: productData.phoneNumber,
//   //     address: productData.address,
//   //     totalAmount: amount,
//   //     status: 'Paid',
//   //     paymentId: razorpay_payment_id,
//   //     orderId: razorpay_order_id,
      
//   //     // 🌟 Saving calculation in DB
//   //     commissionEarned: adminCommission,
//   //     vendorPayout: finalVendorShare,
//   //     sellerId: productData.sellerId || productData.sellerName || "Saloni's Shop" // Jo bhi field aap user tracking ke liye bhej rhe ho
//   //   });

//   //   await newOrder.save();
//   //   res.json({ success: true, msg: "Payment Verified & Order Placed Successfully! 🎉" });
//   // } catch (err) {
//   //   res.status(500).json({ msg: "Database error while saving order" });
//   // }



//   // orderRoutes.js ke andar /verify route ka try block:
// try {
//   const amount = Number(productData.totalAmount || 0);
//   const adminCommission = amount * 0.10; // 10% Platform fee
//   const finalVendorShare = amount - adminCommission; // 90% Vendor payout

//   // Safe Fallback: Agar frontend se sellerId miss ho gayi, toh product model se nikal lo
//         let finalSellerId = productData.sellerId;
//         if (!finalSellerId) {
//             const currentProduct = await Product.findById(productData.product);
//             if (currentProduct) {
//                 finalSellerId = currentProduct.vendorId; // Product schema ki vendorId
//             }
//         }

//   const newOrder = new Order({
//     product: productData.product,
//     customerName: productData.customerName,
//     phoneNumber: productData.phoneNumber,
//     address: productData.address,
//     totalAmount: amount,
//     status: 'Paid',
//     paymentId: razorpay_payment_id,
//     orderId: razorpay_order_id,
    
//     // 🔥 Calculations ko zero fallback ke sath save karein
//     commissionEarned: adminCommission,
//     vendorPayout: finalVendorShare,
//     // Agar sellerId aa rahi hai toh thik, nahi toh product se populate karke bhi nikal sakte hain
//     sellerId: finalSellerId
//   });

//   await newOrder.save();
//   res.json({ success: true, msg: "Payment Verified & Order Placed Successfully! 🎉" });
// } catch (err) {
//   console.error(err);
//   res.status(500).json({ msg: "Database error while saving order" });
// }
// });


router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productData } = req.body;

  // 1. Signature Verification (Jaise tumne kiya tha, bilkul perfect hai)
  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'j1oiIYmKVBpvUC9pbzfn56Ba');
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not authentic/legit!" });
  }

  try {
    const amount = Number(productData.totalAmount || 0);
    const adminCommission = amount * 0.10; // 10% Platform fee
    const finalVendorShare = amount - adminCommission; // 90% Vendor payout

    // 🌟 FALLBACK logic agar frontend se sellerId miss ho jaye (Single item ke liye)
    let finalSellerId = productData.sellerId;
    if (!finalSellerId && productData.products && productData.products.length > 0) {
      const currentProduct = await Product.findById(productData.products[0].product);
      if (currentProduct) {
        finalSellerId = currentProduct.vendorId || currentProduct.sellerId;
      }
    }

    // 2. New Order Object Creation according to modern Array Schema
    const newOrder = new Order({
      // 🔥 CHANGE 1: Purana single 'product' field hata kar 'products' array save kar rahe hain
      products: productData.products.map(item => ({
        product: item.product,
        quantity: item.quantity || 1
      })),
      customerName: productData.customerName,
      phoneNumber: productData.phoneNumber,
      address: productData.address,
      totalAmount: amount,
      status: 'Paid',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      commissionEarned: adminCommission,
      vendorPayout: finalVendorShare,
      sellerId: finalSellerId
    });

    // 3. Order save karo database mein
    const savedOrder = await newOrder.save();

    // 🔥 CHANGE 2: (SABSE IMPORTANT) Response bhejne se pehle data populate karo 
    // taaki frontend ko instantly product name aur image mil jaye!
    const populatedOrder = await Order.findById(savedOrder._id).populate({
      path: 'products.product',
      model: 'Product'
    });

    // 4. Return the populated order details
    res.json({ 
      success: true, 
      msg: "Payment Verified & Order Placed Successfully! 🎉", 
      order: populatedOrder 
    });

  } catch (err) {
    console.error("Verification Error Backend:", err);
    res.status(500).json({ msg: "Database error while saving order" });
  }
});


// 3. Route: Logged-in user ke khud ke orders fetch karna (GET /api/orders/myorders)
router.get('/myorders', async (req, res) => {
  try {
    const orders = await Order.find().populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Orders fetch karne mein dikkat aayi." });
  }
});


// =========================================================================
// 🌟 NAYE FEATURES: VENDOR SUBSCRIPTION ROUTES (FLIPKART MODEL EARNING)
// =========================================================================

// 4. Route: Create Razorpay Order Intent for Subscription (₹499 fixed fee)
// Note: Agar aapke paas protect middleware ho, toh router.post('/razorpay-subscription', protect, ...) kar dena
router.post('/razorpay-subscription', async (req, res) => {
  try {
    const options = {
      amount: 499 * 100, // ₹499 = 49900 paise
      currency: "INR",
      receipt: `sub_receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send("Razorpay subscription order creation failed");

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error in subscription payment intent" });
  }
});

// 5. Route: Verify Subscription Payment & Update Vendor Status in DB
// router.post('/verify-subscription', async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, vendorEmail } = req.body;

//   const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'j1oiIYmKVBpvUC9pbzfn56Ba');
//   shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//   const digest = shasum.digest("hex");

//   if (digest !== razorpay_signature) {
//     return res.status(400).json({ message: "Invalid payment signature!" });
//   }

//   try {
//     // Payment verify hote hi Vendor ko database mein active (isSubscribed: true) mark karein
//     // Abhi ke liye hum frontend se bhejbe wale email se find kar rahe hain (Full Safe & Easy approach)
//     const user = await User.findOne({ email: vendorEmail });
    
//     if (user) {
//       user.isSubscribed = true;
//       await user.save();

//       return res.status(200).json({
//         success: true,
//         message: "Subscription activated successfully!",
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           isSubscribed: user.isSubscribed
//         }
//       });
//     } else {
//       return res.status(444).json({ message: "Vendor user nahi mila" });
//     }
//   } catch (dbError) {
//     console.error(dbError);
//     return res.status(500).json({ message: "Database update failed while activating subscription" });
//   }
// });




// / 5. Route: Verify Subscription Payment & 🌟 ACTIVATE VALIDATION TIME (30 DAYS)
router.post('/verify-subscription', protect, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, vendorEmail } = req.body;

  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'j1oiIYmKVBpvUC9pbzfn56Ba');
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid payment signature!" });
  }

  try {
    const user = await User.findOne({ email: vendorEmail });
    
    if (user) {
      const planDurationInDays = 30;

      // 🌟 YAHAN UPDATE HUA AAPKA CODE: Expiry Logic Integrate Kar Di
      user.isSubscribed = true;
      user.subscriptionStatus = 'active';
      user.subscriptionStartedAt = new Date();
      user.subscriptionExpiresAt = new Date(Date.now() + planDurationInDays * 24 * 60 * 60 * 1000);
      
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Subscription activated successfully!",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isSubscribed: user.isSubscribed,
          subscriptionStatus: user.subscriptionStatus,
          subscriptionExpiresAt: user.subscriptionExpiresAt
        }
      });
    } else {
      return res.status(444).json({ message: "Vendor user nahi mila" });
    }
  } catch (dbError) {
    console.error(dbError);
    return res.status(500).json({ message: "Database update failed while activating subscription" });
  }
});


export default router;