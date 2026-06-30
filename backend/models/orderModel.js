import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  // product: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Product',
  //   required: true
  // },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  customerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Pending', // Pending, Shipped, Delivered
  },
  paymentId: { type: String },
  orderedAt: {
    type: Date,
    default: Date.now
  },

  // 🌟 FLIPKART MODEL FIELDS
  commissionEarned: { type: Number, default: 0 }, // Admin ki 10% kamai
  vendorPayout: { type: Number, default: 0 },     // Vendor ka 90% share
  sellerId: { type: String }                       // Kis vendor ka product hai uski ID ya name
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;