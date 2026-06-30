// 📄 backend/models/payoutModel.js
import mongoose from 'mongoose';

const payoutSchema = mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [100, 'Minimum payout request ₹100 honi chahiye!'] // Ek limit set kar di
  },
  bankDetails: {
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    bankName: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  adminMessage: {
    type: String, // Agar reject ho toh admin reason likh sake
    default: ''
  }
}, { timestamps: true });

const Payout = mongoose.model('Payout', payoutSchema);
export default Payout;