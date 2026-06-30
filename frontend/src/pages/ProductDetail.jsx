// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import axios from 'axios';

// function RotatingObject() {
//   const meshRef = useRef();
//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.008;
//       meshRef.current.rotation.y += 0.012;
//     }
//   });
//   return (
//     <mesh ref={meshRef}>
//       <boxGeometry args={[2.2, 2.2, 2.2]} />
//       <meshStandardMaterial color="#ff6b6b" roughness={0.15} metalness={0.8} />
//     </mesh>
//   );
// }

// // function ModelViewer({ modelUrl }) {
// //   const { scene } = useGLTF(modelUrl);
// //   const modelRef = useRef();
// //   useFrame(() => {
// //     if (modelRef.current) {
// //       modelRef.current.rotation.y += 0.005;
// //     }
// //   });
// //   return <primitive ref={modelRef} object={scene} scale={1.5} position={[0, -1, 0]} />;
// // }

// function ModelViewer({ modelUrl }) {
//   try {
//     // Agar URL khali hai ya image ka link hai toh default local model load kar lo
//     const safeUrl = (modelUrl && modelUrl.endsWith('.glb')) ? modelUrl : '/models/default_cover.glb';
//     const { scene } = useGLTF(safeUrl);
//     return <primitive object={scene} scale={1.5} />;
//   } catch (error) {
//     console.error("3D Model load karne mein dikkat hui:", error);
//     return null; // Component crash nahi hoga, bas model gayab rahega
//   }
// }

// export default function ProductDetail({ productId, refreshProduct }) {

