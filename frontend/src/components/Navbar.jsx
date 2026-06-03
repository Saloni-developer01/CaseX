// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Navbar() {
//   return (
//     <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
//         <Link to="/" className="text-xl font-black text-blue-600 tracking-tight flex items-center gap-2">
//           <span className="bg-blue-600 text-white p-1.5 rounded-lg text-xs">📦</span>
//           Quleep Dashboard
//         </Link>
//         <div className="flex gap-4">
//           <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
//             Home
//           </Link>
//           <Link to="/add-product" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
//             Add Product
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }




















import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "bg-indigo-50 text-indigo-600 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600";

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight flex items-center gap-2">
              <span className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-xl text-sm shadow-md shadow-indigo-200">📦</span>
              Quleep 3D Portal
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className={`px-4 py-2 rounded-xl text-sm transition-all ${isActive('/')}`}>Dashboard</Link>
            <Link to="/add-product" className={`px-4 py-2 rounded-xl text-sm transition-all ${isActive('/add-product')}`}>+ Add Product</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Options */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <Link to="/" onClick={() => setIsOpen(false)} className={`block px-4 py-2.5 rounded-xl text-base ${isActive('/')}`}>Dashboard</Link>
          <Link to="/add-product" onClick={() => setIsOpen(false)} className={`block px-4 py-2.5 rounded-xl text-base ${isActive('/add-product')}`}>+ Add Product</Link>
        </div>
      )}
    </nav>
  );
}