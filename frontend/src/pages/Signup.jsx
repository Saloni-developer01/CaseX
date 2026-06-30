import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer' // Default role customer rahega
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      
      // Signup hote hi auto-login karwa denge aur user data save kar lenge
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      alert(`🎉 Account Created Successfully! Welcome ${res.data.name}`);
      
      // Role ke mutabik redirect karenge
      if (res.data.role === 'admin') {
        navigate('/admin/orders');
      } else {
        navigate('/');
      }
      window.location.reload(); // Navbar states refresh karne ke liye
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    // <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50/50">
    //   <form 
    //     onSubmit={handleSignup} 
    //     className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl max-w-md w-full space-y-5"
    //   >
    //     <div className="text-center">
    //       <h2 className="text-3xl font-black text-gray-800 tracking-tight">🚀 Create Account</h2>
    //       <p className="text-xs text-gray-400 mt-1 font-medium">Join Quleep 3D Portal to explore premium cases</p>
    //     </div>

    //     <div className="space-y-4">
    //       <div>
    //         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
    //         <input 
    //           type="text" 
    //           name="name"
    //           placeholder="Saloni Yadav" 
    //           required 
    //           className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm transition" 
    //           value={formData.name} 
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
    //         <input 
    //           type="email" 
    //           name="email"
    //           placeholder="example@gmail.com" 
    //           required 
    //           className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm transition" 
    //           value={formData.email} 
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
    //         <input 
    //           type="password" 
    //           name="password"
    //           placeholder="••••••••" 
    //           required 
    //           className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm transition" 
    //           value={formData.password} 
    //           onChange={handleChange}
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Account Type (Role)</label>
    //         <select 
    //           name="role"
    //           className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm bg-white font-semibold text-gray-700 cursor-pointer transition"
    //           value={formData.role}
    //           onChange={handleChange}
    //         >
    //           <option value="customer">👤 Customer (Buy Products)</option>
    //           <option value="vendor">🏬 Vendor (Sell / List Products)</option>
    //           <option value="admin">🛠️ Admin (Full Control & Orders Dashboard)</option>
    //         </select>
    //       </div>
    //     </div>

    //     <button 
    //       type="submit" 
    //       className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg transition duration-200 uppercase tracking-wider"
    //     >
    //       Register & Continue 🚀
    //     </button>

    //     <p className="text-xs text-gray-500 text-center font-medium">
    //       Already have an account?{' '}
    //       <Link to="/login" className="text-purple-600 font-bold hover:underline">
    //         Login here
    //       </Link>
    //     </p>
    //   </form>
    // </div>



    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-[#2c0538] via-[#52093c] to-[#12021c]">
      
      {/* --- BACKGROUND GRAPHICS & TEXTURES (Bhara-bhara matching look) --- */}
      {/* Glowing Blob 1 - Top Right */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#f4563a] rounded-full blur-[100px] sm:blur-[150px] opacity-20 pointer-events-none z-0"></div>
      
      {/* Glowing Blob 2 - Bottom Left */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#7a128c] rounded-full blur-[120px] sm:blur-[180px] opacity-35 pointer-events-none z-0"></div>

      {/* Floating Sparkles / Stars */}
      <div className="absolute top-1/4 left-10 sm:left-20 text-white/20 text-4xl animate-pulse pointer-events-none xs:block">✦</div>
      <div className="absolute bottom-1/4 right-10 sm:right-20 text-white/20 text-4xl animate-ping duration-1000 pointer-events-none xs:block">✦</div>
      <div className="absolute top-12 right-1/4 text-white/10 text-4xl pointer-events-none">✦</div>
      

      {/* Background Vector Waves Illusion */}
      <div className="absolute inset-0 w-full h-full opacity-35 pointer-events-none z-0 flex items-center justify-center">
        <svg viewBox="0 0 800 400" className="w-full h-full scale-150 transform rotate-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,280 C150,180 250,380 500,250 C650,180 750,280 900,200" stroke="url(#signupWaveGrad)" strokeWidth="2" />
          <path d="M-100,310 C150,210 250,410 500,280 C650,210 750,310 900,230" stroke="url(#signupWaveGrad)" strokeWidth="1" strokeDasharray="4 4" />
          <defs>
            <linearGradient id="signupWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7a128c" stopOpacity="0" />
              <stop offset="50%" stopColor="#e22289" stopOpacity="1" />
              <stop offset="100%" stopColor="#f4563a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* --- SIGNUP FORM CARD --- */}
      <div className="relative w-full max-w-md z-10 my-6 transition-all duration-300 transform hover:scale-[1.01]">
        
        {/* Subtle 3D Glass Accent Border on the back */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7a128c] via-[#e22289] to-[#f4563a] rounded-3xl blur-[2px] opacity-40 -z-10"></div>

        <form 
          onSubmit={handleSignup} 
          className="bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full space-y-5"
        >
          {/* Header */}
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-3xl font-black bg-gradient-to-r from-[#7a128c] via-[#e22289] to-[#f4563a] bg-clip-text text-transparent tracking-tight">
              🚀 Create Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Join CaseX to explore premium 3D phone cases</p>
          </div>

          {/* Inputs Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-purple-900/60 uppercase tracking-wider mb-1 pl-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                required 
                className="w-full p-3 bg-gray-50/50 border border-gray-200 focus:border-[#e22289] rounded-xl outline-none transition-all duration-200 focus:bg-white text-sm text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-pink-100" 
                value={formData.name} 
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-purple-900/60 uppercase tracking-wider mb-1 pl-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="example@gmail.com" 
                required 
                className="w-full p-3 bg-gray-50/50 border border-gray-200 focus:border-[#e22289] rounded-xl outline-none transition-all duration-200 focus:bg-white text-sm text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-pink-100" 
                value={formData.email} 
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-purple-900/60 uppercase tracking-wider mb-1 pl-1">Password</label>
              <input 
                type="password" 
                name="password"
                placeholder="••••••••" 
                required 
                className="w-full p-3 bg-gray-50/50 border border-gray-200 focus:border-[#e22289] rounded-xl outline-none transition-all duration-200 focus:bg-white text-sm text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-pink-100" 
                value={formData.password} 
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-purple-900/60 uppercase tracking-wider mb-1 pl-1">Select Account Type (Role)</label>
              <select 
                name="role"
                className="w-full p-3 bg-gray-50/50 border border-gray-200 focus:border-[#e22289] rounded-xl outline-none transition-all duration-200 focus:bg-white text-sm font-semibold text-gray-700 cursor-pointer focus:ring-4 focus:ring-pink-100"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="customer">👤 Customer (Buy Products)</option>
                <option value="vendor">🏬 Vendor (Sell / List Products)</option>
                {/* <option value="admin">🛠️ Admin (Full Control Dashboard)</option> */}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3.5 bg-gradient-to-r from-[#7a128c] via-[#e22289] to-[#f4563a] text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:opacity-95 active:scale-[0.99] transition-all duration-200 text-sm tracking-wide uppercase"
          >
            Register & Continue 🚀
          </button>

          {/* Footer Navigation */}
          <p className="text-xs sm:text-sm text-gray-500 text-center font-medium pt-1">
            Already have an account?{' '}
            <Link to="/login" className="text-[#e22289] font-bold hover:text-[#7a128c] hover:underline transition-colors duration-200 ml-1">
              Login here
            </Link>
          </p>
        </form>
      </div>

    </div>
  );
}