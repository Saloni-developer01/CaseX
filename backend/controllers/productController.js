import Product from '../models/productModel.js';
import User from '../models/userModel.js';

//API 1: Get All Products
// export const getAllProducts = async (req, res) => {
//   try {
//     const { search } = req.query;
//     let query = {};
//     if (search) {
//       query.name = { $regex: search, $options: 'i' };
//     }
//     const products = await Product.find(query);
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// API 1: Get All Products (Updated for Phone Model Search)
export const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      // 🌟 $or use kiya taaki name ya supportedModels dono me se kahi bhi match ho toh product mil jaye
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { supportedModels: { $regex: search, $options: 'i' } } 
        ]
      };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API 2: Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// API 3: Create Product
// export const createProduct = async (req, res) => {
//   // 🌟 Saari nayi fields ko req.body se nikalenge
//   const { name, description, price, mrp, images, category, supportedModels, materialType, model3D } = req.body;
  
//   try {
//     const newProduct = new Product({ 
//       name, 
//       description, 
//       price, 
//       mrp, 
//       images, 
//       category, 
//       supportedModels, 
//       materialType,
//       model3D
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };




// backend/controllers/productController.js (Ya jahan createProduct ka code hai)

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, mrp, category, images, supportedModels, materialType, model3D, stock } = req.body;

    // 🌟 CONTROL CENTER: Frontend kuch bhi bheje, hum logged-in user ki ID hi lenge
    // Kyunki 'protect' middleware user ki info req.user me daal deta hai
    const vendorId = req.user._id; 

    const newProduct = new Product({
      name,
      description,
      price,
      mrp,
      category: category || "Phone Cover",
      images,
      supportedModels,
      materialType,
      model3D,
      stock: Number(stock) || 0, // Number me convert karke save karein
      
      // 🔥 YEH LINE ERROR KO JADD SE KHATAM KAREGI
      vendorId: vendorId 
    });

    const savedProduct = await newProduct.save();
    await User.findByIdAndUpdate(req.user._id, { $inc: { productsCount: 1 } });
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error("Backend Product Create Error:", error);
    res.status(400).json({ message: error.message });
  }
};



// export const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Pehle check karein ki product exist karta hai ya nahi
//     let product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product nahi mila!" });
//     }

//     const productVendorId = product.vendorId ? product.vendorId.toString() : product.vendorId?.toString();

//     if (req.user.role !== 'admin' && productVendorId !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Aap sirf apne hi products edit kar sakte hain! Aap iske owner nahi hain." });
//     }

//     // if (req.user.role !== 'admin' && product.vendorId.toString() !== req.user._id.toString()) {
//     //   return res.status(403).json({ message: "Aap sirf apne hi products edit kar sakte hain!" });
//     // }

//     // Product ko naye data se update karein
//     product = await Product.findByIdAndUpdate(id, req.body, {
//       new: true, // Taaki updated data return ho
//       runValidators: true
//     });

//     res.status(200).json({ message: "Product successfully update ho gya!", product });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };






// export const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product nahi mila!" });
//     }

//     // Security Check: Admin ya product ka asli Vendor hi delete kar paye
//     if (req.user.role !== 'admin' && product.vendorId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Aap is product ko delete nahi kar sakte!" });
//     }

//     await Product.findByIdAndDelete(id);
// await User.findByIdAndUpdate(req.user._id, { $inc: { productsCount: -1 } });
//     res.status(200).json({ message: "Product successfully delete ho gya!" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔍 SERVER LOGS MEIN CHECK KAREIN YE KYA PRINT KARTA HAI
    console.log("--- DEBUG START ---");
    console.log("Logged In User (req.user):", req.user);
    console.log("Product ID from Params:", id);
    
    // 1. Check karein ki product exist karta hai ya nahi
    let product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product nahi mila!" });
    }

    console.log("Product Vendor ID from DB:", product.vendorId);
    console.log("--- DEBUG END ---");

    // 2. Safe Vendor ID Extraction (Handle null/undefined cleanly)
    const productVendorId = product.vendorId ? product.vendorId.toString() : null;

    // 3. Strict Authorization Check
    // Agar user admin nahi hai, aur product ka vendorId login user ki ID se match nahi karta (ya vendorId mila hi nahi)
    if (req.user.role !== 'admin' && (!productVendorId || productVendorId !== req.user._id.toString())) {
      return res.status(403).json({ 
        message: "Aap sirf apne hi products edit kar sakte hain! Aap iske owner nahi hain." 
      });
    }

    // 4. Product ko naye data se update karein
    product = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Taaki updated data return ho
      runValidators: true
    });

    res.status(200).json({ message: "Product successfully update ho gya!", product });
  } catch (error) {
    console.error("Update Product Error: ", error); // Debugging ke liye server console par print karein
    res.status(500).json({ message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product nahi mila!" });
    }

    // 🌟 FOOLPROOF SECURITY CHECK
    // Pehle handle karo agar model me vendorId ya vendor me se koi ek field string me ho
    const productVendorId = product.vendorId ? product.vendorId.toString() : product.vendor?.toString();

    if (
      req.user.role !== "admin" &&
      productVendorId !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Aap is product ko delete nahi kar sakte! Aap iske owner nahi hain." });
    }

    // Product delete karein
    await Product.findByIdAndDelete(id);

    // User account me product count kam karein (if tracking)
    await User.findByIdAndUpdate(req.user._id, { $inc: { productsCount: -1 } });

    res.status(200).json({ message: "Product successfully delete ho gya!" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: error.message });
  }
};