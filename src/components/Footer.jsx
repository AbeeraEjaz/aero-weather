import React from 'react';
import { FaCloudSun, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/10 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
          <FaCloudSun className="text-orange" />
          <span>Made with</span>
          <FaHeart className="text-burgundy animate-pulse" />
          <span>by</span>
          <span className="text-orange font-semibold">AERO Weather</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <p className="text-white/40 text-xs mt-1">
          Your trusted weather companion 🌤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;