// import React, { useState } from 'react';
// import axios from 'axios'; // 🌟 createProduct ki jagah direct ya headers ke sath call karenge
// import { useNavigate, Link } from 'react-router-dom';

// export default function AddProduct() {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     mrp: '',
//     images: '', // Isme hum comma-separated image links lenge
//     category: 'Phone Cover',
//     stock: '',
//     supportedModels: '', // Isme hum comma-separated phone models lenge
//     materialType: 'Hard Plastic',
//     model3D: '' // .glb file ka link ya path
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1. 🌟 LocalStorage se logged-in user ki details aur token nikalna
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//     if (!userInfo || !userInfo.token) {
//       alert("🔒 Authorization Failed! Please login again.");
//       return;
//     }

//     try {

//       // 🌟 Crash-proof Validation Checks
//     const finalImages = formData.images && typeof formData.images === 'string'
//       ? formData.images.split(',').map(img => img.trim()).filter(Boolean)
//       : [];

//     const finalModels = formData.supportedModels && typeof formData.supportedModels === 'string'
//       ? formData.supportedModels.split(',').map(model => model.trim()).filter(Boolean)
//       : [];
      
//       // String ko array mein badalna
//       const productData = {
//         ...formData,
//         price: Number(formData.price),
//         mrp: formData.mrp ? Number(formData.mrp) : undefined,
//         stock: Number(formData.stock) || 0, // 🌟 Backend ko Number me bhejna safe rahega
//         category: "Phone Cover", 
//         // images: formData.images.split(',').map(img => img.trim()),
//         images: finalImages,      // 🌟 Ab yeh kabhi undefined nahi hoga
//         // supportedModels: formData.supportedModels.split(',').map(model => model.trim()),
//         supportedModels: finalModels, // 🌟 Ab yeh bhi safe hai
//         model3D: formData.model3D ? formData.model3D.trim() : "",
//         sellerId: userInfo._id,    // 🌟 Flipkart model ke liye seller tracking field
//         sellerName: userInfo.name
//       };

//       // 2. 🌟 Axios call direct headers ke sath taaki 401 Unauthorized Error khatam ho jaye!
//       const res = await axios.post('http://localhost:5000/api/products', productData, {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}` // 🔥 Yeh line backend ko token degi
//         }
//       });

//       if (res.data) {
//         alert('🎉 Phone Cover successfully added to your store!');
        
//         // Form reset karna
//         setFormData({
//           name: '', description: '', price: '', mrp: '', stock: '',
//           images: '', supportedModels: '', materialType: 'Hard Plastic', model3D: ''
//         });

