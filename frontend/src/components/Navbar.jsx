// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const [cartCount, setCartCount] = useState(0);
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   const navigate = useNavigate();


//   // 🌟 Cart ke items count karne ke liye useEffect
//   useEffect(() => {
//     const fetchCartCount = async () => {
//       if (!userInfo || !userInfo.token) return;
//       try {
//         const res = await axios.get('http://localhost:5000/api/cart', {
//           headers: { Authorization: `Bearer ${userInfo.token}` }
//         });
//         // Saare items ki quantity ko plus karke badge me dikhayenge
//         const totalItems = res.data.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
//         setCartCount(totalItems);
//       } catch (err) {
//         console.error("Navbar cart count error:", err);
//       }
//     };

//     fetchCartCount();
//   }, []); // Page load hote hi chalega

//   const isActive = (path) =>
//     location.pathname === path
//       ? "bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 text-orange-600 font-semibold shadow-sm"
//       : "text-gray-600 hover:bg-orange-50 hover:text-orange-500";

//   return (
//     <nav className="p-3 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">

//           {/* Logo */}
//           {/* <div className="flex items-center">
//             <Link
//               to="/"
//               className="text-xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight flex items-center gap-3"
//             >
//               <span className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 shadow-lg shadow-pink-200">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 text-white"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3L18.8 8 12 11.7 5.2 8 12 4.3zm-7 5.4l6 3.3v6.7l-6-3.3V9.7zm8 10V13l6-3.3v6.7L13 19.7z" />
//                 </svg>
//               </span>
//               Quleep 3D Portal
//             </Link>
//           </div> */}

          
//           {/* <div className="hidden md:flex items-center gap-3">
//             <Link
//               to="/"
//               className={`px-5 py-2.5 rounded-xl text-sm transition-all duration-300 ${isActive("/")}`}
//             >
//               Dashboard
//             </Link>

//             <Link
//               to="/add-product"
//               className={`px-5 py-2.5 rounded-xl text-sm transition-all duration-300 ${
//                 location.pathname === "/add-product"
//                   ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg"
//                   : "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white hover:scale-105 shadow-md"
//               }`}
//             >
//               + Add Product
//             </Link>

//             <Link to="/admin/orders" className="bg-purple-100 text-purple-700 font-bold px-4 py-2 rounded-xl text-sm">
//             Orders 🛒
//           </Link>
//           </div> */}



//           {/* new */}


//     <Link to="/" className="text-5xl font-black text-purple-700 tracking-tight ml-[-10px]">CaseX</Link>
    
//     {/* <div className="flex items-center gap-4">
//       <Link to="/dashboard" className="font-semibold text-gray-600 hover:text-purple-600 transition">Dashboard</Link>
      
//       🛠️ ROLE 1: ADMIN ACCESS (Aapko sab kuch dikhega)
//       {userInfo && userInfo.role?.toLowerCase() === 'admin' && (
//         <>
//           <Link to="/add-product" className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm hover:bg-red-600">+ Admin Global Add</Link>
//           <Link to="/admin/orders" className="bg-purple-600 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm hover:bg-purple-700">All Business Orders 🛒</Link>
//         </>
//       )}

//       🏬 ROLE 2: VENDOR ACCESS (Dukaanwale ko sirf product add krne ka option milega)
//       {userInfo && userInfo.role === 'vendor' && (
//         <>
//           {userInfo.isSubscribed ? (
//             <Link to="/add-product" className="bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm hover:bg-emerald-700">+ Add My Product</Link>
//           ) : (
//             <Link to="/subscription-payment" className="bg-amber-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold animate-pulse shadow-sm">
//               ⚠️ Activate Vendor Account (Pay Monthly Fee)
//             </Link>
//           )}
//         </>
//       )}

//       👤 ROLE 3: CUSTOMER ACCESS (Khareedne wale ko sirf Wishlist/Orders dikhega)
//       {userInfo && userInfo.role === 'customer' && (
//         <Link to="/my-wishlist" className="text-gray-600 font-semibold hover:text-pink-600 transition">❤️ My Wishlist</Link>
//       )}

//       AUTH BUTTONS
//       {userInfo ? (
//         <button 
//           onClick={() => { localStorage.removeItem('userInfo'); window.location.reload(); }} 
//           className="text-xs font-bold text-red-500 border border-red-200 px-3 py-1.5 rounded-xl hover:bg-red-50 transition"
//         >
//           Logout ({userInfo.name} - <span className="uppercase text-purple-600">{userInfo.role}</span>)
//         </button>
//       ) : (
//         <Link to="/login" className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-xl text-sm font-bold hover:bg-slate-200">Login</Link>
//       )}
//     </div> */}





//     {/* right side of navbar */}
//     {/* Navbar ke right side wale links ka section */}
// <div className="flex items-center gap-4">

