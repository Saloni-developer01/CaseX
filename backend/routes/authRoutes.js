// import express from 'express';
// import { registerUser, loginUser } from '../controllers/authController.js';
// const router = express.Router();

// router.post('/signup', registerUser);
// router.post('/login', loginUser);

// export default router;




import express from 'express';
const router = express.Router();
import { registerUser, loginUser, toggleBlockUser, deleteUserPermanently, getAllVendors, getAllCustomers } from '../controllers/authController.js'; // 🌟 Added .js extension
import User from '../models/userModel.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';


router.post('/signup', registerUser);
router.post('/login', loginUser);

// backend/routes/authRoutes.js ya userRoutes.js

// 1. Get Logged-in User's Wishlist
router.get('/wishlist', protect, async (req, res) => {
  try {
    // User ko find karenge aur uske wishlist array ke andar saved product IDs ko poore data se populate karenge
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist || []);
  } catch (err) {
    res.status(500).json({ message: "Wishlist fetch karne mein dikkat aayi." });
  }
});

// 2. Toggle Wishlist (Add ya Remove dono ek hi route se)
router.post('/wishlist/toggle', protect, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (!user.wishlist) {
      user.wishlist = [];
    }

    // Check karo agar product pehle se wishlist mein hai
    const isExist = user.wishlist.includes(productId);

    if (isExist) {
      // Agar hai, toh remove kar do (Pull)
      user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
      await user.save();
      return res.json({ success: true, action: "removed", msg: "Removed from Wishlist 💔" });
    } else {
      // Agar nahi hai, toh add kar do (Push)
      user.wishlist.push(productId);
      await user.save();
      return res.json({ success: true, action: "added", msg: "Added to Wishlist ❤️" });
    }
  } catch (err) {
    res.status(500).json({ message: "Wishlist update nahi ho payi." });
  }
});

// 3. Delete Route (Tumhare frontend handleRemove ke liye match karne ko)
router.delete('/wishlist/:productId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
    await user.save();
    res.json({ success: true, msg: "Removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/vendors', protect, isAdmin, getAllVendors);
router.get('/customers', protect, isAdmin, getAllCustomers);
router.put('/users/:id/block', protect, isAdmin, toggleBlockUser);
router.delete('/users/:id', protect, isAdmin, deleteUserPermanently);

export default router;