import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, PercentSquareIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [token, setToken] = useState(localStorage.getItem("access_token") || null);

  const handlelogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null); // 🔥 triggers re-render immediately
  };

  // 🔥 Detect token changes (ex: login page updates localStorage)
  useEffect(() => {
    const checkToken = () => {
      const t = localStorage.getItem("access_token");
      setToken(t);
    };

    // Listen when another tab or other part of app updates localStorage
    window.addEventListener("storage", checkToken);

    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SmartMarket
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {token && (
              <>
                <Link to="/products" className="text-slate-600 hover:text-blue-600 transition font-medium">
                  Products
                </Link>

                <Link to="/profile" className="text-slate-600 hover:text-blue-600 transition font-medium flex items-center">
                  Profile
                  <PercentSquareIcon className="w-4 h-4 inline-block ml-1 text-red-500" />
                </Link>

                <Link to="/wishlist" className="text-slate-600 hover:text-blue-600 transition font-medium">
                  Wishlist
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition">
              <Heart className="w-5 h-5 text-slate-600" />
            </button>

            {token ? (
              <button
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium"
                onClick={handlelogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
