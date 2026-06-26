import React from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt, FaWind } from 'react-icons/fa';

const AnimatedWeatherIcon = ({ condition, size = 80 }) => {
  const getIcon = () => {
    const iconProps = {
      className: `text-${size === 80 ? '6xl' : '4xl'}`,
      style: { fontSize: size }
    };

    switch (condition?.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return <FaSun {...iconProps} className="text-yellow-400 animate-spin-slow" />;
      case 'clouds':
        return <FaCloud {...iconProps} className="text-gray-300 animate-float" />;
      case 'rain':
      case 'drizzle':
        return <FaCloudRain {...iconProps} className="text-blue-300 animate-rain-drop" />;
      case 'snow':
        return <FaSnowflake {...iconProps} className="text-blue-200 animate-spin-slow" />;
      case 'thunderstorm':
        return <FaBolt {...iconProps} className="text-yellow-500 animate-pulse" />;
      case 'mist':
      case 'fog':
        return <FaWind {...iconProps} className="text-gray-300 animate-float" />;
      default:
        return <FaSun {...iconProps} className="text-yellow-400" />;
    }
  };

  return (
    <div className="inline-block">
      {getIcon()}
    </div>
  );
};

export default AnimatedWeatherIcon;