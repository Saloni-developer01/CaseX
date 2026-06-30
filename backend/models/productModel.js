import mongoose from "mongoose";

// Individual Review Schema
const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true }, // 1 to 5 stars
  comment: { type: String, required: true },
  reviewImages: [{ type: String }], // 🌟 Naya field: Customer review images save karne ke liye
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, 
  description: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  mrp: { type: Number }, 
  materialType: { type: String, default: "Hard Plastic" }, 
  supportedModels: [{ type: String }], 
  images: [{ type: String, required: true }], 
  category: { type: String, default: "Phone Cover" },
  model3D: { type: String, default: "" }, // 🌟 Yeh Three.js ki .glb file ke liye extra add kiya hai

  // 🌟 Naye fields reviews ke liye
  reviews: [reviewSchema],
  rating: { type: Number, required: true, default: 0 }, // Average Rating
  numReviews: { type: Number, required: true, default: 0 },
  // inStock: { type: Boolean, default: true },
  stock: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
export default Product;