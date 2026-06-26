import React from 'react';
import { 
  FaTint, 
  FaStar, 
  FaSun, 
  FaCloud, 
  FaWind, 
  FaUmbrella,
  FaClock,
  FaInfoCircle,
  FaHeart,
  FaHistory,
  FaArrowRight
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const PremiumFeatures = ({ weather, forecast, unit }) => {
  if (!weather) return null;

  // ===== Click Handlers =====
  const handleSkinTipClick = () => {
    toast.success('💧 Loading personalized skin care tips...');
  };

  const handleWeatherScoreClick = () => {
    toast.success('🎯 Calculating your weather score...');
  };

  const handleBestTimeClick = () => {
    toast.success('🌅 Finding the best outdoor time for you...');
  };

  const handleFunFactClick = () => {
    toast.success('⚡ Loading more interesting weather facts...');
  };

  // ===== 1. SKIN & HAIR CARE TIPS =====
const getSkinCareTips = () => {
  const temp = weather.main?.temp || 0;
  const humidity = weather.main?.humidity || 0;
  const wind = weather.wind?.speed || 0;
  const condition = weather.weather?.[0]?.main?.toLowerCase() || '';
  const description = weather.weather?.[0]?.description?.toLowerCase() || '';

  const tips = [];
  
  // ===== TEMPERATURE BASED TIPS =====
  if (temp > 40) {
    tips.push({
      icon: '🔥',
      title: 'Extreme Heat Alert!',
      advice: '🌡️ Temperature is 40°C+! Apply SPF 50+ sunscreen, wear light cotton clothes, and stay hydrated. Avoid stepping out between 12-4 PM.',
      severity: 'high'
    });
  } else if (temp > 35) {
    tips.push({
      icon: '☀️',
      title: 'Very Hot Weather!',
      advice: '🌡️ It\'s 35°C+! Use SPF 50 sunscreen, wear a hat, and drink plenty of water. Your skin needs extra protection today.',
      severity: 'high'
    });
  } else if (temp > 30) {
    tips.push({
      icon: '🌤️',
      title: 'Warm Day!',
      advice: '🌡️ Temperature is 30°C+. Apply SPF 30+ sunscreen, use a lightweight moisturizer, and stay in shade when possible.',
      severity: 'medium'
    });
  } else if (temp > 25) {
    tips.push({
      icon: '🌿',
      title: 'Pleasant Weather!',
      advice: '🌡️ Perfect temperature for outdoor activities. Apply SPF 15+ sunscreen and enjoy the day!',
      severity: 'low'
    });
  } else if (temp < 5) {
    tips.push({
      icon: '❄️',
      title: 'Freezing Cold!',
      advice: '🥶 Temperature is below 5°C! Apply thick moisturizer, use lip balm, wear gloves, and cover your face to protect from windburn.',
      severity: 'high'
    });
  } else if (temp < 10) {
    tips.push({
      icon: '🥶',
      title: 'Cold Weather!',
      advice: '❄️ It\'s chilly! Use a rich moisturizer, apply lip balm, and wear warm clothing to protect your skin from cold winds.',
      severity: 'medium'
    });
  } else if (temp < 15) {
    tips.push({
      icon: '🍂',
      title: 'Cool Weather!',
      advice: '🍁 Slightly cool. Use a good moisturizer and protect your hands with gloves if going out.',
      severity: 'low'
    });
  }

  // ===== HUMIDITY BASED TIPS =====
  if (humidity > 80) {
    tips.push({
      icon: '💧',
      title: 'Very High Humidity!',
      advice: '💦 Humidity is 80%+! Hair frizz alert! Use anti-frizz serum, lightweight moisturizer, and avoid heavy creams.',
      severity: 'high'
    });
  } else if (humidity > 65) {
    tips.push({
      icon: '💦',
      title: 'High Humidity!',
      advice: '💨 Humidity is high! Use a lightweight moisturizer, anti-frizz spray, and drink extra water.',
      severity: 'medium'
    });
  } else if (humidity < 25) {
    tips.push({
      icon: '🏜️',
      title: 'Very Dry Air!',
      advice: '🌵 Humidity is below 25%! Skin needs extra hydration. Use a rich moisturizer, apply face oil, and drink 8+ glasses of water.',
      severity: 'high'
    });
  } else if (humidity < 35) {
    tips.push({
      icon: '🌵',
      title: 'Dry Air Alert!',
      advice: '💨 Air is dry. Use a hydrating moisturizer, apply lip balm, and keep a water bottle handy.',
      severity: 'medium'
    });
  }

  // ===== WIND BASED TIPS =====
  if (wind > 30) {
    tips.push({
      icon: '💨',
      title: 'Strong Winds!',
      advice: '🌬️ Wind speed is high! Protect your skin with a scarf, use a thick moisturizer, and tie your hair back.',
      severity: 'medium'
    });
  } else if (wind > 20) {
    tips.push({
      icon: '🍃',
      title: 'Windy Conditions!',
      advice: '💨 It\'s windy. Use a moisturizing cream, protect your lips, and keep hair products handy.',
      severity: 'low'
    });
  }

  // ===== WEATHER CONDITION TIPS =====
  if (condition.includes('rain') || condition.includes('drizzle')) {
    tips.push({
      icon: '☔',
      title: 'Rainy Day!',
      advice: '🌧️ Carry an umbrella. Use waterproof makeup, avoid heat styling, and wear a hat to protect your hair.',
      severity: 'low'
    });
  }
  
  if (condition.includes('snow') || condition.includes('sleet')) {
    tips.push({
      icon: '🌨️',
      title: 'Snow Alert!',
      advice: '❄️ Protect your skin from cold! Use a thick moisturizer, wear gloves, and apply lip balm frequently.',
      severity: 'medium'
    });
  }

  if (description.includes('mist') || description.includes('fog')) {
    tips.push({
      icon: '🌫️',
      title: 'Foggy Conditions!',
      advice: '🌫️ Low visibility! Stay hydrated and protect your skin with a good moisturizer.',
      severity: 'low'
    });
  }

  if (condition.includes('clear') || condition.includes('sunny')) {
    tips.push({
      icon: '☀️',
      title: 'Sunny Day!',
      advice: '☀️ Perfect weather! Apply sunscreen, wear sunglasses, and enjoy outdoor activities safely.',
      severity: 'low'
    });
  }

  // ===== SUNRISE/SUNSET TIPS =====
  const hour = new Date().getHours();
  if (hour >= 5 && hour <= 7) {
    tips.push({
      icon: '🌅',
      title: 'Beautiful Sunrise!',
      advice: '🌅 Great time for morning walk! Apply sunscreen and enjoy the fresh morning air.',
      severity: 'low'
    });
  } else if (hour >= 18 && hour <= 20) {
    tips.push({
      icon: '🌇',
      title: 'Golden Hour!',
      advice: '🌇 Perfect time for outdoor photos! Cool temperature, gentle light, and comfortable weather.',
      severity: 'low'
    });
  }

  // ===== GENERAL WELLNESS TIPS =====
  if (temp > 30 && humidity > 60) {
    tips.push({
      icon: '🥵',
      title: 'Hot & Humid!',
      advice: '😓 Hot and humid! Avoid heavy makeup, use a setting spray, and keep blotting paper handy.',
      severity: 'high'
    });
  }

  // If no tips were added, add a general nice weather tip
  if (tips.length === 0) {
    tips.push({
      icon: '🌿',
      title: 'Beautiful Weather Today!',
      advice: '🌤️ The weather is lovely! Enjoy your day outdoors with proper sun protection.',
      severity: 'low'
    });
  }

  // Limit to top 4 most important tips (highest severity first)
  const severityOrder = { high: 0, medium: 1, low: 2 };
  tips.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
  
  return tips.slice(0, 4);
};
       
      
  // ===== 2. WEATHER SCORE =====
  const getWeatherScore = () => {
    const temp = weather.main?.temp || 0;
    const humidity = weather.main?.humidity || 0;
    const wind = weather.wind?.speed || 0;
    const condition = weather.weather?.[0]?.main?.toLowerCase() || '';

    let score = 100;
    const breakdown = [];

    if (temp > 35 || temp < 5) {
      score -= 25;
      breakdown.push({ factor: 'Temperature', impact: 'Extreme', deduction: 25 });
    } else if (temp > 30 || temp < 10) {
      score -= 15;
      breakdown.push({ factor: 'Temperature', impact: 'Moderate', deduction: 15 });
    } else if (temp > 25 || temp < 15) {
      score -= 5;
      breakdown.push({ factor: 'Temperature', impact: 'Good', deduction: 5 });
    } else {
      breakdown.push({ factor: 'Temperature', impact: 'Perfect ✅', deduction: 0 });
    }

    if (humidity > 80 || humidity < 20) {
      score -= 20;
      breakdown.push({ factor: 'Humidity', impact: 'Extreme', deduction: 20 });
    } else if (humidity > 70 || humidity < 30) {
      score -= 10;
      breakdown.push({ factor: 'Humidity', impact: 'Moderate', deduction: 10 });
    } else {
      breakdown.push({ factor: 'Humidity', impact: 'Good ✅', deduction: 0 });
    }

    if (wind > 30) {
      score -= 15;
      breakdown.push({ factor: 'Wind', impact: 'High', deduction: 15 });
    } else if (wind > 20) {
      score -= 8;
      breakdown.push({ factor: 'Wind', impact: 'Moderate', deduction: 8 });
    } else {
      breakdown.push({ factor: 'Wind', impact: 'Good ✅', deduction: 0 });
    }

    if (condition.includes('rain') || condition.includes('drizzle')) {
      score -= 20;
      breakdown.push({ factor: 'Rain', impact: 'Rainy', deduction: 20 });
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
      score -= 10;
      breakdown.push({ factor: 'Clouds', impact: 'Cloudy', deduction: 10 });
    } else {
      breakdown.push({ factor: 'Weather', impact: 'Clear ✅', deduction: 0 });
    }

    score = Math.max(0, score);

    let category, color, emoji;
    if (score >= 80) {
      category = 'Excellent! 🌟';
      color = 'text-green-400';
      emoji = '🌟';
    } else if (score >= 60) {
      category = 'Good! 👍';
      color = 'text-blue-400';
      emoji = '👍';
    } else if (score >= 40) {
      category = 'Moderate 😐';
      color = 'text-yellow-400';
      emoji = '😐';
    } else {
      category = 'Poor 😔';
      color = 'text-red-400';
      emoji = '😔';
    }

    return { score, category, color, emoji, breakdown };
  };

  // ===== 3. BEST TIME TO GO OUT =====
  const getBestTime = () => {
    if (!forecast || !forecast.list) return null;

    let bestTime = null;
    let bestScore = -Infinity;

    for (let i = 0; i < forecast.list.length && i < 12; i++) {
      const item = forecast.list[i];
      const hour = new Date(item.dt * 1000);
      const temp = item.main?.temp || 0;
      const condition = item.weather?.[0]?.main?.toLowerCase() || '';
      
      let score = 100;
      if (temp > 35 || temp < 5) score -= 30;
      else if (temp > 30 || temp < 10) score -= 15;
      
      if (condition.includes('rain') || condition.includes('drizzle')) score -= 30;
      else if (condition.includes('cloud')) score -= 10;
      
      if (hour.getHours() >= 11 && hour.getHours() <= 15) score -= 20;
      
      if (score > bestScore) {
        bestScore = score;
        bestTime = {
          hour: hour,
          temp: temp,
          condition: condition,
          score: score
        };
      }
    }

    if (!bestTime) return null;

    const timeStr = bestTime.hour.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const advice = bestTime.score > 70 
      ? '🌟 Perfect time for outdoor activities!' 
      : bestTime.score > 50 
      ? '👍 Good time, but take precautions.' 
      : '⚠️ Not ideal conditions. Consider indoor activities.';

    return { ...bestTime, timeStr, advice };
  };

  // ===== 4. WEATHER FUN FACTS =====
  const getWeatherFacts = () => {
    const facts = [
      { icon: '🌍', fact: 'The warmest temperature ever recorded was 56.7°C in Death Valley, California.' },
      { icon: '💧', fact: 'Every day, about 1,000 tons of water evaporate from the Earth\'s surface.' },
      { icon: '⚡', fact: 'Lightning strikes the Earth about 100 times every second!' },
      { icon: '❄️', fact: 'The coldest temperature recorded was -89.2°C in Antarctica.' },
      { icon: '🌪️', fact: 'The fastest wind speed ever recorded was 407 km/h in Australia.' },
      { icon: '🌈', fact: 'You can never reach the end of a rainbow - it\'s an optical illusion!' },
      { icon: '☁️', fact: 'Clouds can weigh up to 1 million pounds (450,000 kg)!' },
      { icon: '🌊', fact: 'The world\'s largest ocean wave was 30.5 meters (100 feet) tall.' }
    ];

    const shuffled = [...facts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const skinTips = getSkinCareTips();
  const weatherScore = getWeatherScore();
  const bestTime = getBestTime();
  const funFacts = getWeatherFacts();

  return (
    <div className="space-y-6 mt-8">
      
      {/* 💧 Skin & Hair Care Tips - CLICKABLE */}
      <div 
        className="glass-card rounded-2xl p-6 border border-[#FF6B35]/20 cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-[#FF6B35]/20 premium-card"
        onClick={handleSkinTipClick}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaTint className="text-[#FF6B35]" />
          💧 Skin & Hair Care Tips
          <span className="text-xs text-white/40 ml-auto flex items-center gap-1">
            Click for more <FaArrowRight className="text-[#FF6B35]" />
          </span>
        </h3>
        <div className="space-y-3">
          {skinTips.map((tip, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-xl border ${
                tip.severity === 'high' 
                  ? 'border-red-500/30 bg-red-500/10' 
                  : tip.severity === 'medium'
                  ? 'border-yellow-500/30 bg-yellow-500/10'
                  : 'border-green-500/30 bg-green-500/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-1">
                  {tip.icon}
                </div>
                <div>
                  <p className="text-white font-semibold">{tip.title}</p>
                  <p className="text-white/70 text-sm">{tip.advice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🎯 Weather Score - CLICKABLE */}
      <div 
        className="glass-card rounded-2xl p-6 border border-[#FF6B35]/20 cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-[#FF6B35]/20 premium-card"
        onClick={handleWeatherScoreClick}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaStar className="text-[#FF6B35]" />
          🎯 Weather Score
          <span className="text-xs text-white/40 ml-auto flex items-center gap-1">
            Click for details <FaArrowRight className="text-[#FF6B35]" />
          </span>
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-[#FF6B35] flex items-center justify-center pulse-glow">
              <div className="text-center">
                <div className={`text-4xl font-bold ${weatherScore.color}`}>
                  {weatherScore.score}
                </div>
                <div className="text-white/60 text-xs">/100</div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className={`text-lg font-semibold ${weatherScore.color}`}>
                {weatherScore.emoji} {weatherScore.category}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="space-y-2">
              {weatherScore.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-white/70">{item.factor}</span>
                  <span className={`${item.deduction === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {item.impact}
                    {item.deduction > 0 && ` (-${item.deduction})`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🌅 Best Time to Go Out - CLICKABLE */}
      {bestTime && (
        <div 
          className="glass-card rounded-2xl p-6 border border-[#FF6B35]/20 cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-[#FF6B35]/20 premium-card"
          onClick={handleBestTimeClick}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaClock className="text-[#FF6B35]" />
            🌅 Best Time to Go Out
            <span className="text-xs text-white/40 ml-auto flex items-center gap-1">
              Click for more <FaArrowRight className="text-[#FF6B35]" />
            </span>
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#FF6B35]">
                {bestTime.timeStr}
              </div>
              <p className="text-white/60 text-sm">{Math.round(bestTime.temp)}°{unit}</p>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-white font-medium">{bestTime.advice}</p>
              <p className="text-white/40 text-xs mt-1">
                Condition: {bestTime.condition || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ⚡ Weather Fun Facts - CLICKABLE */}
      <div 
        className="glass-card rounded-2xl p-6 border border-[#FF6B35]/20 cursor-pointer hover:scale-[1.02] transition-all duration-300 hover:shadow-[#FF6B35]/20 premium-card"
        onClick={handleFunFactClick}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-[#FF6B35]" />
          ⚡ Did You Know?
          <span className="text-xs text-white/40 ml-auto flex items-center gap-1">
            Click for more <FaArrowRight className="text-[#FF6B35]" />
          </span>
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {funFacts.map((fact, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <span className="text-2xl">{fact.icon}</span>
                <p className="text-white/80 text-sm">{fact.fact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Features Footer */}
      <div className="glass-card rounded-2xl p-4 border border-[#FF6B35]/20 bg-[#FF6B35]/5">
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <span className="text-white/40 flex items-center gap-1">
            <FaHeart className="text-[#FF6B35]" />
            Favorites Saved
          </span>
          <span className="text-white/40 flex items-center gap-1">
            <FaTint className="text-[#FF6B35]" />
            Skin Tips Active
          </span>
          <span className="text-white/40 flex items-center gap-1">
            <FaStar className="text-[#FF6B35]" />
            Weather Score
          </span>
          <span className="text-white/40 flex items-center gap-1">
            <FaHistory className="text-[#FF6B35]" />
            History Tracked
          </span>
        </div>
        <p className="text-white/20 text-center text-xs mt-2">
          🚀 Premium features powered by AI • Click any card for more info
        </p>
      </div>
    </div>
  );
};

export default PremiumFeatures;