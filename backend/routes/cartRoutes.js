// backend/routes/cartRoutes.js
import express from 'express';
import Cart from '../models/cartModel.js'; // 🌟 .js extension lagana mat bhoolna
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. Get User Cart Data
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Add or Update Item in Cart
router.post('/add', protect, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    cart = await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Remove Item From Cart
router.post('/remove', protect, async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      await cart.save();
      cart = await cart.populate('items.product');
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart nahi mila" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; // 🌟 ES Module export