// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ['customer', 'admin', 'vendor'],
//     default: 'customer'
//   },
//   isSubscribed: { type: Boolean, default: false },
//   wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
// }, { timestamps: true });

// // Password ko hash karne ke liye before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// // 🔥 FIX: mongoose.models.User check karega agar model pehle se bana ho, nahi toh naya banayega
// const User = mongoose.models.User || mongoose.model('User', userSchema);

// export default User;

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin", "vendor"],
      default: "customer",
    },
    isSubscribed: { type: Boolean, required: true, default: false },
    subscriptionStatus: { type: String, default: "none" }, // 'active', 'expired', 'none'
    subscriptionStartedAt: { type: Date },
    subscriptionExpiresAt: { type: Date },
    isApproved: { type: Boolean, default: false }, // Admin approve karega tabhi true hoga
  productsCount: { type: Number, default: 0 },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// 🔥 FIX: Async function mein parameter se 'next' hata diya hai aur direct 'return' use kiya hai
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
