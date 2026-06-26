import React, { useEffect, useState } from 'react';

const DynamicBackground = ({ weather, children }) => {
  const [background, setBackground] = useState('default');

  useEffect(() => {
    if (!weather) return;

    const condition = weather.weather?.[0]?.main?.toLowerCase() || '';
    const time = new Date().getHours();
    const isNight = time < 6 || time > 18;

    // 🌟 BEAUTIFUL BACKGROUNDS
    if (condition.includes('clear') || condition.includes('sunny')) {
      setBackground(isNight ? 'night-clear' : 'sunny');
    } else if (condition.includes('cloud')) {
      setBackground(isNight ? 'night-cloudy' : 'cloudy');
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      setBackground('rainy');
    } else if (condition.includes('snow')) {
      setBackground('snowy');
    } else if (condition.includes('thunder') || condition.includes('storm')) {
      setBackground('stormy');
    } else if (condition.includes('mist') || condition.includes('fog')) {
      setBackground('foggy');
    } else {
      setBackground('default');
    }
  }, [weather]);

  const getBackgroundClass = () => {
    const classes = {
      // 🌞 SUNNY - Warm & Bright
      'sunny': 'bg-gradient-to-br from-[#FF6B35] via-[#FF8A5C] to-[#FFB07C]',
      
      // 🌙 NIGHT CLEAR - Deep Purple/Blue
      'night-clear': 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
      
      // ☁️ CLOUDY - Soft Gray
      'cloudy': 'bg-gradient-to-br from-[#4a4a5a] via-[#6a6a7a] to-[#8a8a9a]',
      
      // 🌙 NIGHT CLOUDY - Dark Gray
      'night-cloudy': 'bg-gradient-to-br from-[#1a1a2e] via-[#2d2d44] to-[#3d3d5c]',
      
      // 🌧️ RAINY - Deep Blue
      'rainy': 'bg-gradient-to-br from-[#1a2a4a] via-[#2a3a5a] to-[#3a4a6a]',
      
      // ❄️ SNOWY - Cool White/Blue
      'snowy': 'bg-gradient-to-br from-[#d4e8f0] via-[#e8f0f8] to-[#f0f8ff]',
      
      // ⚡ STORMY - Dark Dramatic
      'stormy': 'bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#2a1a3e]',
      
      // 🌫️ FOGGY - Muted Gray
      'foggy': 'bg-gradient-to-br from-[#5a5a6a] via-[#7a7a8a] to-[#9a9aaa]',
      
      // DEFAULT - Beautiful Dark Navy (No Blue!)
      'default': 'bg-gradient-to-br from-[#1a1a2e] via-[#2d2d44] to-[#3d3d5c]'
    };
    return classes[background] || classes.default;
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getBackgroundClass()}`}>
      {/* Animated Particles/Effects */}
      {background === 'rainy' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                height: `${10 + Math.random() * 20}px`,
                width: '2px',
                background: 'rgba(255,255,255,0.3)',
                borderRadius: '50%'
              }}
            />
          ))}
        </div>
      )}

      {background === 'snowy' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-snow"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                width: `${5 + Math.random() * 10}px`,
                height: `${5 + Math.random() * 10}px`,
                background: 'white',
                borderRadius: '50%',
                opacity: 0.8
              }}
            />
          ))}
        </div>
      )}

      {/* Stars for night mode */}
      {(background === 'night-clear' || background === 'night-cloudy') && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 3}px`,
                height: `${1 + Math.random() * 3}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DynamicBackground;