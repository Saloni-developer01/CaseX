// import React, { useState } from 'react';
// import { createProduct } from '../services/api';
// import { useNavigate, Link } from 'react-router-dom';

// export default function AddProduct() {
//   const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createProduct(formData);
//       alert('Product Added Successfully!');
//       navigate('/');
//     } catch (err) {
//       alert('Error adding product');
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 border border-gray-200 bg-white shadow-md rounded-xl">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-600 font-medium mb-1">Product Name</label>
//           <input type="text" required onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg" />
//         </div>
//         <div>
//           <label className="block text-gray-600 font-medium mb-1">Category</label>
//           <input type="text" required onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded-lg" />
//         </div>
//         <div>
//           <label className="block text-gray-600 font-medium mb-1">Price (₹)</label>
//           <input type="number" required onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-2 border rounded-lg" />
//         </div>
//         <div>
//           <label className="block text-gray-600 font-medium mb-1">Description</label>
//           <textarea required onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-lg" rows="3"></textarea>
//         </div>
//         <div className="flex space-x-3 pt-2">
//           <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Submit Product</button>
//           <Link to="/" className="w-full text-center bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">Cancel</Link>
//         </div>
//       </form>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { createProduct } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function AddProduct() {
  const [formData, setFormData] = useState({ name: '', category: '', price: '', description: '' });
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
    <div className="max-w-xl mx-auto mt-12 p-8 border border-gray-100 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 tracking-tight">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-1.5">Product Name</label>
          <input type="text" required onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1.5">Category</label>
          <input type="text" required onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1.5">Price (₹)</label>
          <input type="number" required onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1.5">Description</label>
          <textarea required onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
        </div>
        <div className="flex space-x-4 pt-4">
          <button type="submit" className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 shadow-lg transition-all">
            Submit Entry
          </button>
          <Link to="/" className="w-full text-center bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition-all">
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
}