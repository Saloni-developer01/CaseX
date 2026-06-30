import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// export const createOrder = async (req, res) => {
//   try {
//     const { product, customerName, phoneNumber, address, totalAmount } = req.body;

//     if (!product || !customerName || !phoneNumber || !address || !totalAmount) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newOrder = new Order({
//       product,
//       customerName,
//       phoneNumber,
//       address,
//       totalAmount
//     });

//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };





// 📄 backend/controllers/orderController.js

export const createOrder = async (req, res) => {
  try {
    // Fronted se direct Single Product ki ID aur Quantity aayegi, ya products array
    const { products, totalAmount, customerName, phoneNumber, address, paymentStatus } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Kharidne ke liye koi product select nahi kiya gaya!" });
    }

    // 🌟 1. Stock Check Loop
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product database me nahi mila!" });
      }
      
      // Agar required quantity available stock se zyada hai
      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Sorry! ${product.name} out of stock ho gaya hai. Sirf ${product.stock} pieces available hain.` 
        });
      }
    }

    // 🌟 2. Stock Minus Loop (Sirf tab chalega jab upar wala check pass ho jaye)
    for (const item of products) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } } // Stock quantity kam kar dega
      );
    }

    // 🌟 3. Order Document Create & Save
    const newOrder = new Order({
      user: req.user ? req.user._id : (req.body.userId || null),
      products,
      totalAmount,
      customerName,
      phoneNumber,
      address,
      status: 'Pending',
      paymentStatus: paymentStatus || 'Pending (COD)'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

  } catch (error) {
    console.error("Order direct processing error:", error);
    res.status(500).json({ message: "Order failed!", error: error.message });
  }
};






// 1. Saare orders ko fetch karne ke liye (Sath mein product details bhi populate karenge)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({path: 'products.product',
   model: 'Product'}).sort({ orderedAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Order ka status (Pending -> Shipped -> Delivered) update karne ke liye
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// new 
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Frontend se naya status aayega

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Taaki updated data return ho
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order nahi mila" });
    }

    res.status(200).json({ success: true, message: "Status updated!", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Status update fail hua", error: error.message });
  }
};