//         navigate('/dashboard'); // Direct dashboard bhej do shop dekhne ke liye
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert(error.response?.data?.message || 'Kuch galti hui product add karne mein.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">

//       {/* Hero Banner */}
//       <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 p-8 md:p-10 shadow-xl mb-8">
//         <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 left-0 w-56 h-56 bg-yellow-300/10 rounded-full blur-3xl"></div>
//         <div className="relative z-10">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white">Register New Product</h1>
//           <p className="text-white/80 mt-3 text-lg">Add products to your inventory and make them available for 3D visualization.</p>
//         </div>
//       </div>

//       {/* Form Card */}
//       <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden">
//         <div className="p-8 md:p-10">

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
//             <h2 className="text-xl font-bold text-gray-800">Add New Phone Cover</h2>
            
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Cover Name</label>
//               <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border rounded-md p-2" placeholder="e.g., Anime Goku Phone Cover" />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full border rounded-md p-2" placeholder="Product premium details..." />
//             </div>

//             {/* Price & MRP */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Selling Price (₹)</label>
//                 <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border rounded-md p-2" placeholder="299" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Original MRP (₹)</label>
//                 <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" placeholder="599" />
//               </div>
//             </div>

//             {/* Material Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Material Type</label>
//               <select name="materialType" value={formData.materialType} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2">
//                 <option value="Hard Plastic">Hard Plastic</option>
//                 <option value="Soft Silicone">Soft Silicone</option>
//                 <option value="Glass Back">Glass Back</option>
//               </select>
//             </div>

//                 {/* 🌟 FIXED: Stock Input Box ko perfect structure ke sath yahan wrap kar diya hai */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Available Stock (Quantity)</label>
//               <input 
//                 type="number" 
//                 name="stock"
//                 placeholder="Eg: 50" 
//                 value={formData.stock} 
//                 onChange={handleChange}
//                 className="mt-1 block w-full border rounded-md p-2"
//                 required 
//               />
//             </div>

//             {/* Supported Models */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Supported Phone Models (Comma separated)</label>
//               <input type="text" name="supportedModels" value={formData.supportedModels} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" placeholder="iPhone 13, iPhone 14, OnePlus 11" />
//             </div>

//             {/* Images Array */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Image URLs (Comma separated)</label>
//               <input type="text" name="images" value={formData.images} onChange={handleChange} required className="mt-1 block w-full border rounded-md p-2" placeholder="url1, url2" />
//             </div>

//             {/* 3D Model Path */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Three.js 3D Model Path (.glb file link)</label>
//               <input type="text" name="model3D" value={formData.model3D} onChange={handleChange} className="mt-1 block w-full border rounded-md p-2" placeholder="/models/phone_cover.glb" />
//             </div>

//             <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition">
//               Add Cover
//             </button>
//           </form>

//         </div>
//       </div>



//        {/* footer */}
//        <div className="mt-10 shadow-xl bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-orange-100">

//          <div className="grid md:grid-cols-3 gap-8">

//            <div>
//              <div className="text-3xl mb-3">📦</div>
//              <h4 className="font-bold text-gray-800">
//                Easy Product Management
//              </h4>
//              <p className="text-gray-500 text-sm mt-2">
//                Quickly register and manage inventory products.
//              </p>
//            </div>

//            <div>
//              <div className="text-3xl mb-3">🎲</div>
//              <h4 className="font-bold text-gray-800">
//                3D Ready
//              </h4>
//              <p className="text-gray-500 text-sm mt-2">    
//                  Products can be integrated with interactive 3D models.
//              </p>
//            </div>

//            <div>
//              <div className="text-3xl mb-3">⚡</div>
//              <h4 className="font-bold text-gray-800">
//                Fast Registration
//              </h4>
//              <p className="text-gray-500 text-sm mt-2">
//                Add products instantly with a clean workflow.
//              </p>
//            </div>

//          </div>

//        </div>

//     </div>
//   );
// }

























































import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    mrp: '',
    images: '', 
    category: 'Phone Cover',
    stock: '',
    supportedModels: '', 
    materialType: 'Hard Plastic',
    model3D: '' 
  });

  // 🟢 Cloudinary Image States
  const [imageFiles, setImageFiles] = useState([]); // Selected images file array
  const [isUploading, setIsUploading] = useState(false); // Loading state

  const navigate = useNavigate();

  // 🟢 File Select Handler (Multiple Upload Support)
  const handleFileChange = (e) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files)); // Saari selected files array mein convert ho jayengi
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  //   if (!userInfo || !userInfo.token) {
  //     alert("🔒 Authorization Failed! Please login again.");
  //     return;
  //   }
    

  //   try {
  //     const finalImages = formData.images && typeof formData.images === 'string'
  //       ? formData.images.split(',').map(img => img.trim()).filter(Boolean)
  //       : [];

  //     const finalModels = formData.supportedModels && typeof formData.supportedModels === 'string'
  //       ? formData.supportedModels.split(',').map(model => model.trim()).filter(Boolean)
  //       : [];
        
  //     const productData = {
  //       ...formData,
  //       price: Number(formData.price),
  //       mrp: formData.mrp ? Number(formData.mrp) : undefined,
  //       stock: Number(formData.stock) || 0, 
  //       category: "Phone Cover", 
  //       images: finalImages,      
  //       supportedModels: finalModels, 
  //       model3D: formData.model3D ? formData.model3D.trim() : "",
  //       sellerId: userInfo._id,    
  //       sellerName: userInfo.name
  //     };

  //     const res = await axios.post('http://localhost:5000/api/products', productData, {
  //       headers: {
  //         Authorization: `Bearer ${userInfo.token}` 
  //       }
  //     });

  //     if (res.data) {
  //       alert('🎉 Phone cover added successfully to your store!');
        
  //       setFormData({
  //         name: '', description: '', price: '', mrp: '', stock: '',
  //         images: '', supportedModels: '', materialType: 'Hard Plastic', model3D: ''
  //       });

  //       navigate('/dashboard'); 
  //     }
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //     alert(error.response?.data?.message || 'Unable to add the product. Please try again.');
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.token) {
      alert("🔒 Authorization Failed! Please login again.");
      return;
    }

    if (imageFiles.length === 0) {
      alert("Please select at least one product image!");
      return;
    }

    setIsUploading(true); // Loading starts

    try {
      const uploadedImageUrls = [];

      // 🔄 Cloudinary Loop: Ek-ek karke saari images upload karega
      for (const file of imageFiles) {
        const cloudinaryData = new FormData();
        cloudinaryData.append('file', file);
        cloudinaryData.append('upload_preset', 'case_x_preset'); // ⚠️ APNA UN-SIGNED PRESET NAME YAHAN LIKHO
        cloudinaryData.append('cloud_name', 'deakb2o7f'); // Aapka cloud name

        const cloudRes = await axios.post(
          'https://api.cloudinary.com/v1_1/deakb2o7f/image/upload',
          cloudinaryData
        );

        uploadedImageUrls.push(cloudRes.data.secure_url); // Secure online link array mein push hoga
      }

      const finalModels = formData.supportedModels && typeof formData.supportedModels === 'string'
        ? formData.supportedModels.split(',').map(model => model.trim()).filter(Boolean)
        : [];
        
      const productData = {
        ...formData,
        price: Number(formData.price),
        mrp: formData.mrp ? Number(formData.mrp) : undefined,
        stock: Number(formData.stock) || 0, 
        category: "Phone Cover", 
        images: uploadedImageUrls, // 🟢 Database mein ab direct Cloudinary URL Array jayega!      
        supportedModels: finalModels, 
        model3D: formData.model3D ? formData.model3D.trim() : "https://res.cloudinary.com/deakb2o7f/raw/upload/v1719082500/default_cover.glb", // Auto fallback model url
        sellerId: userInfo._id,    
        sellerName: userInfo.name
      };

      const res = await axios.post('https://casex-backend-h0xv.onrender.com/api/products', productData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}` 
        }
      });

      if (res.data) {
        alert('🎉 Phone cover added successfully to your store with real images!');
        
        setFormData({
          name: '', description: '', price: '', mrp: '', stock: '',
          supportedModels: '', materialType: 'Hard Plastic', model3D: ''
        });
        setImageFiles([]); // Clear files

        navigate('/dashboard'); 
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response?.data?.message || 'Unable to add the product. Please try again.');
    } finally {
      setIsUploading(false); // Loading stops
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen text-[#E9DEF3] pb-16 selection:bg-purple-500 selection:text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Immersive Theme Hero Banner */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#8f0b54] to-[#500361] p-8 md:p-12 shadow-[0_10px_30px_rgba(207,41,219,0.25)] mb-8 transition-all duration-300">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-900/20 rounded-full blur-2xl"></div>
          <div className="relative z-10 space-y-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20">
              Merchant Panel
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none pt-2">
              Register New Product
            </h1>
            <p className="text-white/80 max-w-xl text-sm md:text-base font-medium leading-relaxed">
              Add products to your inventory and instantly make them ready for immersive 3D web rendering.
            </p>
          </div>
        </div>

        {/* Form Main Container (White Background Maintained) */}
        <div className=" rounded-[32px] shadow-2xl border border-purple-950/10 overflow-hidden relative group">
          <div className="p-6 md:p-12">

            {/* Form Tag layout */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
              <div className="border-b border-gray-100 pb-4 mb-2">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  Add New Phone Cover
                </h2>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
                  Fill up premium asset configuration data
                </p>
              </div>
              
              {/* Core Grid - Splits into 2 cols on screens larger than mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Name */}
                <div className="md:col-span-2 flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Cover Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#CF29DB] focus:ring-2 focus:ring-[#CF29DB]/20 transition-all duration-200 placeholder-gray-400" 
                    placeholder="e.g., Anime Goku Phone Cover" 
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2 flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    rows="3"
                    required 
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-800 text-sm font-medium focus:outline-none focus:bg-white focus:border-[#CF29DB] focus:ring-2 focus:ring-[#CF29DB]/20 transition-all duration-200 placeholder-gray-400 resize-none leading-relaxed" 
                    placeholder="Product premium material and print longevity details..." 
                  />
                </div>

                {/* Selling Price */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Selling Price (₹)</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-800 text-sm font-bold focus:outline-none focus:bg-white focus:border-[#CF29DB] focus:ring-2 focus:ring-[#CF29DB]/20 transition-all duration-200 placeholder-gray-400" 
                    placeholder="299" 
                  />
                </div>

                {/* Original MRP */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Original MRP (₹)</label>
                  <input 
                    type="number" 
                    name="mrp" 
                    value={formData.mrp} 
                    onChange={handleChange} 
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-800 text-sm font-bold focus:outline-none focus:bg-white focus:border-[#CF29DB] focus:ring-2 focus:ring-[#CF29DB]/20 transition-all duration-200 placeholder-gray-400" 
                    placeholder="599" 
                  />
                </div>

                {/* Material Type */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Material Type</label>
                  <select 
                    name="materialType" 
                    value={formData.materialType} 
                    onChange={handleChange} 
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-800 text-sm font-bold focus:outline-none focus:bg-white focus:border-[#CF29DB] transition-all duration-200 cursor-pointer"
                  >
                    <option value="Hard Plastic">Hard Plastic</option>
                    <option value="Soft Silicone">Soft Silicone</option>
                    <option value="Glass Back">Glass Back</option>
                  </select>
                </div>

                {/* Stock Input Box */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Available Stock (Quantity)</label>
                  <input 
                    type="number" 
                    name="stock"
                    placeholder="Eg: 50" 
                    value={formData.stock} 
                    onChange={handleChange}
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-800 text-sm font-bold focus:outline-none focus:bg-white focus:border-[#CF29DB] focus:ring-2 focus:ring-[#CF29DB]/20 transition-all duration-200 placeholder-gray-400" 
                    required 
                  />
                </div>

                {/* Supported Models */}
                <div className="md:col-span-2 flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Supported Phone Models</label>
                  <input 
                    type="text" 
                    name="supportedModels" 
                    value={formData.supportedModels} 
                    onChange={handleChange} 
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#CF29DB] focus:ring-2 focus:ring-[#CF29DB]/20 transition-all duration-200 placeholder-gray-400" 
                    placeholder="iPhone 13, iPhone 14, OnePlus 11 (Comma separated)" 
                  />
                </div>

                {/* Images Array */}
                {/* <div className="md:col-span-2 flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Image URLs</label>
                  <input 
                    type="text" 
                    name="images" 
                    value={formData.images} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#CF29DB] focus:ring-2 focus:ring-[#CF29DB]/20 transition-all duration-200 placeholder-gray-400" 
                    placeholder="url1, url2 (Comma separated)" 
                  />
                </div> */}


                {/* 🟢 CHANGED: Text Input to File Input for Real Photos */}
                <div className="md:col-span-2 flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Product Images File</label>
                  <input 
                    type="file" 
                    multiple // Ek se zyada photos ek sath select karne ke liye
                    accept="image/*"
                    onChange={handleFileChange} 
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-600 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#CF29DB] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer" 
                  />
                </div>

                {/* 3D Model Path */}
                {/* <div className="md:col-span-2 flex flex-col space-y-1.5">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Three.js 3D Model Path (.glb asset url)</label>
                  <input 
                    type="text" 
                    name="model3D" 
                    value={formData.model3D} 
                    onChange={handleChange} 
                    className="w-full bg-slate-50/80 border border-gray-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:bg-white focus:border-[#CF29DB] focus:ring-2 focus:ring-[#CF29DB]/20 transition-all duration-200 placeholder-gray-400" 
                    placeholder="/models/phone_cover.glb" 
                  />
                </div> */}

              </div>

              {/* Submit CTA */}
              <button 
                type="submit" 
                className="w-full mt-4 py-4 bg-gradient-to-r from-[#8f0b54] to-[#500361] text-white font-black text-xs tracking-widest uppercase rounded-xl shadow-lg hover:bg-purple-900 transition-all duration-300 transform active:scale-[0.98]"
              >
                Add Cover 🛒
              </button>
            </form>

          </div>
        </div>

        {/* Neon Themed Descriptive Footer Section */}
        <div className="mt-10 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-[32px] p-6 sm:p-8 border border-purple-900/30 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            <div className="flex gap-4 items-start">
              <div className="text-2xl bg-white w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">📦</div>
              <div>
                <h4 className="font-black text-gray-800 text-sm tracking-wide">Easy Management</h4>
                <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">Quickly register, alter parameters, and maintain your store inventory logs efficiently.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="text-2xl bg-white w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">🎲</div>
              <div>
                <h4 className="font-black text-gray-800 text-sm tracking-wide">3D Space Ready</h4>
                <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">Product configurations sync instantly with active canvas rendering files automatically.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="text-2xl bg-white w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">⚡</div>
              <div>
                <h4 className="font-black text-gray-800 text-sm tracking-wide">Fast Registration</h4>
                <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">Add catalog targets immediately into cluster databases with automated structural workflows.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}