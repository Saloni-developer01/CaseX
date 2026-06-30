import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://casex-backend-h0xv.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      alert(`Welcome back, ${res.data.name}!`);
      
      if (res.data.role === 'admin') navigate('/admin/orders');
      else navigate('/');
      window.location.reload(); // Navbar refresh karne ke liye
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    // <div className="min-h-[80vh] flex items-center justify-center p-4">
    //   <form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl border shadow-sm max-w-md w-full space-y-4">
    //     <h2 className="text-2xl font-black text-[#e22289]">🔐 Account Login</h2>
    //     <input type="email" placeholder="Email" required className="w-full p-3 border rounded-xl" value={email} onChange={e=>setEmail(e.target.value)}/>
    //     <input type="password" placeholder="Password" required className="w-full p-3 border rounded-xl" value={password} onChange={e=>setPassword(e.target.value)}/>
    //     <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#7a128c] via-[#e22289] to-[#f4563a] text-white font-bold rounded-xl shadow-md">Login</button>
    //     <p className="text-xs text-gray-500 text-center">Don't have an account? <Link to="/signup" className="text-purple-600 font-bold">Signup here</Link></p>
    //   </form>
    // </div>



    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-[#2c0538] via-[#52093c] to-[#12021c]">
      
      {/* --- BACKGROUND GRAPHICS & TEXTURES (Bhara-bhara premium look) --- */}
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
          <path d="M-100,280 C150,180 250,380 500,250 C650,180 750,280 900,200" stroke="url(#loginWaveGrad)" strokeWidth="2" />
          <path d="M-100,310 C150,210 250,410 500,280 C650,210 750,310 900,230" stroke="url(#loginWaveGrad)" strokeWidth="1" strokeDasharray="4 4" />
          <defs>
            <linearGradient id="loginWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7a128c" stopOpacity="0" />
              <stop offset="50%" stopColor="#e22289" stopOpacity="1" />
              <stop offset="100%" stopColor="#f4563a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* --- LOGIN FORM CARD --- */}
      <div className="relative w-full max-w-md z-10 transition-all duration-300 transform hover:scale-[1.01]">
        
        {/* Subtle 3D Glass Accent Border on the back */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7a128c] via-[#e22289] to-[#f4563a] rounded-3xl blur-[2px] opacity-40 -z-10"></div>

        <form 
          onSubmit={handleLogin} 
          className="bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full space-y-6"
        >
          {/* Header */}
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-3xl font-black bg-gradient-to-r from-[#7a128c] via-[#e22289] to-[#f4563a] bg-clip-text text-transparent tracking-tight">
              🔐 Account Login
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Welcome back! Please enter your details.</p>
          </div>

          {/* Inputs Section */}
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                className="w-full p-3.5 pl-4 bg-gray-50/50 border border-gray-200 focus:border-[#e22289] rounded-xl outline-none transition-all duration-200 focus:bg-white text-sm text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-pink-100" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <input 
                type="password" 
                placeholder="Password" 
                required 
                className="w-full p-3.5 pl-4 bg-gray-50/50 border border-gray-200 focus:border-[#e22289] rounded-xl outline-none transition-all duration-200 focus:bg-white text-sm text-gray-800 placeholder-gray-400 focus:ring-4 focus:ring-pink-100" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3.5 bg-gradient-to-r from-[#7a128c] via-[#e22289] to-[#f4563a] text-white font-bold rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:opacity-95 active:scale-[0.99] transition-all duration-200 text-sm tracking-wide uppercase"
          >
            Sign In
          </button>

          {/* Footer Navigation */}
          <p className="text-xs sm:text-sm text-gray-500 text-center font-medium pt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#e22289] font-bold hover:text-[#7a128c] hover:underline transition-colors duration-200 ml-1">
              Signup here
            </Link>
          </p>
        </form>
      </div>

    </div>
  );
}