//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1); 
//   const [activeImage, setActiveImage] = useState(0);
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState('');
//   const [images, setImages] = useState([]); // 🌟 Selected images ki state
//   // 🌟 Naya State: Flipkart jise Photo Popup Modal ke liye
//   const [activeImagePopup, setActiveImagePopup] = useState(null);
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     if (product && product.images && product.images.length > 0) {
//       setActiveImage(product.images[0]);
//     }
//   }, [product]);

//   if (loading) {
//     return (
//       <div className="min-h-[80vh] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   if (!product) {
//     return <div className="text-center p-10 font-bold text-red-500">⚠️ Product Not Found!</div>;
//   }

//   const handleIncrease = () => setQuantity(prev => prev + 1);
//   const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

//   const handleBuyNow = () => {
//     const userInfo = localStorage.getItem('userInfo');
//     if (!userInfo) {
//       alert("🔒 Please Login/Signup first to buy products!");
//       navigate('/login');
//       return;
//     }
    
//     // Seedha redirect Checkout Page par quantity aur total price ke sath
//     navigate('/checkout', { 
//       state: { 
//         product, 
//         quantity, 
//         totalPrice: product.price * quantity 
//       } 
//     });
//   };

//   // 🌟 Image ko Base64 me convert karne ka helper function
//   // const handleImageChange = (e) => {
//   //   const files = Array.from(e.target.files);
    
//   //   files.forEach(file => {
//   //     const reader = new FileReader();
//   //     reader.readAsDataURL(file);
//   //     reader.onloadend = () => {
//   //       setImages((prevImages) => [...prevImages, reader.result]);
//   //     };
//   //   });
//   // };


//   // Frontend: ProductDetail.jsx ke andar handleImageChange function ko update karo

// const handleImageChange = (e) => {
//   const files = Array.from(e.target.files);
  
//   files.forEach(file => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       const img = new Image();
//       img.src = reader.result;
//       img.onload = () => {
//         // 🌟 Image ko resize aur compress karne ke liye canvas ka use karenge
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');

//         // Max width ya height 800px set kar rhe hain (Review image ke liye bohot h)
//         const MAX_WIDTH = 800;
//         const MAX_HEIGHT = 800;
//         let width = img.width;
//         let height = img.height;

//         if (width > height) {
//           if (width > MAX_WIDTH) {
//             height *= MAX_WIDTH / width;
//             width = MAX_WIDTH;
//           }
//         } else {
//           if (height > MAX_HEIGHT) {
//             width *= MAX_HEIGHT / height;
//             height = MAX_HEIGHT;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;
//         ctx.drawImage(img, 0, 0, width, height);

//         // 🌟 0.6 ka matlab hai 60% quality par compress karna (Isse size bohot kam ho jata h)
//         const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
        
//         setImages((prevImages) => [...prevImages, compressedBase64]);
//       };
//     };
//   });
// };

//   const submitReviewHandler = async (e) => {
//     e.preventDefault();

//     // 🌟 Safety Check: Agar product data load nahi hua toh pehle hi rok do
//   if (!product || !product._id) {
//     alert("Product data load nahi hua hai, kripya thoda intezar karein!");
//     return;
//   }

//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };
//       const res = await axios.post(`http://localhost:5000/api/products/${product._id}/reviews`, { rating, comment, reviewImages: images }, config);
//       alert(res.data.msg);
//       setComment('');
//       setImages([]); // State clear

//       // refreshProduct(); // Product data dobara fetch karne ke liye function

//       if (typeof refreshProduct === 'function') {
//       refreshProduct();
//     } else {
//       window.location.reload(); 
//     }

//     } catch (err) {
//       alert(err.response && err.response.data.msg ? err.response.data.msg : err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 pb-12">
//       <div className="max-w-7xl mx-auto px-4 pt-6">
//         <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
//           Store / Premium Collection / <span className="text-purple-600 font-bold">{product.name}</span>
//         </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
//         {/* Gallery */}
//         <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
//           <div className="aspect-square w-full bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-50 p-4 group">
//             <img 
//               src={activeImage || (product.images && product.images[0])} 
//               alt={product.name}
//               className="max-h-[320px] w-auto object-contain group-hover:scale-105 transition duration-500"
//             />
//           </div>
          
//           {product.images && product.images.length > 1 && (
//             <div className="flex gap-3 justify-center overflow-x-auto py-2">
//               {product.images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setActiveImage(img)}
//                   className={`w-14 h-14 rounded-xl border-2 overflow-hidden bg-slate-50 p-1 transition-all ${
//                     (activeImage === img || (!activeImage && idx === 0)) ? 'border-purple-600 shadow-md scale-95' : 'border-transparent'
//                   }`}
//                 >
//                   <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* 3D Canvas */}
//         <div className="lg:col-span-4 bg-white rounded-3xl p-5 h-[450px] flex flex-col border border-gray-100 shadow-sm relative group">
//           <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg text-[10px] font-bold text-white tracking-widest uppercase flex items-center gap-1.5">
//             <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span> 3D Interactive Mode
//           </div>
          
//           <div className="w-full h-full min-h-[300px] flex-1 bg-slate-50/50 rounded-2xl overflow-hidden mt-4">
//             <Canvas camera={{ position: [0, 0, 4.5] }}>
//               <ambientLight intensity={1.2} /> 
//               <directionalLight position={[5, 8, 5]} intensity={2} />
//               <directionalLight position={[-5, 5, -5]} intensity={1} /> 
//               <pointLight position={[0, -5, 2]} intensity={0.5} />

//               {product.model3D ? (
//                 <React.Suspense fallback={null}>
//                   <ModelViewer modelUrl={product.model3D} />
//                 </React.Suspense>
//               ) : (
//                 <RotatingObject /> 
//               )}
//               <OrbitControls enableZoom={true} maxDistance={8} minDistance={2} />
//             </Canvas>
//           </div>
//           <p className="text-[11px] text-center text-gray-400 font-medium mt-3">Drag to rotate 360° | Pinch to zoom</p>
//         </div>

//         {/* Product Details & Quantity Counter */}
//         <div className="lg:col-span-4 space-y-5">
//           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl space-y-4">
//             <div>
//               <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
//                 {product.materialType || 'Premium Hard Plastic'}
//               </span>
//               <h1 className="text-2xl font-black text-gray-900 capitalize mt-2 tracking-tight">{product.name}</h1>
//             </div>

//             <div className="flex items-baseline gap-2 pt-1 border-t border-gray-50">
//               <span className="text-3xl font-black text-purple-600">₹{product.price}</span>
//               <span className="text-sm font-semibold text-gray-400 line-through">₹{product.price + 199}</span>
//             </div>

//             <div className="space-y-1">
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Description</p>
//               <p className="text-sm text-gray-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
//                 {product.description || 'No description provided.'}
//               </p>
//             </div>

//             {/* Quantity Selector */}
//             <div className="border-t pt-4 space-y-2">
//               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Select Quantity:</span>
//               <div className="flex items-center justify-between bg-slate-50 border border-gray-200 rounded-2xl p-2 shadow-sm">
//                 <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
//                   <button onClick={handleDecrease} className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-black">-</button>
//                   <span className="px-4 py-1.5 font-bold text-gray-800 w-10 text-center text-sm">{quantity}</span>
//                   <button onClick={handleIncrease} className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-black">+</button>
//                 </div>
//                 <span className="text-xs text-gray-500 font-semibold">Subtotal: <strong className="text-purple-600">₹{product.price * quantity}</strong></span>
//               </div>
//             </div>

//             {/* Pure Buy Now Button */}
//             {/* <button 
//               onClick={handleBuyNow}
//               className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-lg transition-all active:scale-[0.98] tracking-wide uppercase"
//             >
//               Buy Now 🛒
//             </button> */}



//             {/* Stock Info display */}
//   <p className="text-xs font-semibold mt-1">
//     {product.stock > 0 ? (
//       <span className="text-emerald-600">🟢 In Stock ({product.stock} pieces left)</span>
//     ) : (
//       <span className="text-red-500 font-bold">🔴 Out of Stock (Jaldi hi aayega!)</span>
//     )}
//   </p>

//   <div className="text-2xl font-black text-purple-600 mt-2">₹{product.price * quantity}</div>

//   {/* Buy Now Button Handling */}
//   <button
//     disabled={product.stock <= 0}
//     onClick={handleBuyNow}
//     className={`w-full mt-6 py-3 rounded-2xl font-bold text-sm tracking-wide transition ${
//       product.stock <= 0 
//         ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
//         : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:opacity-90'
//     }`}
//   >
//     {product.stock <= 0 ? 'Out of Stock' : '⚡ Buy Now'}
//   </button>
//           </div>
//         </div>

//       </div>


//       <div className="p-6 bg-gray-50 rounded-3xl mt-8 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Customer Reviews ⭐</h2>
      
//       {/* ✍️ Write a Review Form (Only for logged-in users) */}
//       {userInfo ? (
//         <form onSubmit={submitReviewHandler} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-3">Write a Honest Review</h3>
          
//           <div className="mb-3">
//             <label className="block text-xs font-semibold text-gray-500 mb-1">Rating</label>
//             <select 
//               value={rating} 
//               onChange={(e) => setRating(e.target.value)}
//               className="w-full p-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               <option value="5">5 - Excellent ⭐⭐⭐⭐⭐</option>
//               <option value="4">4 - Very Good ⭐⭐⭐⭐</option>
//               <option value="3">3 - Good ⭐⭐⭐</option>
//               <option value="2">2 - Fair ⭐⭐</option>
//               <option value="1">1 - Poor ⭐</option>
//             </select>
//           </div>


//           {/* 📸 Image Input Field */}
//             <div>
//               <label className="block text-xs font-semibold text-gray-500 mb-1">Upload Product Photos (Optional)</label>
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 multiple 
//                 onChange={handleImageChange}
//                 className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
//               />
//             </div>

//             {/* Image Preview Box */}
//           {images.length > 0 && (
//             <div className="flex gap-2 mb-3 overflow-x-auto p-1 border border-dashed rounded-xl">
//               {images.map((img, index) => (
//                 <img key={index} src={img} alt="preview" className="w-16 h-16 object-cover rounded-lg border shadow-sm" />
//               ))}
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-xs font-semibold text-gray-500 mb-1">Comment</label>
//             <textarea
//               rows="3"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Cover ki quality kaisi hai? Fit cutting sahi hai?"
//               className="w-full p-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             ></textarea>
//           </div>

//           <button type="submit" className="bg-gradient-to-r from-orange-500 to-purple-600 text-white text-sm font-semibold px-6 py-2 rounded-xl shadow-md hover:opacity-90 transition">
//             Submit Review
//           </button>
//         </form>
//       ) : (
//         <p className="text-sm text-gray-500">Review likhne ke liye please login karein.</p>
//       )}


//       {/* 🧾 Review List */}
//       {/* <div className="space-y-4 mb-6">
//         <h3 className="text-lg font-bold text-gray-700 mb-2">All Customer Feedback</h3>
//         {product.reviews?.length === 0 ? (
//           <p className="text-gray-500 text-sm">Abhi tak koi reviews nahi hain. Pehle customer baniye!</p>
//         ) : (
//           product.reviews?.map((rev) => (
//             <div key={rev._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="font-bold text-gray-700 text-sm">{rev.name}</span>
//                 <span className="text-yellow-500 font-semibold text-sm">{'⭐'.repeat(rev.rating)}</span>
//               </div>
//               <p className="text-gray-600 text-sm">{rev.comment}</p>
//               <span className="text-[10px] text-gray-400">{new Date(rev.createdAt).toLocaleDateString()}</span>
//             </div>
//           ))
//         )}
//       </div> */}

    
//         {/* 🧾 2. Review List - AB YEH NEECHE KISAK GAYA HAI */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-bold text-gray-700 mb-2">All Customer Feedback</h3>
//         {product.reviews?.length === 0 ? (
//           <p className="text-gray-500 text-sm">Abhi tak koi reviews nahi hain. Pehle customer baniye!</p>
//         ) : (
//           // .reverse() kiya taaki naya review hamesha sabse pehle list me dikhe
//           [...product.reviews].reverse().map((rev) => (
//             <div key={rev._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="font-bold text-gray-700 text-sm">{rev.name}</span>
//                 <span className="text-yellow-500 font-semibold text-sm">{'⭐'.repeat(rev.rating)}</span>
//               </div>
//               <p className="text-gray-600 text-sm mb-2">{rev.comment}</p>
              
//               {/* 📸 Review ki upload ki hui images dikhane ke liye section */}
//               {rev.reviewImages && rev.reviewImages.length > 0 && (
//                 <div className="flex gap-2 my-2">
//                   {rev.reviewImages.map((imgUrl, i) => (
//                     <img 
//                       key={i} 
//                       src={imgUrl} 
//                       alt="Customer upload" 
//                       className="w-20 h-20 object-cover rounded-xl border cursor-pointer hover:scale-105 transition duration-200" 
//                       onClick={() => {
//       setActiveImagePopup(imgUrl);
//     }}
//                     />
//                   ))}
//                 </div>
//               )}
              
//               <div className="text-[10px] text-gray-400 mt-1">{new Date(rev.createdAt).toLocaleDateString()}</div>
//             </div>
//           ))
//         )}
//       </div>


//         {/* 🌟 FLIPKART STYLE BIG IMAGE POPUP MODAL */}
//       {activeImagePopup && (
//         <div 
//           className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
//           onClick={() => setActiveImagePopup(null)} // Bahar click karne par modal close ho jayega
//         >
//           <div className="relative max-w-2xl max-h-[85vh] bg-white p-2 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center">
//             {/* Close Button */}
//             <button 
//               onClick={() => setActiveImagePopup(null)}
//               className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg hover:bg-black/80 transition shadow-md"
//             >
//               ✕
//             </button>
            
//             <img 
//               src={activeImagePopup} 
//               alt="Zoomed Review" 
//               className="max-w-full max-h-[75vh] object-contain rounded-2xl"
//               onClick={(e) => e.stopPropagation()} // Image par click karne se modal close nahi hoga
//             />
//           </div>
//         </div>
//       )}
    



//            {/* footer */}
//        <div className="mt-10 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-orange-100">

//          <div className="grid md:grid-cols-3 gap-8">

//            <div>
//              <div className="text-3xl mb-3">🎲</div>
//              <h4 className="font-bold text-gray-800">
//                Interactive 3D View
//              </h4>
//              <p className="text-gray-500 text-sm mt-2">
//                Explore every angle of the product in real time.
//              </p>
//            </div>

//            <div>
//              <div className="text-3xl mb-3">⚡</div>
//              <h4 className="font-bold text-gray-800">
//                High Performance
//              </h4>
//              <p className="text-gray-500 text-sm mt-2">
//                Smooth rendering powered by Three.js.
//              </p>
//            </div>

//            <div>
//              <div className="text-3xl mb-3">🛡️</div>
//              <h4 className="font-bold text-gray-800">
//                Premium Experience
//              </h4>
//              <p className="text-gray-500 text-sm mt-2">
//                Modern UI with immersive product interaction.
//              </p>
//            </div>

//          </div>

//        </div>

//     </div>

//     </div>
//   );
// }



























































import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import axios from 'axios';

function RotatingObject() {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008;
      meshRef.current.rotation.y += 0.012;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2.2, 2.2, 2.2]} />
      <meshStandardMaterial color="#ff6b6b" roughness={0.15} metalness={0.8} />
    </mesh>
  );
}

