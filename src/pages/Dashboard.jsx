import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWeather } from '../context/WeatherContext';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaLocationArrow, FaSpinner, FaLock, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import DynamicBackground from '../components/DynamicBackground';
import LoadingSkeleton from '../components/LoadingSkeleton';
import AnimatedWeatherIcon from '../components/AnimatedWeatherIcon';
import Forecast from '../components/Forecast';
import UnitToggle from '../components/UnitToggle';
import SavedCities from '../components/SavedCities';
import FavoriteButton from '../components/FavoriteButton';
import { addToRecentSearches } from '../utils/localStorage';
import PremiumFeatures from '../components/PremiumFeatures';

const Dashboard = () => {
  const { 
    weather, 
    forecast, 
    loading, 
    error, 
    getWeather, 
    getWeatherByLocation,
    unit,
    setUnit
  } = useWeather();
  
  const { user, isAuthenticated } = useAuth();
  const [searchCity, setSearchCity] = useState('');
  const [currentCityName, setCurrentCityName] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchCity.trim()) {
      toast.error('Please enter a city name');
      return;
    }
    getWeather(searchCity);
    setSearchCity('');
  };

  const handleLocation = () => {
    toast.loading('Detecting your location...');
    getWeatherByLocation();
  };

  const handleCitySelect = (city) => {
    getWeather(city);
  };

  // Auto-load on first visit
  useEffect(() => {
    if (!weather && !loading && !error) {
      getWeather('London');
    }
  }, []);

  // Save to recent searches when weather updates
  useEffect(() => {
    if (weather) {
      setCurrentCityName(weather.name);
      addToRecentSearches(weather.name);
    }
  }, [weather]);

  return (
    <DynamicBackground weather={weather}>
      <div className="min-h-screen py-8 px-4 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold">
              Weather <span className="text-[#FF6B35] temp-glow">Dashboard</span>
            </h1>
            <p className="text-white/80 mt-2 text-lg">
              {weather ? `📍 ${weather.name}, ${weather.sys?.country || ''}` : '🌍 Search for a city'}
            </p>
          </div>

          {/* ⭐ DEMO BANNER - Show when NOT logged in */}
          {!isAuthenticated && (
            <div className="max-w-2xl mx-auto mb-6">
              <div className="glass-card-dark rounded-xl p-4 border border-yellow-500/30 bg-black/60 backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FaLock className="text-yellow-400" />
                    <p className="text-yellow-400 text-sm">
                      🔓 You're in <strong>Demo Mode</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs">Basic weather only</span>
                    <Link 
                      to="/signup" 
                      className="bg-[#FF6B35] text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#FFB07C] transition-all hover:scale-105 shadow-lg shadow-[#FF6B35]/30"
                    >
                      <FaStar className="inline mr-1" />
                      Sign Up for Premium
                    </Link>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-2 text-white/30 text-xs">
                  <span>✅ Search Weather</span>
                  <span>✅ 7-Day Forecast</span>
                  <span>❌ Favorites (Premium)</span>
                  <span>❌ Skin Tips (Premium)</span>
                  <span>❌ Weather Score (Premium)</span>
                </div>
              </div>
            </div>
          )}

          {/* Search & Controls */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative glass-card-dark rounded-full p-1 bg-black/50 backdrop-blur-xl border border-white/10">
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="🔍 Search for a city..."
                className="w-full bg-transparent border-none px-6 py-3 pl-14 text-white placeholder-white/50 focus:outline-none"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
              <button
                type="button"
                onClick={handleLocation}
                className="absolute right-24 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#FF6B35] transition-colors"
                title="Use my location"
              >
                <FaLocationArrow />
              </button>
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#FF6B35] px-6 py-2 rounded-full hover:bg-[#FFB07C] transition-all text-white font-semibold btn-glow disabled:opacity-50 shadow-lg shadow-[#FF6B35]/30"
                disabled={loading}
              >
                {loading ? <FaSpinner className="animate-spin" /> : 'Search'}
              </button>
            </form>

            {/* Unit Toggle */}
            <div className="mt-4 flex justify-center animate-fade-in-up">
              <UnitToggle unit={unit} setUnit={setUnit} />
            </div>

            {/* Saved Cities - Only for logged in users */}
            {isAuthenticated && (
              <SavedCities 
                onCitySelect={handleCitySelect} 
                currentCity={currentCityName}
              />
            )}

            {/* Premium Teaser for Guests */}
            {!isAuthenticated && weather && (
              <div className="mt-4 text-center">
                <Link 
                  to="/signup" 
                  className="text-white/40 text-xs hover:text-[#FF6B35] transition-colors inline-flex items-center gap-1"
                >
                  <FaStar className="text-[#FF6B35]" />
                  <span>Sign up to save favorites and get personalized tips</span>
                  <FaStar className="text-[#FF6B35]" />
                </Link>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading && <LoadingSkeleton />}

          {/* Error State */}
          {error && !loading && (
            <div className="max-w-2xl mx-auto glass-card-dark rounded-2xl p-8 text-center border-red-500/30 bg-black/60 backdrop-blur-xl">
              <p className="text-red-400 text-lg">❌ {error}</p>
              <p className="text-white/60 mt-2">Please try searching for another city.</p>
            </div>
          )}

          {/* Weather Display */}
          {weather && !loading && !error && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up mt-8">
              {/* Current Weather Card */}
              <div className="glass-card-dark rounded-2xl p-8 shadow-2xl hover:shadow-[#FF6B35]/20 transition-all duration-500 bg-black/60 backdrop-blur-xl border border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  {/* Left: City & Icon */}
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <h2 className="text-3xl font-bold text-white">
                        {weather.name}
                      </h2>
                      {/* Favorite Button - Only for logged in users */}
                      {isAuthenticated && (
                        <FavoriteButton city={weather.name} size={28} />
                      )}
                      {!isAuthenticated && (
                        <Link to="/signup" title="Sign up to save favorites">
                          <FaStar className="text-white/20 hover:text-[#FF6B35] transition-colors cursor-pointer" size={24} />
                        </Link>
                      )}
                    </div>
                    <p className="text-white/70 text-lg capitalize">
                      {weather.weather?.[0]?.description || 'No description'}
                    </p>
                    <div className="mt-3">
                      <AnimatedWeatherIcon 
                        condition={weather.weather?.[0]?.main} 
                        size={80}
                      />
                    </div>
                  </div>

                  {/* Center: Temperature */}
                  <div className="my-4 md:my-0 text-center">
                    <div className="text-7xl md:text-8xl font-extrabold text-[#FF6B35] temp-glow">
                      {unit === 'C' 
                        ? Math.round(weather.main?.temp || 0)
                        : Math.round((weather.main?.temp || 0) * 9/5 + 32)
                      }°{unit}
                    </div>
                    <p className="text-white/60 text-lg">
                      Feels like {unit === 'C'
                        ? Math.round(weather.main?.feels_like || 0)
                        : Math.round((weather.main?.feels_like || 0) * 9/5 + 32)
                      }°{unit}
                    </p>
                  </div>

                  {/* Right: Details Grid */}
                  <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                    <div className="glass-card-dark rounded-xl p-4 text-center bg-black/40 backdrop-blur-sm border border-white/5">
                      <p className="text-white/60 text-xs uppercase tracking-wider">Humidity</p>
                      <p className="text-white font-bold text-2xl">
                        {weather.main?.humidity || '--'}%
                      </p>
                    </div>
                    <div className="glass-card-dark rounded-xl p-4 text-center bg-black/40 backdrop-blur-sm border border-white/5">
                      <p className="text-white/60 text-xs uppercase tracking-wider">Wind</p>
                      <p className="text-white font-bold text-2xl">
                        {weather.wind?.speed ? Math.round(weather.wind.speed) : '--'} km/h
                      </p>
                    </div>
                    <div className="glass-card-dark rounded-xl p-4 text-center col-span-2 bg-black/40 backdrop-blur-sm border border-white/5">
                      <p className="text-white/60 text-xs uppercase tracking-wider">Min / Max</p>
                      <p className="text-white font-bold text-xl">
                        {unit === 'C'
                          ? Math.round(weather.main?.temp_min || 0)
                          : Math.round((weather.main?.temp_min || 0) * 9/5 + 32)
                        }° / {unit === 'C'
                          ? Math.round(weather.main?.temp_max || 0)
                          : Math.round((weather.main?.temp_max || 0) * 9/5 + 32)
                        }°{unit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Forecast Section */}
              {forecast && <Forecast forecast={forecast} unit={unit} />}

              {/* Premium Features - Only for logged in users */}
              {isAuthenticated && (
                <PremiumFeatures 
                  weather={weather} 
                  forecast={forecast} 
                  unit={unit} 
                />
              )}
            </div>
          )}

          {/* No Weather State */}
          {!weather && !loading && !error && (
            <div className="max-w-3xl mx-auto mt-12">
              <div className="glass-card-dark rounded-2xl p-12 shadow-xl text-center bg-black/60 backdrop-blur-xl border border-white/10">
                <div className="text-8xl mb-4">🌤️</div>
                <h3 className="text-3xl font-semibold text-white mb-2">Ready to Check Weather?</h3>
                <p className="text-white/60 text-lg">
                  Enter a city name or use your location to get started
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-white/40 text-sm">
                  <span className="glass-card-dark px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/5">London</span>
                  <span className="glass-card-dark px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/5">Karachi</span>
                  <span className="glass-card-dark px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/5">Lahore</span>
                  <span className="glass-card-dark px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/5">Dubai</span>
                  <span className="glass-card-dark px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/5">Tokyo</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DynamicBackground>
  );
};

export default Dashboard;