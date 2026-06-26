import React from 'react';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';

const Forecast = ({ forecast, unit }) => {
  if (!forecast || !forecast.list) return null;

  const getDailyForecast = () => {
    const daily = [];
    const today = new Date().getDate();
    
    for (let i = 0; i < forecast.list.length; i += 8) {
      if (i < forecast.list.length) {
        const item = forecast.list[i];
        const date = new Date(item.dt * 1000);
        if (date.getDate() !== today || daily.length === 0) {
          daily.push(item);
        }
        if (daily.length >= 7) break;
      }
    }
    return daily;
  };

  const getHourlyForecast = () => {
    return forecast.list.slice(0, 8);
  };

  const dailyForecast = getDailyForecast();
  const hourlyForecast = getHourlyForecast();

  const getDayName = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const convertTemp = (temp) => {
    if (unit === 'F') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  return (
    <div className="space-y-6 mt-8">
      {/* 7-Day Forecast */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📅</span> 7-Day Forecast
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {dailyForecast.map((item, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <p className="text-white/70 text-sm font-medium">
                {index === 0 ? 'Today' : getDayName(item.dt)}
              </p>
              <div className="text-3xl my-2 flex justify-center">
                <AnimatedWeatherIcon 
                  condition={item.weather[0].main} 
                  size={40}
                />
              </div>
              <p className="text-white font-bold text-lg">
                {convertTemp(item.main.temp)}°{unit}
              </p>
              <p className="text-white/40 text-xs capitalize truncate">
                {item.weather[0].description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🕐</span> Hourly Forecast
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {hourlyForecast.map((item, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-3 text-center hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <p className="text-white/60 text-xs font-medium">
                {getHour(item.dt)}
              </p>
              <div className="text-2xl my-1 flex justify-center">
                <AnimatedWeatherIcon 
                  condition={item.weather[0].main} 
                  size={30}
                />
              </div>
              <p className="text-white font-bold text-base">
                {convertTemp(item.main.temp)}°{unit}
              </p>
              <p className="text-white/40 text-[10px] capitalize truncate">
                {item.weather[0].description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;