//   {/* 🌟 FLIPKART STYLE CART ICON BUTTON */}
//         {/* <Link to="/cart" className="relative p-2 text-gray-600 hover:text-purple-600 transition flex items-center">
//           Cart Icon SVG
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//           </svg>

//           Dynamic Badge Count (Sirf tabhi dikhega jab cart me > 0 items honge)
//           {cartCount > 0 && (
//             <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
//               {cartCount}
//             </span>
//           )}
//         </Link> */}

//   {userInfo ? (
//     <>
//       {/* Agar login karne wala CUSTOMER hai */}
//       {userInfo.role?.toLowerCase() === 'customer' && (
//         <>
//         <Link to="/my-wishlist" className="text-gray-600 font-semibold hover:text-pink-600 transition">❤️ My Wishlist</Link>
//         <Link to="/dashboard" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition">
//           My Orders 🛒
//         </Link>
//         </>

//       )}


//        {/* 🏬 ROLE 2: VENDOR ACCESS (Dukaanwale ko sirf product add krne ka option milega) */}
//       {userInfo.role?.toLowerCase() === 'vendor' && (
//         <>
//         {/* Vendor ko direct Dashboard par lane ke liye link jahan uske orders hain */}
//           <Link to="/dashboard" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1">
//             🏪 My Shop Portal
//           </Link>
//           {userInfo.isSubscribed ? (
//             <Link to="/add-product" className="bg-emerald-600 text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm hover:bg-emerald-700">+ Add My Product</Link>
//           ) : (
//             <Link to="/subscription-payment" className="bg-amber-500 text-white px-3 py-1.5 rounded-xl text-sm font-bold animate-pulse shadow-sm">
//               ⚠️ Activate Vendor Account (Pay Monthly Fee)
//             </Link>
//           )}
//         </>
//       )}

//       {/* Agar login karne wala ADMIN hai */}
//       {userInfo.role?.toLowerCase() === 'admin' && (
//         <>
//           <Link to="/" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition">
//             Inventory Hub 📦
//           </Link>
//           <Link to="/adminvendor" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition">
//             User's List
//           </Link>
        
//           <Link to="/add-product" className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-red-600 transition">
//             + Admin Global Add
//           </Link>
//           <Link to="/dashboard" className="bg-purple-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-purple-700 transition">
//             All Business Orders 💼
//           </Link>
//         </>
//       )}

//       {/* Logout Button */}
//       <button 
//         onClick={() => { localStorage.removeItem('userInfo'); window.location.reload(); }} 
//         className="bg-red-50 text-red-500 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-bold"
//       >
//         Logout ({userInfo.name}) - <span className="uppercase text-purple-600">{userInfo.role}</span>
//       </button>
//     </>
//   ) : (
//     <Link to="/login" className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-xl text-xs font-bold">
//       Login
//     </Link>
//   )}

// </div>


    

//           {/* Mobile Menu Button */}
//           <div className="flex items-center md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-500 hover:text-orange-500 p-2 rounded-xl hover:bg-orange-50"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden border-t border-orange-100 bg-white px-4 pt-2 pb-4 space-y-2 shadow-lg">
//           <Link
//             to="/"
//             onClick={() => setIsOpen(false)}
//             className={`block px-4 py-3 rounded-xl text-base ${isActive("/")}`}
//           >
//             Dashboard
//           </Link>

//           <Link
//             to="/add-product"
//             onClick={() => setIsOpen(false)}
//             className="block px-4 py-3 rounded-xl text-base bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white"
//           >
//             + Add Product
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }










































































