import React, { useState } from 'react';
import { createProduct } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(formData);
      navigate('/');
    } catch (err) {
      alert('Failed to register the product. Check fields.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-600 p-8 md:p-10 shadow-xl mb-8">

        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-yellow-300/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Register New Product
          </h1>

          <p className="text-white/80 mt-3 text-lg">
            Add products to your inventory and make them available for 3D visualization.
          </p>
        </div>

      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 overflow-hidden">

        <div className="p-8 md:p-10">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Product Name
              </label>

              <input
                type="text"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
                placeholder="Enter product name"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Category
              </label>

              <input
                type="text"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value
                  })
                }
                placeholder="Furniture, Electronics, etc."
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value
                  })
                }
                placeholder="Enter product price"
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Description
              </label>

              <textarea
                required
                rows="5"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                }
                placeholder="Write product description..."
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 transition-all resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                + Register Product
              </button>

              <Link
                to="/"
                className="flex-1 text-center py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-all"
              >
                ← Go Back
              </Link>

            </div>

          </form>

        </div>

      </div>

      {/* footer */}
      {/* <div className="mt-10 bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 rounded-3xl p-8 border border-orange-100">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <div className="text-3xl mb-3">📦</div>
            <h4 className="font-bold text-gray-800">
              Easy Product Management
            </h4>
            <p className="text-gray-500 text-sm mt-2">
              Quickly register and manage inventory products.
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">🎲</div>
            <h4 className="font-bold text-gray-800">
              3D Ready
            </h4>
            <p className="text-gray-500 text-sm mt-2">
              Products can be integrated with interactive 3D models.
            </p>
          </div>

          <div>
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-bold text-gray-800">
              Fast Registration
            </h4>
            <p className="text-gray-500 text-sm mt-2">
              Add products instantly with a clean workflow.
            </p>
          </div>

        </div>

      </div> */}

    </div>
  );
}