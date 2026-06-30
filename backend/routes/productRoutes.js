import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, isAdmin, isVendorOrAdmin } from '../middleware/authMiddleware.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';


const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
// router.post('/', protect, isAdmin, createProduct);
router.post('/', protect, (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'vendor') {
    next();
  } else {
    res.status(403).json({ message: "Access Denied! Sirf Admin aur Vendor hi product add kar sakte hain." });
  }
}, createProduct);


router.post('/:id/reviews', protect, async (req, res) => {
  const { rating, comment, reviewImages } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product nahi mila' });
    }

    // 1. Check karo ki customer ne yeh product sach me khareeda hai aur delivered ho chuka hai
    const hasBought = await Order.findOne({
      'product._id': req.params.id, // Aapke schema ke hisab se match karein
      customerName: req.user.name, // Ya fir userId check karein agar order schema me saved h
      status: 'Delivered'
    });

    // ⚠️ Security Check (Optional but good for real business):
    // if (!hasBought) {
    //   return res.status(400).json({ msg: 'Aap sirf khareede hue aur delivered products par hi review de sakte hain!' });
    // }

    // 2. Check karo ki user ne pehle se review toh nahi de rakkha hai
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ msg: 'Aap is product par pehle hi review de chuke hain' });
    }

    // 3. Naya review object banao
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      reviewImages: reviewImages || [], // 🌟 Images ko push kiya
      user: req.user._id
    };

    // 4. Product array me push karo
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    // 5. Total Average Rating calculate karo
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ msg: 'Review successfully add ho gaya!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});



// Product ko edit/update karne ke liye (PUT Request)
router.put('/update/:id', protect, updateProduct);

// Product ko delete karne ke liye (DELETE Request)
router.delete('/delete/:id', protect, deleteProduct);

export default router;