function ModelViewer({ modelUrl }) {
  try {
    const safeUrl = (modelUrl && modelUrl.endsWith('.glb')) ? modelUrl : '/models/default_cover.glb';
    const { scene } = useGLTF(safeUrl);
    return <primitive object={scene} scale={1.5} />;
  } catch (error) {
    console.error("3D Model load karne mein dikkat hui:", error);
    return null;
  }
}


// function ModelViewer({ modelUrl }) {
//   // Agar database mein link na ho, toh yeh sample model load hoga
//   const fallbackUrl = "https://res.cloudinary.com/deakb2o7f/raw/upload/v1719082500/default_cover.glb";
  
//   const finalUrl = modelUrl ? modelUrl : fallbackUrl;

//   // useGLTF bina kisi CORS issue ke isse load kar lega
//   const { scene } = useGLTF(finalUrl);

//   React.useEffect(() => {
//     return () => {
//       if (finalUrl) useGLTF.clear(finalUrl);
//     };
//   }, [finalUrl]);

//   return <primitive object={scene} scale={1.8} position={[0, 0, 0]} />;
// }

// 🟢 2. Ek chhota sa Error Fallback Component banao (In case link galat ho ya crash ho)
// class ModelErrorBoundary extends React.Component {
//   state = { hasError: false };
//   static getDerivedStateFromError(error) {
//     return { hasError: true };
//   }
//   componentDidCatch(error, errorInfo) {
//     console.error("3D Model load nahi ho paya:", error);
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <mesh>
//           <boxGeometry args={[2, 2, 2]} />
//           <meshStandardMaterial color="#ef4444" wireframe />
//         </mesh>
//       );
//     }
//     return this.props.children;
//   }
// }




