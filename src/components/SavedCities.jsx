import React, { useState, useEffect } from 'react';
import { FaHistory, FaHeart, FaTimes, FaCloudSun } from 'react-icons/fa';
import { getRecentSearches, getFavorites } from '../utils/localStorage';
import FavoriteButton from './FavoriteButton';

const SavedCities = ({ onCitySelect, currentCity }) => {
  const [recent, setRecent] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadSaved = () => {
      setRecent(getRecentSearches());
      setFavorites(getFavorites());
    };
    loadSaved();

    // Listen for storage changes (if multiple tabs)
    const handleStorageChange = () => loadSaved();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (recent.length === 0 && favorites.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-4">
      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div>
          <h3 className="text-white/70 text-sm font-medium mb-2 flex items-center gap-2">
            <FaHeart className="text-[#FF6B35]" />
            <span>⭐ Favorites</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {favorites.map((city) => (
              <button
                key={city}
                onClick={() => onCitySelect(city)}
                className={`group glass-card rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 ${
                  currentCity?.toLowerCase() === city.toLowerCase()
                    ? 'border-[#FF6B35] bg-[#FF6B35]/10'
                    : 'hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaCloudSun className="text-[#FF6B35] text-sm" />
                  <span className="text-white font-medium">{city}</span>
                  <FavoriteButton city={city} size={16} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches Section */}
      {recent.length > 0 && (
        <div>
          <h3 className="text-white/70 text-sm font-medium mb-2 flex items-center gap-2">
            <FaHistory className="text-white/50" />
            <span>🕐 Recent Searches</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {recent.map((city) => (
              <button
                key={city}
                onClick={() => onCitySelect(city)}
                className={`glass-card rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 ${
                  currentCity?.toLowerCase() === city.toLowerCase()
                    ? 'border-[#FF6B35] bg-[#FF6B35]/10'
                    : 'hover:border-white/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm">{city}</span>
                  <FavoriteButton city={city} size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedCities;