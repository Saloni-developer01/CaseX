import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="group relative bg-white border border-gray-100 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">Active</div>
      <div>
        <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          📂 {product.category}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mt-3 group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h3>
        <div className="flex items-baseline gap-1 mt-4">
          <span className="text-gray-500 text-sm font-medium">Price:</span>
          <p className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <Link to={`/product/${product._id}`} className="mt-6 text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold py-3.5 rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300">
        View Details & 3D Model →
      </Link>
    </div>
  );
}