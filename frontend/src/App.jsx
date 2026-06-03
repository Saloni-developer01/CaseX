// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProductListing from './pages/ProductListing';
// import AddProduct from './pages/AddProduct';
// import ProductDetail from './pages/ProductDetail';

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
//       <Router>
//         <Routes>
//           <Route path="/" element={<ProductListing />} />
//           <Route path="/add-product" element={<AddProduct />} />
//           <Route path="/product/:id" element={<ProductDetail />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }



import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Humara naya component
import ProductListing from './pages/ProductListing';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50/50 antialiased">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}