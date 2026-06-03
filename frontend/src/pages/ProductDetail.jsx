// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getProductById } from '../services/api';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

// function RotatingCube() {
//   const meshRef = useRef();
//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.01;
//       meshRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <mesh ref={meshRef}>
//       <boxGeometry args={[2.2, 2.2, 2.2]} />
//       <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.2} />
//     </mesh>
//   );
// }

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         const res = await getProductById(id);
//         setProduct(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchDetail();
//   }, [id]);

//   if (!product) return <div className="text-center mt-20 font-semibold">Loading Product Details...</div>;

//   return (
//     <div className="max-w-5xl mx-auto p-6 mt-6">
//       <Link to="/" className="text-blue-600 font-medium hover:underline">&larr; Back to Dashboard</Link>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
//         {/* Left Side: Text Details */}
//         <div className="flex flex-col justify-center">
//           <span className="text-sm font-bold uppercase tracking-wider text-blue-500">{product.category}</span>
//           <h1 className="text-4xl font-extrabold text-gray-800 mt-2">{product.name}</h1>
//           <p className="text-3xl font-bold text-gray-900 mt-4">₹{product.price}</p>
//           <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>
//         </div>

//         {/* Right Side: Three.js 3D View */}
//         <div className="border border-gray-200 rounded-2xl bg-gray-50 overflow-hidden shadow-inner flex flex-col items-center justify-center p-4">
//           <h3 className="text-sm font-semibold text-gray-500 mb-2">Interactive 3D Product View (Drag to Rotate)</h3>
//           <div style={{ width: '100%', height: '350px' }}>
//             <Canvas camera={{ position: [0, 0, 5] }}>
//               <ambientLight intensity={0.7} />
//               <directionalLight position={[10, 10, 5]} intensity={1.5} />
//               <pointLight position={[-10, -10, -10]} intensity={0.5} />
//               <RotatingCube />
//               <OrbitControls enableZoom={true} />
//             </Canvas>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getProductById } from '../services/api';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

// function RotatingObject() {
//   const meshRef = useRef();
  
//   // Continuous smooth continuous rotation handler
//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.015;
//       meshRef.current.rotation.y += 0.015;
//     }
//   });

//   return (
//     <mesh ref={meshRef}>
//       {/* Task requirement parameter for responsive geometric cylinder mesh */}
//       {/* <cylinderGeometry args={[1.2, 1.2, 2.4, 32]} />
//       <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.5} /> */}
//       <boxGeometry args={[2.2, 2.2, 2.2]} />
//      <meshStandardMaterial color="#2563eb" roughness={0.3} metalness={0.2} />
//     </mesh>
//   );
// }

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         const res = await getProductById(id);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error structural fetching:", err);
//       }
//     };
//     fetchDetail();
//   }, [id]);

//   if (!product) return <div className="text-center mt-24 font-bold text-lg text-gray-500">Loading Specifications...</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 mt-6">
//       <Link to="/" className="text-blue-600 font-semibold hover:underline flex items-center gap-2">&larr; Back to Listings</Link>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6 bg-white border border-gray-100 p-8 rounded-3xl shadow-xl">
//         <div className="flex flex-col justify-center">
//           <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-max">{product.category}</span>
//           <h1 className="text-4xl font-black text-gray-900 mt-4 leading-tight">{product.name}</h1>
//           <p className="text-4xl font-extrabold text-blue-600 mt-4">₹{product.price}</p>
//           <div className="h-px bg-gray-100 my-6"></div>
//           <p className="text-gray-600 leading-relaxed text-md">{product.description}</p>
//         </div>

//         <div className="border border-gray-100 rounded-2xl bg-slate-50 overflow-hidden flex flex-col items-center justify-center p-6 relative">
//           <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">Interactive 3D Engine Model</h3>
//           <div style={{ width: '100%', height: '380px' }}>
//             <Canvas camera={{ position: [0, 0, 5] }}>
//               <ambientLight intensity={0.8} />
//               <directionalLight position={[5, 5, 5]} intensity={1.5} />
//               <pointLight position={[-5, -5, -5]} intensity={0.5} />
//               <RotatingObject />
//               <OrbitControls enableZoom={true} />
//             </Canvas>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




















// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getProductById } from '../services/api';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

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
//       <cylinderGeometry args={[1, 1, 2.2, 32]} />
//       {/* Texture Simulation via Metallic PBR material properties */}
//       <meshStandardMaterial color="#4f46e5" roughness={0.15} metalness={0.7} />
//     </mesh>
//   );
// }

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         const res = await getProductById(id);
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error structural fetching:", err);
//       }
//     };
//     fetchDetail();
//   }, [id]);