export default function ProductDetail({ productId, refreshProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); 
  const [activeImage, setActiveImage] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]); 
  const [activeImagePopup, setActiveImagePopup] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d0620]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#0d0620]">
        <div className="text-center p-10 font-black text-xl text-red-500 bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-md">
          ⚠️ Product Not Found!
        </div>
      </div>
    );
  }

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleBuyNow = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      alert("🔒 Please Login/Signup first to buy products!");
      navigate('/login');
      return;
    }
    
    navigate('/checkout', { 
      state: { 
        product, 
        quantity, 
        totalPrice: product.price * quantity 
      } 
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
          setImages((prevImages) => [...prevImages, compressedBase64]);
        };
      };
    });
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!product || !product._id) {
      alert("Product data is not available yet. Please try again shortly.");
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.post(`http://localhost:5000/api/products/${product._id}/reviews`, { rating, comment, reviewImages: images }, config);
      alert(res.data.msg);
      setComment('');
      setImages([]);

      if (typeof refreshProduct === 'function') {
        refreshProduct();
      } else {
        window.location.reload(); 
      }
    } catch (err) {
      alert(err.response && err.response.data.msg ? err.response.data.msg : err.message);
    }
  };

  return (
    // <div className="min-h-screen  text-[#E9DEF3] pb-16 selection:bg-purple-500 selection:text-white">
    //   {/* Breadcrumb Section */}
    //   <div className="max-w-7xl mx-auto px-4 pt-8 ">
    //     <p className="text-xs font-bold text-[#816dc5] tracking-widest uppercase inline-block px-4 py-2 rounded-full border-3 border-purple-900/40 backdrop-blur-sm">
    //       Store / Premium Collection / <span className="bg-gradient-to-r from-[#CF29DB] to-[#fc705d] bg-clip-text text-transparent font-black">{product.name}</span>
    //     </p>
    //   </div>

    //   {/* Main Core Layout Wrapper */}
    //   <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
        
    //     {/* 1. Gallery Section */}
    //     <div className="lg:col-span-4  p-5 sm:p-6 rounded-[32px] border border-purple-900/30 shadow-xl space-y-4 backdrop-blur-md relative overflow-hidden group">
    //       <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#CF29DB]/10 rounded-full blur-3xl"></div>
    //       <div className="aspect-square w-full rounded-2xl overflow-hidden flex items-center justify-center border border-purple-900/20 p-4 relative z-10">
    //         <img 
    //           src={activeImage || (product.images && product.images[0])} 
    //           alt={product.name}
    //           className="max-h-[320px] w-auto object-contain transform group-hover:scale-105 transition-all duration-500 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
    //         />
    //       </div>
          
    //       {product.images && product.images.length > 1 && (
    //         <div className="flex gap-3 justify-center overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-purple-900">
    //           {product.images.map((img, idx) => (
    //             <button
    //               key={idx}
    //               onClick={() => setActiveImage(img)}
    //               className={`w-14 h-14 rounded-xl border-2 overflow-hidden p-1 transition-all shrink-0 ${
    //                 (activeImage === img || (!activeImage && idx === 0)) 
    //                   ? 'border-[#CF29DB] shadow-[0_0_15px_rgba(207,41,219,0.4)] scale-95' 
    //                   : 'border-purple-900/30 hover:border-purple-500/50'
    //               }`}
    //             >
    //               <img src={img} alt="thumbnail" className="w-full h-full object-contain rounded-lg" />
    //             </button>
    //           ))}
    //         </div>
    //       )}
    //     </div>

    //     {/* 2. 3D Canvas Box */}
    //     {/* <div className="lg:col-span-4  rounded-[32px] p-5 h-[480px] flex flex-col border border-purple-900/30 shadow-xl relative overflow-hidden backdrop-blur-md">
    //       <div className="absolute top-4 left-4 z-10 bg-[#0d0722]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30 shadow-lg text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 text-purple-200">
    //         <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></span> 3D Interactive Mode
    //       </div>
          
    //       <div className="w-full h-full min-h-[300px] flex-1  rounded-2xl overflow-hidden mt-10 border border-purple-900/30">
    //         <Canvas camera={{ position: [0, 0, 4.5] }}>
    //           <ambientLight intensity={1.2} /> 
    //           <directionalLight position={[5, 8, 5]} intensity={2} />
    //           <directionalLight position={[-5, 5, -5]} intensity={1} /> 
    //           <pointLight position={[0, -5, 2]} intensity={0.5} />

    //           {product.model3D ? (
    //             <React.Suspense fallback={null}>
    //               <ModelViewer modelUrl={product.model3D} />
    //             </React.Suspense>
    //           ) : (
    //             <RotatingObject /> 
    //           )}
    //           <OrbitControls enableZoom={true} maxDistance={8} minDistance={2} />
    //         </Canvas>



    //       </div>
    //       <p className="text-[13px] text-center text-[#816dc5] font-medium mt-3 tracking-wide">Drag to rotate 360° | Pinch to zoom</p>
    //     </div> */}

    //     {/* 3. Product Info & CTAs */}
    //     <div className="lg:col-span-4 space-y-5 w-full">
    //       <div className="p-6 rounded-[32px] border border-purple-900/30 shadow-2xl space-y-5 relative overflow-hidden backdrop-blur-md">
    //         <div className="absolute -right-16 -bottom-16 w-36 h-36 bg-[#ff6a00]/5 rounded-full blur-3xl"></div>
            
    //         <div>
    //           <span className="px-3 py-1 bg-[#0d0722]/90 border border-purple-500/30 text-purple-200 text-[10px] font-black uppercase tracking-widest rounded-full">
    //             {product.materialType || 'Premium Hard Plastic'}
    //           </span>
    //           <h1 className="text-2xl sm:text-3xl font-black text-purple-950/60 capitalize mt-3 tracking-tight leading-tight">
    //             {product.name}
    //           </h1>
    //         </div>

    //         <div className="flex items-baseline gap-3 pt-2 border-t border-[#e4e4e4]">
    //           <span className="text-3xl font-black bg-gradient-to-r from-[#CF29DB] to-[#fc705d] bg-clip-text text-transparent">₹{product.price * quantity}</span>
    //           <span className="text-sm font-bold text-[#979797] line-through">₹{(product.price + 199) * quantity}</span>
    //         </div>

    //         <div className="space-y-2">
    //           <p className="text-xs font-black text-[#979797] uppercase tracking-widest">Description</p>
    //           <p className="text-sm text-purple-950 font-medium  p-4 rounded-2xl border border-[#979797] leading-relaxed">
    //             {product.description || 'No description provided.'}
    //           </p>
    //         </div>

    //         {/* Quantity Selector Container */}
    //         <div className="border-t border-[#e4e4e4] pt-4 space-y-3">
    //           <span className="text-xs font-black text-[#979797] uppercase tracking-widest block">Select Quantity:</span>
    //           <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-[#979797] rounded-2xl p-3 gap-3">
    //             <div className="flex items-center border border-purple-900/40 rounded-xl overflow-hidden self-start sm:self-auto">
    //               <button onClick={handleDecrease} className="px-4 py-2 hover:bg-purple-900/40 text-purple-950 font-black transition">-</button>
    //               <span className="px-4 py-2 font-black text-purple-950 w-12 text-center text-sm">{quantity}</span>
    //               <button onClick={handleIncrease} className="px-4 py-2 hover:bg-purple-900/40 text-purple-950 font-black transition ">+</button>
    //             </div>
    //             <span className="text-xs text-purple-950 font-semibold">Subtotal: <strong className="text-purple-950 text-sm font-black ml-1">₹{product.price * quantity}</strong></span>
    //           </div>
    //         </div>

    //         {/* Stock Info display */}
    //         <div className="pt-2 flex items-center justify-between">
    //           <p className="text-xs font-bold tracking-wide">
    //             {product.stock > 0 ? (
    //               <span className="text-green-500 flex items-center gap-1.5">
    //                 <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span> In Stock ({product.stock} left)
    //               </span>
    //             ) : (
    //               <span className="text-red-400 flex items-center gap-1.5">
    //                 <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span> Out of Stock
    //               </span>
    //             )}
    //           </p>
    //         </div>

    //         {/* Action CTA Button */}
    //         <button
    //           disabled={product.stock <= 0}
    //           onClick={handleBuyNow}
    //           className={`w-full py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all duration-300 transform active:scale-95 ${
    //             product.stock <= 0 
    //               ? 'bg-purple-950/20 text-purple-300/20 border border-purple-950 cursor-not-allowed' 
    //               : 'bg-gradient-to-r from-[#CF29DB] via-[#F8429D] to-[#fc705d] text-white shadow-[0_4px_20px_rgba(207,41,219,0.3)] hover:opacity-90 hover:shadow-[0_4px_25px_rgba(207,41,219,0.5)]'
    //           }`}
    //         >
    //           {product.stock <= 0 ? 'Out of Stock' : '⚡ Buy Now'}
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* --- Reviews Section --- */}
    //   <div className="p-4 sm:p-8 rounded-[32px] border border-purple-900/30 mt-12 max-w-7xl mx-auto shadow-2xl relative overflow-hidden mx-4 md:mx-auto">
    //     <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/5 rounded-full blur-3xl"></div>
    //     <h2 className="text-xl sm:text-2xl font-black mb-6 text-purple-950 tracking-tight border-b border-purple-950 pb-4 flex items-center gap-2">
    //       Customer Reviews <span className="text-sm bg-purple-950 text-gray-100 px-3 py-1 rounded-full border border-purple-900/40">⭐ {product.reviews?.length || 0}</span>
    //     </h2>
        
    //     {/* Review Form Container */}
    //     {userInfo ? (
    //       <form onSubmit={submitReviewHandler} className="p-5 sm:p-6 rounded-2xl shadow-inner space-y-4 mb-10">
    //         <h3 className="text-base font-black text-purple-950 tracking-wide">Write an Honest Review</h3>
            
    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //           <div className="space-y-1">
    //             <label className="block text-[10px] font-black text-[#816dc5] uppercase tracking-widest">Rating</label>
    //             <select 
    //               value={rating} 
    //               onChange={(e) => setRating(e.target.value)}
    //               className="w-full p-3 border border-purple-900/40 rounded-xl text-xs text-[#816dc5] font-bold focus:outline-none focus:border-[#CF29DB] transition cursor-pointer"
    //             >
    //               <option value="5" className="bg-[#0d0722]">5 - Excellent ⭐⭐⭐⭐⭐</option>
    //               <option value="4" className="bg-[#0d0722]">4 - Very Good ⭐⭐⭐⭐</option>
    //               <option value="3" className="bg-[#0d0722]">3 - Good ⭐⭐⭐</option>
    //               <option value="2" className="bg-[#0d0722]">2 - Fair ⭐⭐</option>
    //               <option value="1" className="bg-[#0d0722]">1 - Poor ⭐</option>
    //             </select>
    //           </div>

    //           <div className="space-y-1">
    //             <label className="block text-[10px] font-black text-[#816dc5] uppercase tracking-widest">Upload Product Photos (Optional)</label>
    //             <div className="relative w-full h-10 border border-purple-900/40 rounded-xl flex items-center px-3 cursor-pointer hover:border-purple-500/50 transition">
    //               <input 
    //                 type="file" 
    //                 accept="image/*" 
    //                 multiple 
    //                 onChange={handleImageChange}
    //                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
    //               />
    //               <span className="text-[11px] text-[#816dc5] font-medium truncate">Choose file layout...</span>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Embedded Image Previews */}
    //         {images.length > 0 && (
    //           <div className="flex gap-2 p-2 border border-dashed border-purple-900/60 rounded-xl overflow-x-auto bg-[#160d33]/50">
    //             {images.map((img, index) => (
    //               <img key={index} src={img} alt="preview" className="w-14 h-14 object-cover rounded-lg border border-purple-900/60 shadow-md transform hover:scale-95 transition" />
    //             ))}
    //           </div>
    //         )}

    //         <div className="space-y-1">
    //           <label className="block text-[10px] font-black text-[#816dc5] uppercase tracking-widest">Comment</label>
    //           <textarea
    //             rows="3"
    //             value={comment}
    //             onChange={(e) => setComment(e.target.value)}
    //             placeholder="Share your experience with this phone cover..."
    //             className="w-full p-4  border border-purple-900/40 rounded-xl text-xs text-[#816dc5] placeholder-[#816dc5] focus:outline-none focus:border-[#CF29DB] transition resize-none font-medium leading-relaxed"
    //             required
    //           ></textarea>
    //         </div>

    //         <button type="submit" className="bg-gradient-to-r from-[#CF29DB] to-[#fc705d] text-white text-xs font-black tracking-widest uppercase px-6 py-3 rounded-xl shadow-lg hover:opacity-95 transition-all transform active:scale-95">
    //           Submit Review
    //         </button>
    //       </form>
    //     ) : (
    //       <p className="text-xs font-bold text-[#816dc5]  p-4 rounded-xl text-center tracking-wide mb-8">
    //         🔒 Please log in to write a review.
    //       </p>
    //     )}

    //     {/* Feedback Listing Row Container */}
    //     <div className="space-y-4">
    //       <h3 className="text-sm font-black text-purple-950 uppercase tracking-widest mb-4 ml-5">All Customer Feedback</h3>
    //       {product.reviews?.length === 0 ? (
    //         <p className="text-[#816dc5] text-xs font-bold text-center py-6 rounded-2xl border border-[#9782db] tracking-wide ml-5">
    //           No reviews yet. Be the first to review this product!
    //         </p>
    //       ) : (
    //         [...product.reviews].reverse().map((rev) => (
    //           <div key={rev._id} className="p-5 rounded-2xl border border-[#9782db] shadow-md space-y-3 relative group transition hover:border-purple-900/40">
    //             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
    //               <span className="font-black text-[#816dc5] text-sm tracking-tight capitalize">{rev.name}</span>
    //               <span className="text-yellow-500 font-semibold text-xs bg-yellow-500/5 px-2.5 py-0.5 rounded-full border border-yellow-500/20 tracking-widest">
    //                 {'★'.repeat(rev.rating)}
    //               </span>
    //             </div>
    //             <p className="text-[#816dc5] text-xs sm:text-sm leading-relaxed font-medium">{rev.comment}</p>
                
    //             {rev.reviewImages && rev.reviewImages.length > 0 && (
    //               <div className="flex gap-2.5 pt-1 overflow-x-auto">
    //                 {rev.reviewImages.map((imgUrl, i) => (
    //                   <img 
    //                     key={i} 
    //                     src={imgUrl} 
    //                     alt="Customer upload" 
    //                     className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-purple-950 cursor-pointer hover:scale-105 hover:border-purple-500/40 transition duration-300 shadow-md" 
    //                     onClick={() => setActiveImagePopup(imgUrl)}
    //                   />
    //                 ))}
    //               </div>
    //             )}
                
    //             <div className="text-[9px] font-bold text-[#9782db] tracking-widest uppercase pt-2 border-t border-purple-950/40">
    //               {new Date(rev.createdAt).toLocaleDateString()}
    //             </div>
    //           </div>
    //         ))
    //       )}
    //     </div>
    //   </div>

    //   {/* Modern Neon Tech Features Footer Block */}
    //   <div className="mt-14 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-[32px] p-6 sm:p-8 max-w-7xl mx-auto shadow-xl mx-4 lg:mx-auto">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    //       <div className="flex gap-4 items-start">
    //         <div className="text-2xl bg-white w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">🎲</div>
    //         <div>
    //           <h4 className="font-black text-gray-800 text-sm tracking-wide">Interactive 3D View</h4>
    //           <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">Explore every angle of the product in real time before making your move.</p>
    //         </div>
    //       </div>

    //       <div className="flex gap-4 items-start">
    //         <div className="text-2xl bg-white w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">⚡</div>
    //         <div>
    //           <h4 className="font-black text-gray-800 text-sm tracking-wide">High Performance</h4>
    //           <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">Smooth rendering hardware accelerated, powered directly by Three.js architecture.</p>
    //         </div>
    //       </div>

    //       <div className="flex gap-4 items-start">
    //         <div className="text-2xl bg-white w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">🛡️</div>
    //         <div>
    //           <h4 className="font-black text-gray-800 text-sm tracking-wide">Premium Experience</h4>
    //           <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">Modern UI flows wrapped in immersive animations for a true tactile feel.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Immersive Image Popup Modal Wrapper */}
    //   {activeImagePopup && (
    //     <div 
    //       className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300"
    //       onClick={() => setActiveImagePopup(null)}
    //     >
    //       <div className="relative max-w-3xl max-h-[90vh] bg-[#160d33] p-1.5 sm:p-2 rounded-3xl border border-purple-500/20 overflow-hidden shadow-2xl flex flex-col items-center">
    //         <button 
    //           onClick={() => setActiveImagePopup(null)}
    //           className="absolute top-4 right-4 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center font-black text-sm hover:bg-black/90 transition shadow-lg border border-white/10 z-10"
    //         >
    //           ✕
    //         </button>
    //         <img 
    //           src={activeImagePopup} 
    //           alt="Zoomed Review" 
    //           className="max-w-full max-h-[80vh] object-contain rounded-2xl filter drop-shadow-2xl"
    //           onClick={(e) => e.stopPropagation()} 
    //         />
    //       </div>
    //     </div>
    //   )}

    // </div>








































    //new 
    <div className="bg-slate-50 min-h-screen pb-20 selection:bg-purple-600 selection:text-white">
      
      {/* Premium Breadcrumb Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm">
          Store / Premium Collection / 
          <span className="bg-gradient-to-r from-[#CF29DB] to-[#fc705d] bg-clip-text text-transparent font-black ml-1.5">
            {product.name}
          </span>
        </p>
      </div>

      {/* Balanced Core Layout Grid System */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 1. Dynamic Gallery Column Block (Takes 5 Columns on Desktop for Asymmetric Balance) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-[28px] border border-slate-100 shadow-xl space-y-5 lg:sticky lg:top-6 transition-all duration-300">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-6 flex items-center justify-center relative group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <img 
              src={activeImage || (product.images && product.images[0]) || 'https://via.placeholder.com/400'} 
              alt={product.name}
              className="max-h-[340px] w-auto object-contain transform group-hover:scale-105 transition-all duration-500 filter drop-shadow-xl"
            />
          </div>
          
          {/* Multi-thumbnail Horizontal Track Roll */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2.5 justify-center overflow-x-auto py-1 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-xl border-2 overflow-hidden p-1 transition-all duration-200 shrink-0 bg-slate-50 ${
                    (activeImage === img || (!activeImage && idx === 0)) 
                      ? 'border-[#CF29DB] shadow-md scale-95' 
                      : 'border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-contain rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Content Info Panel Engine (Takes 7 Columns on Desktop to Fill the Balance) */}
        <div className="lg:col-span-7 space-y-6 w-full">
          
          {/* Main Core Specifications Wrapper Card */}
          <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-slate-100 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-[#ff6a00]/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-purple-50 border border-purple-100 text-purple-700 text-[11px] font-black uppercase tracking-widest rounded-full">
                {product.materialType || 'Premium Hard Plastic'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-purple-950/60 capitalize tracking-tight leading-tight pt-1">
                {product.name}
              </h1>
            </div>

            {/* Dynamic Real-Time Pricing Track */}
            <div className="flex items-baseline gap-3.5 py-4 border-y border-slate-100">
              <span className="text-3xl font-black bg-gradient-to-r from-[#CF29DB] via-[#F8429D] to-[#fc705d] bg-clip-text text-transparent tracking-tight">
                ₹{product.price * quantity}
              </span>
              <span className="text-sm font-bold text-slate-400 line-through font-mono">
                ₹{(product.price + 199) * quantity}
              </span>
            </div>

            {/* Product Meta Description Details Block */}
            <div className="space-y-1.5">
              <p className="text-[13px] font-black text-slate-400 uppercase tracking-widest">Description</p>
              <div className="text-s sm:text-sm text-slate-600 font-medium p-4 rounded-xl bg-slate-50/50 border border-slate-100 leading-relaxed">
                {product.description || 'No description provided.'}
              </div>
            </div>

            {/* Quantity Selector Metric Control Panel */}
            <div className="pt-2 space-y-2">
              <span className="text-[13px] font-black text-slate-400 uppercase tracking-widest block">Select Quantity</span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-slate-100 bg-slate-50/50 rounded-xl p-3 gap-3">
                <div className="flex items-center bg-white border border-slate-200/60 rounded-lg overflow-hidden self-start sm:self-auto shadow-sm">
                  <button type="button" onClick={handleDecrease} className="px-3.5 py-1.5 hover:bg-slate-50 text-slate-800 font-black transition text-s">-</button>
                  <span className="px-3 py-1.5 font-black text-slate-800 w-10 text-center text-s font-mono">{quantity}</span>
                  <button type="button" onClick={handleIncrease} className="px-3.5 py-1.5 hover:bg-slate-50 text-slate-800 font-black transition text-s">+</button>
                </div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Subtotal: <strong className="text-purple-950 text-sm font-black ml-1 font-mono">₹{product.price * quantity}</strong>
                </span>
              </div>
            </div>

            {/* Inventory Real-Time Stock Tracker Notification */}
            <div className="pt-1 flex items-center justify-between text-xs font-bold">
              {product.stock > 0 ? (
                <span className="text-emerald-600 bg-emerald-50 border border-emerald-100/60 px-3 py-1 rounded-full flex items-center gap-1.5 text-s">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> In Stock ({product.stock} left)
                </span>
              ) : (
                <span className="text-red-500 bg-red-50 border border-red-100/60 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span> Out of Stock
                </span>
              )}
            </div>

            {/* Primary Action Button Trigger */}
            <div className="pt-2">
              <button
                type="button"
                disabled={product.stock <= 0}
                onClick={handleBuyNow}
                className={`w-full py-4 rounded-xl font-black text-xs tracking-widest uppercase transition-all duration-200 shadow-md transform active:scale-[0.99] ${
                  product.stock <= 0 
                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none' 
                    : 'bg-gradient-to-r from-[#CF29DB] via-[#F8429D] to-[#fc705d] text-white shadow-purple-100 hover:opacity-95'
                }`}
              >
                {product.stock <= 0 ? 'Out of Stock' : '⚡ Buy Now'}
              </button>
            </div>
          </div>

          {/* --- Extended Immersive Reviews Segment --- */}
          <div className="bg-white p-5 sm:p-6 rounded-[28px] border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <h2 className="text-xl sm:text-lg font-black mb-5 text-slate-800 tracking-tight border-b border-slate-100 pb-3 flex items-center gap-2">
              Customer Reviews 
              <span className="text-[12px] bg-slate-900 text-slate-50 px-2.5 py-0.5 rounded-md font-black">
                ⭐ {product.reviews?.length || 0}
              </span>
            </h2>
            
            {/* Embedded Active Review Creator Sheet */}
            {userInfo ? (
              <form onSubmit={submitReviewHandler} className="p-4 sm:p-5 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-4 mb-8">
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider">Write an Honest Review</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">Rating Tier</label>
                    <select 
                      value={rating} 
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 font-bold focus:outline-none focus:border-purple-500 transition cursor-pointer"
                    >
                      <option value="5">5 - Excellent ⭐⭐⭐⭐⭐</option>
                      <option value="4">4 - Very Good ⭐⭐⭐⭐</option>
                      <option value="3">3 - Good ⭐⭐⭐</option>
                      <option value="2">2 - Fair ⭐⭐</option>
                      <option value="1">1 - Poor ⭐</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">Product Live Snippets (Optional)</label>
                    <div className="relative w-full h-11 bg-white border border-slate-200 rounded-xl flex items-center px-3 cursor-pointer hover:border-slate-300 transition">
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <span className="text-[11px] text-slate-400 font-medium truncate">Choose image layout files...</span>
                    </div>
                  </div>
                </div>

                {/* Local Reactive File Image Previews */}
                {images.length > 0 && (
                  <div className="flex gap-2 p-2 border border-dashed border-slate-200 rounded-xl overflow-x-auto bg-white shadow-inner">
                    {images.map((img, index) => (
                      <img key={index} src={img} alt="preview" className="w-12 h-12 object-cover rounded-lg border border-slate-100 shadow-sm" />
                    ))}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">Review Notes</label>
                  <textarea
                    rows="2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your absolute tactical experience with this phone cover..."
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-500 transition resize-none font-medium leading-relaxed"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="bg-gradient-to-r from-[#CF29DB] to-[#fc705d] text-white text-[10px] font-black tracking-widest uppercase px-5 py-3 rounded-xl shadow-md hover:opacity-95 transition-all transform active:scale-95">
                  Submit Review
                </button>
              </form>
            ) : (
              <div className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-100 p-4 rounded-xl text-center tracking-wide mb-6">
                🔒 Please log in to publish a structural evaluation review.
              </div>
            )}

            {/* Dynamic Customer Logs Stack Row */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">All Customer Feedback</h3>
              {product.reviews?.length === 0 ? (
                <div className="text-slate-400 text-xs font-bold text-center py-8 rounded-xl border border-dashed border-slate-200 bg-slate-50/40 tracking-wide">
                  No reviews yet. Be the first to evaluate this device wrap architecture!
                </div>
              ) : (
                <div className="space-y-3">
                  {[...product.reviews].reverse().map((rev) => (
                    <div key={rev._id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/20 shadow-sm space-y-2.5 transition duration-150 hover:border-slate-200">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-black text-slate-700 text-xs sm:text-sm tracking-tight capitalize">{rev.name}</span>
                        <span className="text-yellow-500 font-mono text-[15px] tracking-widest bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100">
                          {'★'.repeat(rev.rating)}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{rev.comment}</p>
                      
                      {rev.reviewImages && rev.reviewImages.length > 0 && (
                        <div className="flex gap-2 pt-0.5 overflow-x-auto scrollbar-none">
                          {rev.reviewImages.map((imgUrl, i) => (
                            <img 
                              key={i} 
                              src={imgUrl} 
                              alt="Customer upload" 
                              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border border-slate-200 cursor-pointer hover:scale-105 hover:border-purple-400 transition duration-200 shadow-sm" 
                              onClick={() => setActiveImagePopup(imgUrl)}
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="text-[9px] font-bold text-slate-400 font-mono tracking-wider pt-1.5 border-t border-slate-100">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modern High-End Feature Badges Footer Block */}
      {/* <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-[28px] p-6 sm:p-8 text-white shadow-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex gap-4 items-start">
            <div className="text-xl bg-white/5 w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center shrink-0 shadow-inner">🔍</div>
            <div>
              <h4 className="font-black text-white text-xs sm:text-sm tracking-wide uppercase">Precision Validation</h4>
              <p className="text-slate-400 text-xs mt-1 font-semibold leading-relaxed">Har phone cover absolute millimeter dimensions standard mapping par trace hota hai.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="text-xl bg-white/5 w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center shrink-0 shadow-inner">⚡</div>
            <div>
              <h4 className="font-black text-white text-xs sm:text-sm tracking-wide uppercase">Ultra Responsive</h4>
              <p className="text-slate-400 text-xs mt-1 font-semibold leading-relaxed">Asymmetrical components single column pipelines me seamlessly map hote hain.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="text-xl bg-white/5 w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center shrink-0 shadow-inner">🛡️</div>
            <div>
              <h4 className="font-black text-white text-xs sm:text-sm tracking-wide uppercase">Premium Shield</h4>
              <p className="text-slate-400 text-xs mt-1 font-semibold leading-relaxed">Immersive micro-interactions paired with high-grade sleek card distributions.</p>
            </div>
          </div>
        </div>
      </div> */}



         {/* Modern Neon Tech Features Footer Block */}
       <div className="mt-14 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-[32px] p-6 sm:p-8 max-w-7xl mx-auto shadow-xl mx-4 lg:mx-auto">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
           <div className="flex gap-4 items-start">
             <div className="text-2xl bg-white w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">🎲</div>
             <div>
               <h4 className="font-black text-gray-800 text-sm tracking-wide">Interactive 3D View</h4>
               <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">Explore every angle of the product in real time before making your move.</p>
             </div>
           </div>

           <div className="flex gap-4 items-start">
             <div className="text-2xl bg-white w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">⚡</div>
             <div>
               <h4 className="font-black text-gray-800 text-sm tracking-wide">High Performance</h4>
               <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">Smooth rendering hardware accelerated, powered directly by Three.js architecture.</p>
             </div>
           </div>

           <div className="flex gap-4 items-start">
             <div className="text-2xl bg-white w-12 h-12 rounded-full border border-purple-500/20 flex items-center justify-center shrink-0 shadow-inner">🛡️</div>
             <div>
               <h4 className="font-black text-gray-800 text-sm tracking-wide">Premium Experience</h4>
               <p className="text-gray-500 text-xs mt-1 font-medium leading-relaxed">Modern UI flows wrapped in immersive animations for a true tactile feel.</p>
             </div>
           </div>
         </div>
       </div>

      {/* Global Image Popup Zoom Modal Shield */}
      {activeImagePopup && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveImagePopup(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] bg-white p-1.5 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center border border-slate-100">
            <button 
              type="button"
              onClick={() => setActiveImagePopup(null)}
              className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full w-7 h-7 flex items-center justify-center font-black text-xs transition shadow-lg z-10"
            >
              ✕
            </button>
            <img 
              src={activeImagePopup} 
              alt="Zoomed Evaluation Review" 
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

    </div>

  );
}