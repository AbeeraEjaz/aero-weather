import React from 'react';
import { FaTemperatureHigh, FaTint, FaWind, FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': <FaSun className="text-6xl text-yellow-400" />,
      'Clouds': <FaCloud className="text-6xl text-gray-400" />,
      'Rain': <FaCloudRain className="text-6xl text-blue-400" />,
      'Snow': <FaSnowflake className="text-6xl text-blue-200" />,
      'Thunderstorm': <FaCloudRain className="text-6xl text-purple-400" />,
      'Drizzle': <FaCloudRain className="text-6xl text-blue-300" />,
      'Mist': <FaCloud className="text-6xl text-gray-300" />,
    };
    return iconMap[condition] || <FaSun className="text-6xl text-yellow-400" />;
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left: City & Weather Icon */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-white/60 text-lg capitalize">
            {weather.weather[0].description}
          </p>
          <div className="mt-4">
            {getWeatherIcon(weather.weather[0].main)}
          </div>
        </div>

        {/* Center: Temperature */}
        <div className="my-6 md:my-0">
          <div className="text-7xl font-extrabold text-[#FF6B35]">
            {Math.round(weather.main.temp)}°C
          </div>
          <p className="text-white/60 text-center">
            Feels like {Math.round(weather.main.feels_like)}°C
          </p>
        </div>

        {/* Right: Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <FaTint className="text-[#FF6B35] text-2xl mx-auto mb-2" />
            <p className="text-white/60 text-sm">Humidity</p>
            <p className="text-white font-bold">{weather.main.humidity}%</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <FaWind className="text-[#FF6B35] text-2xl mx-auto mb-2" />
            <p className="text-white/60 text-sm">Wind Speed</p>
            <p className="text-white font-bold">{Math.round(weather.wind.speed)} km/h</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center col-span-2">
            <FaTemperatureHigh className="text-[#FF6B35] text-2xl mx-auto mb-2" />
            <p className="text-white/60 text-sm">Min / Max</p>
            <p className="text-white font-bold">
              {Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;