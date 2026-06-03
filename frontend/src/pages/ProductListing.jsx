import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      const res = await getProducts(search);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 p-8 md:p-12 shadow-xl mb-10">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-300/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">

          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Product Inventory Hub
            </h1>

            <p className="text-white/80 mt-4 text-lg">
              Manage dynamic products and experience interactive real-time 3D models.
            </p>
          </div>

          <Link
            to="/add-product"
            className="bg-white text-orange-500 font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            + Register New Product
          </Link>

        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-10">
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-orange-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products instantly by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-5 py-5 bg-white border border-gray-200 rounded-3xl shadow-md focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 text-gray-700 placeholder-gray-400 transition-all"
          />
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-20 text-center shadow-sm">
          <div className="text-6xl mb-4">📦</div>

          <h3 className="text-xl font-bold text-gray-700 mb-2">
            No Products Found
          </h3>

          <p className="text-gray-500">
            No inventory matched your search criteria.
          </p>
        </div>
      ) : (
        <>
          {/* Stats Header */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

            <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl mb-3">
                📦
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {products.length}
              </h3>
              <p className="text-gray-500 text-sm">
                Total Products
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-3">
                🏷️
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {
                  [...new Set(products.map(item => item.category))]
                    .length
                }
              </h3>
              <p className="text-gray-500 text-sm">
                Categories
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-3">
                ✅
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {products.length}
              </h3>
              <p className="text-gray-500 text-sm">
                Active Products
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-3">
                🎲
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {products.length}
              </h3>
              <p className="text-gray-500 text-sm">
                3D Models
              </p>
            </div>

          </div> */}

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>

          {/* footer */}
          {/* <div className="mt-14 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-orange-100">

            <div className="grid md:grid-cols-4 gap-8">

              <div>
                <div className="text-3xl mb-3">🎲</div>
                <h4 className="font-bold text-gray-800">
                  Interactive 3D Models
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  Explore products with real-time 3D experience.
                </p>
              </div>

              <div>
                <div className="text-3xl mb-3">🛡️</div>
                <h4 className="font-bold text-gray-800">
                  Secure & Reliable
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  Your product data stays protected.
                </p>
              </div>

              <div>
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-bold text-gray-800">
                  Real-time Updates
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  Instant inventory and product updates.
                </p>
              </div>

              <div>
                <div className="text-3xl mb-3">🎧</div>
                <h4 className="font-bold text-gray-800">
                  24/7 Support
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  Help whenever you need it.
                </p>
              </div>

            </div>
          </div> */}
        </>
      )}
    </div>
  );
}