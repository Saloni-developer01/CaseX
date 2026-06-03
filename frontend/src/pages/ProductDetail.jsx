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
      <boxGeometry args={[2.2, 2.2, 2.2]} />
       <meshStandardMaterial color="#ff6b6b" roughness={0.15} metalness={0.8} />
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

      {/* Back btn */}
      {/* <Link
        to="/"
        className="inline-flex items-center gap-2 text-orange-500 font-bold mb-6 hover:text-pink-500 transition-all"
      >
        <span>←</span>
        Back to Inventory Dashboard
      </Link> */}

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

              {/* <button className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all">
                Add To Inventory
              </button> */}

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

      {/* footer */}
      {/* <div className="mt-10 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-orange-100">

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

      </div> */}

    </div>
  );
}