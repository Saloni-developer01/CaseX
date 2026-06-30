// 📄 backend/controllers/payoutController.js
import Payout from '../models/payoutModel.js';

// 1. Vendor: Create Payout Request
export const requestPayout = async (req, res) => {
  try {
    const { amount, accountNumber, ifscCode, accountHolderName, bankName } = req.body;
    const vendorId = req.user._id;

    // Validation
    if (!amount || !accountNumber || !ifscCode || !accountHolderName || !bankName) {
      return res.status(400).json({ message: "Saari fields bharna zaroori hai!" });
    }

    const newPayout = new Payout({
      vendorId,
      amount,
      bankDetails: { accountNumber, ifscCode, accountHolderName, bankName }
    });

    await newPayout.save();
    res.status(201).json({ success: true, message: "🚀 Payout request admin ke paas bhej di gayi hai!", payout: newPayout });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Vendor: Get Own Payout History
export const getVendorPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find({ vendorId: req.user._id }).sort({ createdAt: -1 });
    res.json(payouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Admin: Get All Payout Requests (For Admin Dashboard)
export const getAllPayoutRequests = async (req, res) => {
  try {
    // Vendor ki thodi info (name, email) bhi populate kar lete hain
    const payouts = await Payout.find().populate('vendorId', 'name email').sort({ createdAt: -1 });
    res.json(payouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Admin: Update Payout Status (Approve/Reject)
// export const updatePayoutStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, adminMessage } = req.body;

//     if (!['Approved', 'Rejected'].includes(status)) {
//       return res.status(400).json({ message: "Invalid Status!" });
//     }

//     const payout = await Payout.findById(id);
//     if (!payout) return res.status(404).json({ message: "Request nahi mili!" });

//     payout.status = status;
//     payout.adminMessage = adminMessage || '';
//     await payout.save();

//     res.json({ success: true, message: `Payout request successfully ${status}!`, payout });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// 📄 backend/controllers/payoutController.js ke andar check karein:

export const updatePayoutStatus = async (req, res) => {
  try {
    const { status, adminMessage } = req.body;
    
    const payout = await Payout.findById(req.params.id); // Payout model ka naam check kar lena
    if (!payout) {
      return res.status(404).json({ message: "Payout request nahi mili" });
    }

    payout.status = status;
    payout.adminMessage = adminMessage;
    
    await payout.save();
    res.status(200).json(payout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};