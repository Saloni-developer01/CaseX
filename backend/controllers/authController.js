// import User from '../models/userModel.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// // Token banane ka function
// const generateToken = (id) => {
//   return jwt.sign({ id }, 'JWT_SECRET_KEY_SALONI_3D', { expiresIn: '30d' });
// };

// // 1. SIGNUP / REGISTER
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({ name, email, password, role });
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id)
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 2. LOGIN
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         isSubscribed: user.isSubscribed,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

































import User from '../models/userModel.js'; // 🌟 .js extension lagana ES Modules mein mandatory hota hai
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  return jwt.sign({ id }, 'JWT_SECRET_KEY_SALONI_3D', { expiresIn: '30d' });
};

// 1. SIGNUP / REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if(req.body.role === 'admin'){
      return res.status(403).json({message: "Admin accounts cannot be created through this registration form."})
    }

    const user = await User.create({ name, email, password, role });
    
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error("🔥 ACTUAL SIGNUP ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

// 2. LOGIN
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
      
//       return res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         isSubscribed: user.isSubscribed,
//         token: generateToken(user._id)
//       });
      
//     } else {
//       return res.status(401).json({ message: "Invalid email or password" });
//     } 
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


// 2. LOGIN (FIXED CODE)
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
      
//       // 🌟 FIXED: Pehle hi check karlo ki user blocked toh nahi hai
//       if (user.isBlocked) {
//         return res.status(403).json({ message: "🚨 Aapka account block hai. Kripya Admin se sampark karein." });
//       }

//       // Agar blocked nahi hai, tabhi token aur data return karo
//       return res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role, // Tumhara role system (customer/vendor/admin)
//         isSubscribed: user.isSubscribed,
//         token: generateToken(user._id)
//       });
      
//     } else {
//       return res.status(401).json({ message: "Invalid email or password" });
//     } 
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      
      if (user.isBlocked) {
        return res.status(403).json({ message: "🚨 Your account has been blocked. Please contact the administrator for further assistance." });
      }

      // 🌟 STRICT SUBSCRIPTION LIVE CHECK ON LOGIN
      if (user.role === 'vendor' && user.subscriptionStatus === 'active') {
        const currentDate = new Date();
        if (currentDate > new Date(user.subscriptionExpiresAt)) {
          user.subscriptionStatus = 'expired';
          user.isSubscribed = false;
          await user.save();
        }
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        // 🔥 YEH FIELDS LOGIN RESPONSE MEIN BHI BHEJNA ZAROORI HAI:
  isSubscribed: user.isSubscribed,
  subscriptionStatus: user.subscriptionStatus,
  subscriptionStartedAt: user.subscriptionStartedAt,
  subscriptionExpiresAt: user.subscriptionExpiresAt
      });
      
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    } 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found!" });

    if (user.isAdmin) {
      return res.status(400).json({ msg: "⚠️ Administrator accounts are protected and cannot be blocked." });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({ 
      success: true, 
      msg: `✅ User has been successfully ${user.isBlocked ? 'BLOCK' : 'UNBLOCK'}!`,
      isBlocked: user.isBlocked 
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error in blocking user" });
  }
};

// @desc    Delete User Permanently (Vendor or Customer)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUserPermanently = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User nahi mila!" });

    if (user.isAdmin) {
      return res.status(400).json({ msg: "Admin delete nahi ho sakta!" });
    }

    // Agar vendor hai, toh optional: Uske saare products bhi uda sakte ho
    // await Product.deleteMany({ vendorId: user._id });

    await user.deleteOne();
    res.json({ success: true, msg: "User account database se permanently delete ho gaya! 🗑️" });
  } catch (err) {
    res.status(500).json({ msg: "Server error in deleting user" });
  }
};



// @desc    Get all registered vendors
// @route   GET /api/admin/vendors
// export const getAllVendors = async (req, res) => {
//   try {
//     // Tumhare database ke role structure ke mutabik query (e.g., role: 'vendor')
//     const vendors = await User.find({ role: 'vendor' }).select('-password');
//     res.json(vendors);
//   } catch (err) {
//     res.status(500).json({ message: "Vendors fetch karne mein dikkat aayi" });
//   }
// };

// @desc    Get all registered customers
// @route   GET /api/admin/customers
// export const getAllCustomers = async (req, res) => {
//   try {
//     const customers = await User.find({ role: 'customer' }).select('-password');
//     res.json(customers);
//   } catch (err) {
//     res.status(500).json({ message: "Customers fetch karne mein dikkat aayi" });
//   }
// };

// @desc    Get all registered vendors
// @route   GET /api/auth/vendors
export const getAllVendors = async (req, res) => {
  try {
    // 🌟 SAFE CHECK: Agar tum 'role' use karte ho ya 'isVendor', dono ko handle karega
    const vendors = await User.find({
      $or: [
        { role: 'vendor' },
        { isVendor: true }
      ]
    }).select('-password');
    
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Vendors fetch karne mein server error aayi." });
  }
};

// @desc    Get all registered customers
// @route   GET /api/auth/customers
export const getAllCustomers = async (req, res) => {
  try {
    // 🌟 SAFE CHECK: Admin aur vendors ko chhodkar baki saare customers hain
    const customers = await User.find({
      role: { $ne: 'admin' },
      isVendor: { $ne: true },
      isAdmin: { $ne: true },
      $or: [
        { role: 'customer' },
        { role: { $exists: true } } // Default catch-all user profile
      ]
    }).select('-password');

    // Filter out edge case agar admin khud list mein aa jaye
    const cleanCustomers = customers.filter(c => c.role !== 'admin' && c.role !== 'vendor');

    res.status(200).json(cleanCustomers);
  } catch (error) {
    res.status(500).json({ message: "Customers fetch karne mein server error aayi." });
  }
};