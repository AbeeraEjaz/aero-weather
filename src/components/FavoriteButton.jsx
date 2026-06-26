import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { isFavorite, toggleFavorite } from '../utils/localStorage';
import toast from 'react-hot-toast';

const FavoriteButton = ({ city, size = 24, className = '' }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (city) {
      setIsFav(isFavorite(city));
    }
  }, [city]);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!city) return;

    const updated = toggleFavorite(city);
    const newState = updated.some(item => item.toLowerCase() === city.toLowerCase());
    setIsFav(newState);
    
    toast.success(
      newState 
        ? `❤️ ${city} added to favorites!` 
        : `💔 ${city} removed from favorites`
    );
  };

  if (!city) return null;

  return (
    <button
      onClick={handleToggle}
      className={`transition-all duration-300 hover:scale-125 ${className}`}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFav ? (
        <FaHeart className="text-[#FF6B35] animate-pulse" size={size} />
      ) : (
        <FaRegHeart className="text-white/50 hover:text-[#FF6B35]" size={size} />
      )}
    </button>
  );
};

export default FavoriteButton;