import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();

  // 🌟 Cart ke items count karne ke liye useEffect
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!userInfo || !userInfo.token) return;
      try {
        const res = await axios.get('https://casex-backend-h0xv.onrender.com/api/cart', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        const totalItems = res.data.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
        setCartCount(totalItems);
      } catch (err) {
        console.error("Navbar cart count error:", err);
      }
    };

    fetchCartCount();
  }, []);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-purple-50 text-purple-700 font-bold shadow-sm border-b-2 border-purple-600"
      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50/50";

  return (
    <nav className="p-3 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-[87vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#9b15b8] via-[#e22289] to-[#f4563a] shadow-md transform group-hover:rotate-6 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="text-3xl font-black bg-gradient-to-r from-[#7a128c] via-[#e22289] to-[#f4563a] bg-clip-text text-transparent tracking-tight">
                CaseX
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Link Actions */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {userInfo ? (
              <>
                {/* 👤 CUSTOMER ACCESS */}
                {userInfo.role?.toLowerCase() === 'customer' && (
                  <>
                    <Link to="/my-wishlist" className="text-gray-600 font-semibold hover:text-pink-600 transition duration-200 flex items-center gap-1">
                      ❤️ My Wishlist
                    </Link>
                    <Link to="/dashboard" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition duration-200">
                      My Orders 🛒
                    </Link>
                  </>
                )}

                {/* 🏬 VENDOR ACCESS */}
                {userInfo.role?.toLowerCase() === 'vendor' && (
                  <>
                    <Link to="/dashboard" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition duration-200 flex items-center gap-1">
                      🏪 My Shop Portal
                    </Link>
                    {userInfo.isSubscribed ? (
                      <Link to="/add-product" className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-emerald-700 hover:shadow transition duration-200">+ Add My Product</Link>
                    ) : (
                      <Link to="/subscription-payment" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold animate-pulse shadow-sm">
                        ⚠️ Activate Vendor Account
                      </Link>
                    )}
                  </>
                )}

                {/* 👑 ADMIN ACCESS */}
                {userInfo.role?.toLowerCase() === 'admin' && (
                  <>
                    <Link to="/" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition duration-200">
                      Inventory Hub 📦
                    </Link>
                    <Link to="/adminvendor" className="text-sm font-bold text-gray-600 hover:text-purple-600 transition duration-200">
                      User's List
                    </Link>
                    <Link to="/add-product" className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 shadow-sm transition duration-200">
                      + Admin Global Add
                    </Link>
                    <Link to="/dashboard" className="bg-gradient-to-r from-[#8f0b54] to-[#500361] text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 shadow-sm transition duration-200">
                      All Business Orders 💼
                    </Link>
                  </>
                )}

                {/* Logout Action */}
                <div className="flex items-center gap-2 border-l border-gray-200 pl-4 ml-2">
                  <div className="flex flex-col text-right hidden lg:flex">
                    <span className="text-xs font-bold text-gray-700 truncate max-w-[100px]">{userInfo.name}</span>
                    <span className="text-[10px] uppercase font-black text-purple-500">{userInfo.role}</span>
                  </div>
                  <button 
                    onClick={() => { localStorage.removeItem('userInfo'); window.location.reload(); }} 
                    className="bg-red-50 text-red-500 border border-red-100 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-red-100 hover:text-red-600 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="bg-gradient-to-r from-[#9b15b8] to-[#e22289] text-white px-6 py-2 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transform hover:-translate-y-0.5 transition duration-200">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-purple-600 p-2 rounded-xl hover:bg-purple-50 transition duration-200 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Expandable Action Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-purple-100 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3 shadow-xl absolute top-full left-0 w-full z-50 animate-fadeIn">
          {userInfo ? (
            <div className="flex flex-col gap-2 pt-2">
              <div className="bg-purple-50 p-3 rounded-xl flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-800">{userInfo.name}</span>
                <span className="text-xs uppercase font-black bg-purple-200 text-purple-700 px-2 py-0.5 rounded-md">{userInfo.role}</span>
              </div>

              {/* 👤 Mobile Customer Routes */}
              {userInfo.role?.toLowerCase() === 'customer' && (
                <>
                  <Link to="/my-wishlist" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-purple-50 rounded-xl">❤️ My Wishlist</Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-purple-50 rounded-xl">My Orders 🛒</Link>
                </>
              )}

              {/* 🏬 Mobile Vendor Routes */}
              {userInfo.role?.toLowerCase() === 'vendor' && (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-purple-50 rounded-xl">🏪 My Shop Portal</Link>
                  {userInfo.isSubscribed ? (
                    <Link to="/add-product" onClick={() => setIsOpen(false)} className="block text-center bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-bold shadow-sm">+ Add My Product</Link>
                  ) : (
                    <Link to="/subscription-payment" onClick={() => setIsOpen(false)} className="block text-center bg-amber-500 text-white py-2.5 rounded-xl text-sm font-bold animate-pulse">⚠️ Activate Vendor Account</Link>
                  )}
                </>
              )}

              {/* 👑 Mobile Admin Routes */}
              {userInfo.role?.toLowerCase() === 'admin' && (
                <>
                  <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-purple-50 rounded-xl">Inventory Hub 📦</Link>
                  <Link to="/adminvendor" onClick={() => setIsOpen(false)} className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-purple-50 rounded-xl">User's List</Link>
                  <Link to="/add-product" onClick={() => setIsOpen(false)} className="block text-center bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-xl text-sm font-bold">+ Admin Global Add</Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-center bg-gradient-to-r from-[#8f0b54] to-[#500361] text-white py-2 rounded-xl text-sm font-bold">All Business Orders 💼</Link>
                </>
              )}

              <button 
                onClick={() => { localStorage.removeItem('userInfo'); window.location.reload(); }} 
                className="w-full mt-2 bg-red-50 text-red-500 border border-red-200 py-2.5 rounded-xl text-sm font-bold hover:bg-red-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center bg-gradient-to-r from-[#9b15b8] to-[#e22289] text-white py-3 rounded-xl text-sm font-bold shadow-md">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}