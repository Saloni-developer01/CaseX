// 📄 backend/routes/payoutRoutes.js
import express from 'express';
import { requestPayout, getVendorPayouts, getAllPayoutRequests, updatePayoutStatus } from '../controllers/payoutController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js'; // Tumhara auth middleware
import { updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

// Vendor ke routes
router.post('/request', protect, requestPayout);
router.get('/my-requests', protect, getVendorPayouts);

// Admin ke routes (Agar tumhare paas admin middleware hai toh protect ke baad wo bhi laga sakte ho)
router.get('/admin/all', protect, getAllPayoutRequests);
// router.put('/admin/update/:id', protect, updateOrderStatus || updatePayoutStatus); 
router.put('/admin/update/:id', protect, updatePayoutStatus);


// 1. Get all vendors for Admin
router.get('/admin/vendors', protect, async (req, res) => {
  try {
    // Case-insensitive check lagate hain taaki 'Vendor' aur 'vendor' dono fetch ho jayein
    const vendors = await User.find({ 
      role: { $regex: /^vendor$/i } 
    }).select('-password');

    // const vendors = await User.find({ role: 'vendor' }).select('-password');
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

// 2. Update Vendor Status (Approve/Reject)
router.put('/admin/vendor/status/:id', protect, async (req, res) => {
  const { status } = req.body; // 'Approved' or 'Rejected'
  try {
    const vendor = await User.findById(req.params.id);
    if (!vendor) return res.status(404).json({ msg: 'Vendor not found' });

    vendor.vendorStatus = status;
    vendor.isVerifiedVendor = status === 'Approved';
    await vendor.save();

    res.json({ msg: `Vendor status updated to ${status}`, vendor });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});



// 🔥 6. Route: Admin Route to Approve Vendor (Yahan Paste Karna Tha!)
router.put('/admin/approve-vendor/:id', protect, isAdmin, async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);
    if (!vendor || vendor.role !== 'vendor') {
      return res.status(404).json({ msg: "Vendor nahi mila!" });
    }

    vendor.isApproved = true; // Vendor ko approve kar diya
    await vendor.save();

    res.status(200).json({ msg: `🎉 ${vendor.name} ko successfully approve kar diya gaya hai!` });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});



export default router;