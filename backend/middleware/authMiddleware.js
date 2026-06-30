// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// export const protect = async (req, res, next) => {
//   let token;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, 'JWT_SECRET_KEY_SALONI_3D');
//       req.user = await User.findById(decoded.id).select('-password');
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   }
//   if (!token) res.status(401).json({ message: "Not authorized, no token" });
// };

// // Sirf Admin access ke liye check
// export const isAdmin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: "Access denied! Only Admin can do this." });
//   }
// };
























import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'JWT_SECRET_KEY_SALONI_3D');
      req.user = await User.findById(decoded.id).select('-password');

      // 🌟 CRITICAL CHECK: Agar user blocked hai, toh aage mat jaane do
      if (req.user && req.user.isBlocked) {
        return res.status(403).json({ msg: "🚨 Your account has been blocked by an administrator!" });
      }


       next(); // 🌟 Next ko return karna ensure karta hai ki execution aage badhe
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied! Only Admin can do this." });
  }
};


// export const isVendorOrAdmin = (req, res, next) => {
//   if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin')) {
//     next();
//   } else {
//     res.status(403).json({ msg: "Not authorized as a vendor or admin" });
//   }
// };


// export const isVendorOrAdmin = async (req, res, next) => {
//   if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin')) {
    
//     // Admin ko bypass karein, saari checking sirf Vendor ke liye hogi
//     if (req.user.role === 'vendor') {
//       const vendor = await User.findById(req.user._id);
//       const currentDate = new Date();

//       // 🔥 CHECK 1: Admin Approval Check
//       if (!vendor.isApproved) {
//         return res.status(403).json({ 
//           msg: "🔒 Aapka account abhi tak Admin se approved nahi hai. Kripya verification ka intezar karein!" 
//         });
//       }

//       // 🔥 CHECK 2: Expiry Check (Agar active tha par ab time nikal gaya)
//       if (vendor.subscriptionStatus === 'active' && currentDate > new Date(vendor.subscriptionExpiresAt)) {
//         vendor.subscriptionStatus = 'expired';
//         vendor.isSubscribed = false;
//         await vendor.save();
//       }

//       // 🔥 CHECK 3: Freemium Model Rule Check (Sirf tab chalega jab route POST yaani Add Product ka ho)
//       if (req.method === 'POST' && req.originalUrl.includes('/products')) {
//         // Agar user paid member nahi hai (none ya expired hai)
//         if (vendor.subscriptionStatus === 'none' || vendor.subscriptionStatus === 'expired') {
//           // Free Limit: Max 3 Products
//           if (vendor.productsCount >= 3) {
//             return res.status(403).json({ 
//               msg: "🚫 Free limit khatam! Aap max 3 products daal sakte hain. Aur products add karne ke liye premium plan buy karein." 
//             });
//           }
//         }
//       }
      
//       // Request object me updated vendor details daal dein
//       req.user = vendor;
//     }
    
//     next();
//   } else {
//     res.status(403).json({ msg: "Not authorized as a vendor or admin" });
//   }
// };


export const isVendorOrAdmin = async (req, res, next) => {
  if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin')) {
    
    // Admin ko direct bypass karenge, checking sirf Vendor par lagegi
    if (req.user.role === 'vendor') {
      const vendor = await User.findById(req.user._id);
      const currentDate = new Date();

      // 1. Admin Approval Check (Pehle se jo tha)
      if (!vendor.isApproved) {
        return res.status(403).json({ 
          msg: "🔒 Aapka account abhi tak Admin se approved nahi hai. Kripya verification ka intezar karein!" 
        });
      }

      // 2. Expiry Check (Agar time nikal gaya toh status 'expired' mark karo)
      if (vendor.subscriptionStatus === 'active' && currentDate > new Date(vendor.subscriptionExpiresAt)) {
        vendor.subscriptionStatus = 'expired';
        vendor.isSubscribed = false;
        await vendor.save();
      }

      // 3. STRICT CHECK: Agar subscription active nahi hai, toh koi bhi product modify/add nahi karne dena hai
      if (!vendor.isSubscribed || vendor.subscriptionStatus !== 'active') {
        return res.status(403).json({ 
          msg: "⚠️ Products manage karne ke liye aapka Monthly Subscription Active hona zaroori hai! Kripya pehle plan renew karein." 
        });
      }
      
      // Updated details request me attach kar do
      req.user = vendor;
    }
    
    next();
  } else {
    res.status(403).json({ msg: "Not authorized as a vendor or admin" });
  }
};