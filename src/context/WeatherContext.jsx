import React, { createContext, useState, useContext } from 'react';
import { fetchWeather, fetchForecast } from '../utils/weatherApi';
import toast from 'react-hot-toast';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');
  const [unit, setUnit] = useState('C'); // 'C' or 'F'

  const getWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await fetchWeather(cityName);
      const forecastData = await fetchForecast(cityName);
      
      setWeather(weatherData);
      setForecast(forecastData);
      setCity(cityName);
      toast.success(`🌤️ Weather updated for ${cityName}!`);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-detect location
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported');
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getWeatherByLocation = async () => {
    try {
      const position = await getLocation();
      const { latitude, longitude } = position.coords;
      
      setLoading(true);
      setError(null);
      
      // Use reverse geocoding or direct coordinates
      const weatherData = await fetchWeather(`${latitude},${longitude}`);
      const forecastData = await fetchForecast(`${latitude},${longitude}`);
      
      setWeather(weatherData);
      setForecast(forecastData);
      setCity(weatherData.name);
      toast.success(`📍 Location detected: ${weatherData.name}`);
    } catch (err) {
      setError('Unable to detect location. Please search manually.');
      toast.error('Location detection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{
      weather,
      forecast,
      loading,
      error,
      city,
      unit,
      setUnit,
      getWeather,
      getWeatherByLocation
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within WeatherProvider');
  }
  return context;
};