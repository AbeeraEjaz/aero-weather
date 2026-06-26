import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCloudSun, FaUser, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <nav className="bg-[#2D2D3F]/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <FaCloudSun className="text-[#FF6B35] text-3xl group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-extrabold">
            <span className="text-[#FF6B35]">AERO</span>
            <span className="text-white">WEATHER</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white/80 hover:text-[#FF6B35] transition-colors font-medium">
            Home
          </Link>
          
          {/* Dashboard - Show only when logged in */}
          {isAuthenticated && (
            <Link to="/dashboard" className="text-white/80 hover:text-[#FF6B35] transition-colors font-medium">
              Dashboard
            </Link>
          )}
          
          {isAuthenticated ? (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold text-sm">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-white/80 text-sm font-medium">
                  {user?.email?.split('@')[0] || 'User'}
                </span>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-white/60 hover:text-red-400 transition-colors flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-500/10"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="text-white/80 hover:text-[#FF6B35] transition-colors font-medium flex items-center gap-2"
              >
                <FaUser />
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-[#FF6B35] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#FFB07C] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6B35]/30 text-sm flex items-center gap-2"
              >
                <FaUserPlus />
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden text-white text-2xl">
          <FaUser />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;