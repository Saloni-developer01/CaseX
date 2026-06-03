// import React, { useEffect, useState } from 'react';
// import { getProducts } from '../services/api';
// import { Link } from 'react-router-dom';

// export default function ProductListing() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     fetchProducts();
//   }, [search]);

//   const fetchProducts = async () => {
//     try {
//       const res = await getProducts(search);
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>
//         <Link to="/add-product" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//           + Add New Product
//         </Link>
//       </div>

//       {/* Bonus Challenge: Search Bar */}
//       <input
//         type="text"
//         placeholder="Search products by name..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product._index || product._id} className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white flex flex-col justify-between">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
//               <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-2">{product.category}</span>
//               <p className="text-2xl font-bold text-blue-600 mt-4">₹{product.price}</p>
//             </div>
//             <Link to={`/product/${product._id}`} className="mt-5 text-center bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition">
//               View Details & 3D Model
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import { getProducts } from '../services/api';
// import { Link } from 'react-router-dom';
// import ProductCard from '../components/ProductCard';

// export default function ProductListing() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     fetchProducts();
//   }, [search]);

//   const fetchProducts = async () => {
//     try {
//       const res = await getProducts(search);
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Product Dashboard</h1>
//         <Link to="/add-product" className="bg-blue-600 text-white font-medium px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
//           + Add New Product
//         </Link>
//       </div>

//       {/* Bonus Challenge: Search Bar */}
//       <div className="mb-8">
//         <input
//           type="text"
//           placeholder="Search products by name dynamically..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-4 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//         />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product._id} className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-white flex flex-col justify-between transition-all hover:shadow-md">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{product.name}</h2>
//               <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md mt-2">
//                 {product.category}
//               </span>
//               <p className="text-3xl font-black text-gray-900 mt-4">₹{product.price}</p>
//             </div>
//             <Link to={`/product/${product._id}`} className="mt-6 text-center bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-black transition-colors">
//               View Details & 3D Model
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Top Glassmorphism Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden mb-10">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Product Inventory Hub</h1>
            <p className="text-indigo-200/70 mt-2 text-sm md:text-base">Manage dynamic products and experience interactive real-time 3D models.</p>
          </div>
          <Link to="/add-product" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap">
            + Register New Product
          </Link>
        </div>
      </div>

      {/* Modern Floating Search Bar */}
      <div className="mb-10 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">🔍</div>
        <input
          type="text"
          placeholder="Search products instantly by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-4 border border-gray-200/80 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 bg-white text-gray-800 placeholder-gray-400 transition-all"
        />
      </div>

      {/* Dynamic Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-lg font-medium">No inventory matched your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}