//   if (!product) return <div className="text-center mt-24 font-bold text-gray-400 animate-pulse">Loading Product Configurations...</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       <Link to="/" className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 gap-1 mb-6 group transition-colors">
//         <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Inventory Dashboard
//       </Link>
      
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-gray-100 p-6 md:p-10 rounded-3xl shadow-xl">
//         {/* Left Specification Layout Column */}
//         <div className="lg:col-span-5 flex flex-col justify-center">
//           <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full w-max">
//             📦 {product.category}
//           </span>
//           <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 tracking-tight leading-tight">{product.name}</h1>
//           <div className="mt-4 flex items-baseline gap-2">
//             <span className="text-gray-400 text-sm font-medium">Standard Price:</span>
//             <p className="text-3xl font-black text-indigo-600"> must ₹{product.price.toLocaleString('en-IN')}</p>
//           </div>
//           <div className="h-px bg-gray-100 my-6"></div>
//           <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Item Description</h4>
//           <p className="text-gray-600 leading-relaxed text-base bg-slate-50/60 p-4 rounded-2xl border border-gray-50">{product.description}</p>
//         </div>

//         {/* Right Responsive 3D Canvas Column */}
//         <div className="lg:col-span-7 border border-gray-100 rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100/50 to-white overflow-hidden flex flex-col items-center justify-center p-6 min-h-[400px]">
//           <div className="w-full flex justify-between items-center mb-4 px-2">
//             <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Interactive 3D Engine Model</h3>
//             <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md animate-pulse">Drag to Rotate</span>
//           </div>
          
//           <div className="w-full h-[380px]">
//             <Canvas camera={{ position: [0, 0, 4.5] }}>
//               <ambientLight intensity={0.7} /> 
//               <directionalLight position={[5, 8, 5]} intensity={1.5} />
//               <pointLight position={[-5, -5, -2]} intensity={0.5} />
//               <RotatingObject />
//               <OrbitControls enableZoom={true} maxDistance={8} minDistance={2} />
//             </Canvas>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






















import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

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
      <cylinderGeometry args={[1, 1, 2.2, 32]} />
      <meshStandardMaterial
        color="#ff6b6b"
        roughness={0.15}
        metalness={0.8}
      />
    </mesh>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchDetail();
  }, [id]);

  if (!product)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-semibold text-gray-500">
            Loading Product Configurations...
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-orange-500 font-bold mb-6 hover:text-pink-500 transition-all"
      >
        <span>←</span>
        Back to Inventory Dashboard
      </Link>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 p-8 md:p-10 shadow-xl mb-8">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-yellow-300/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
            📦 {product.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-5">
            {product.name}
          </h1>

          <p className="text-white/80 mt-3 text-lg">
            Premium Interactive 3D Product Experience
          </p>
        </div>

      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-12 gap-8">

        {/* Left Side */}
        <div className="lg:col-span-5">

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-full">

            <div className="mb-6">
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-2">
                Product Price
              </p>

              <h2 className="text-5xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                ₹{product.price.toLocaleString('en-IN')}
              </h2>
            </div>

            <div className="h-px bg-gradient-to-r from-orange-200 via-pink-200 to-purple-200 my-8"></div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                Product Description
              </h3>

              <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 border border-orange-100 rounded-2xl p-5">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="mt-8">

              <button className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all">
                Add To Inventory
              </button>

            </div>

          </div>

        </div>

        {/* Right Side 3D Viewer */}
        <div className="lg:col-span-7">

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

            {/* Viewer Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">

              <div>
                <h3 className="font-bold text-gray-800">
                  Interactive 3D Model
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Rotate, zoom and inspect the product
                </p>
              </div>

              <span className="bg-gradient-to-r from-orange-100 to-pink-100 text-pink-600 text-xs font-bold px-4 py-2 rounded-full animate-pulse">
                Drag To Rotate
              </span>

            </div>

            {/* Canvas */}
            <div className="h-[550px] bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">

              <Canvas camera={{ position: [0, 0, 4.5] }}>

                <ambientLight intensity={0.9} />

                <directionalLight
                  position={[5, 8, 5]}
                  intensity={1.8}
                />

                <pointLight
                  position={[-5, -5, -2]}
                  intensity={1}
                />

                <RotatingObject />

                <OrbitControls
                  enableZoom={true}
                  maxDistance={8}
                  minDistance={2}
                />

              </Canvas>

            </div>

          </div>

        </div>

      </div>

      {/* Features Section */}
      <div className="mt-10 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-orange-100">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <div className="text-3xl mb-3">🎲</div>
            <h4 className="font-bold text-gray-800">
              Interactive 3D View
            </h4>
            <p className="text-gray-500 text-sm mt-2">
              Explore every angle of the product in real time.
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-gray-800">
              High Performance
            </h4>
            <p className="text-gray-500 text-sm mt-2">
              Smooth rendering powered by Three.js.
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">🛡️</div>
            <h4 className="font-bold text-gray-800">
              Premium Experience
            </h4>
            <p className="text-gray-500 text-sm mt-2">
              Modern UI with immersive product interaction.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}