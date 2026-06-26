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
  FaHistory
} from 'react-icons/fa';

const PremiumFeatures = ({ weather, forecast, unit }) => {
  if (!weather) return null;

  // ========== 1. SKIN & HAIR CARE TIPS ==========
  const getSkinCareTips = () => {
    const temp = weather.main?.temp || 0;
    const humidity = weather.main?.humidity || 0;
    const uvIndex = Math.round((weather.main?.temp || 0) / 10); // Simulated UV
    const condition = weather.weather?.[0]?.main?.toLowerCase() || '';

    const tips = [];
    
    // UV Tips
    if (uvIndex > 7) {
      tips.push({
        icon: <FaSun className="text-red-400" />,
        title: '☀️ High UV Alert!',
        advice: 'Apply SPF 50+ sunscreen. Reapply every 2 hours. Wear a hat and sunglasses.',
        severity: 'high'
      });
    } else if (uvIndex > 4) {
      tips.push({
        icon: <FaSun className="text-yellow-400" />,
        title: '🌤️ Moderate UV',
        advice: 'SPF 30+ sunscreen recommended. Stay in shade during peak hours (12-4 PM).',
        severity: 'medium'
      });
    }

    // Humidity Tips
    if (humidity > 70) {
      tips.push({
        icon: <FaTint className="text-blue-400" />,
        title: '💧 High Humidity Alert!',
        advice: 'Hair frizz alert! Use anti-frizz serum. Apply lightweight moisturizer.',
        severity: 'high'
      });
    } else if (humidity < 30) {
      tips.push({
        icon: <FaTint className="text-orange-400" />,
        title: '🌵 Dry Air Alert!',
        advice: 'Skin needs hydration! Apply rich moisturizer. Drink more water today.',
        severity: 'medium'
      });
    }

    // Temperature Tips
    if (temp > 35) {
      tips.push({
        icon: <FaSun className="text-red-500" />,
        title: '🔥 Extreme Heat!',
        advice: 'Stay indoors during peak hours. Drink plenty of water. Wear light clothing.',
        severity: 'high'
      });
    } else if (temp < 10) {
      tips.push({
        icon: <FaCloud className="text-blue-300" />,
        title: '❄️ Cold Weather Alert!',
        advice: 'Apply rich moisturizer. Use lip balm. Wear warm, layered clothing.',
        severity: 'medium'
      });
    }

    // Rain Tips
    if (condition.includes('rain') || condition.includes('drizzle')) {
      tips.push({
        icon: <FaUmbrella className="text-blue-400" />,
        title: '☔ Rainy Day!',
        advice: 'Carry an umbrella. Use waterproof makeup. Avoid styling hair with heat.',
        severity: 'low'
      });
    }

    return tips.length > 0 ? tips : [
      {
        icon: <FaTint className="text-green-400" />,
        title: '🌿 Perfect Weather Today!',
        advice: 'Ideal conditions for skin and hair. Enjoy your day outdoors!',
        severity: 'low'
      }
    ];
  };

  // ========== 2. WEATHER SCORE ==========
  const getWeatherScore = () => {
    const temp = weather.main?.temp || 0;
    const humidity = weather.main?.humidity || 0;
    const wind = weather.wind?.speed || 0;
    const condition = weather.weather?.[0]?.main?.toLowerCase() || '';

    let score = 100;
    const breakdown = [];

    // Temperature (25°C is ideal)
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

    // Humidity (40-60% is ideal)
    if (humidity > 80 || humidity < 20) {
      score -= 20;
      breakdown.push({ factor: 'Humidity', impact: 'Extreme', deduction: 20 });
    } else if (humidity > 70 || humidity < 30) {
      score -= 10;
      breakdown.push({ factor: 'Humidity', impact: 'Moderate', deduction: 10 });
    } else {
      breakdown.push({ factor: 'Humidity', impact: 'Good ✅', deduction: 0 });
    }

    // Wind (5-15 km/h is ideal)
    if (wind > 30) {
      score -= 15;
      breakdown.push({ factor: 'Wind', impact: 'High', deduction: 15 });
    } else if (wind > 20) {
      score -= 8;
      breakdown.push({ factor: 'Wind', impact: 'Moderate', deduction: 8 });
    } else {
      breakdown.push({ factor: 'Wind', impact: 'Good ✅', deduction: 0 });
    }

    // Rain (Clear is best)
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

    // Score categories
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

  // ========== 3. BEST TIME TO GO OUT ==========
  const getBestTime = () => {
    if (!forecast || !forecast.list) return null;

    const now = new Date();
    const currentHour = now.getHours();
    
    // Find best time in next 24 hours
    let bestTime = null;
    let bestScore = -Infinity;

    for (let i = 0; i < forecast.list.length && i < 12; i++) {
      const item = forecast.list[i];
      const hour = new Date(item.dt * 1000);
      const temp = item.main?.temp || 0;
      const condition = item.weather?.[0]?.main?.toLowerCase() || '';
      
      // Score each time slot
      let score = 100;
      if (temp > 35 || temp < 5) score -= 30;
      else if (temp > 30 || temp < 10) score -= 15;
      
      if (condition.includes('rain') || condition.includes('drizzle')) score -= 30;
      else if (condition.includes('cloud')) score -= 10;
      
      if (hour.getHours() >= 11 && hour.getHours() <= 15) score -= 20; // Peak sun
      
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

  // ========== 4. WEATHER FUN FACTS ==========
  const getWeatherFacts = () => {
    const temp = weather.main?.temp || 0;
    const humidity = weather.main?.humidity || 0;
    const wind = weather.wind?.speed || 0;
    const condition = weather.weather?.[0]?.main?.toLowerCase() || '';

    const facts = [
      {
        icon: '🌍',
        fact: `The warmest temperature ever recorded was 56.7°C in Death Valley, California.`,
        emoji: '🔥'
      },
      {
        icon: '💧',
        fact: `Every day, about 1,000 tons of water evaporate from the Earth's surface.`,
        emoji: '💧'
      },
      {
        icon: '⚡',
        fact: `Lightning strikes the Earth about 100 times every second. That's 8.6 million times a day!`,
        emoji: '⚡'
      },
      {
        icon: '❄️',
        fact: `The coldest temperature recorded was -89.2°C in Antarctica.`,
        emoji: '🥶'
      },
      {
        icon: '🌪️',
        fact: `The fastest wind speed ever recorded was 407 km/h in Australia.`,
        emoji: '💨'
      },
      {
        icon: '🌈',
        fact: `Rainbows appear when sunlight hits water droplets. You can never reach the end of a rainbow!`,
        emoji: '🌈'
      },
      {
        icon: '☁️',
        fact: `Clouds can weigh up to 1 million pounds (450,000 kg)!`,
        emoji: '☁️'
      },
      {
        icon: '🌊',
        fact: `The world's largest ocean wave was 30.5 meters (100 feet) tall.`,
        emoji: '🌊'
      }
    ];

    // Pick random facts
    const randomFacts = [];
    const shuffled = [...facts].sort(() => 0.5 - Math.random());
    for (let i = 0; i < Math.min(2, shuffled.length); i++) {
      randomFacts.push(shuffled[i]);
    }

    return randomFacts;
  };

  // ========== RENDER COMPONENT ==========
  const skinTips = getSkinCareTips();
  const weatherScore = getWeatherScore();
  const bestTime = getBestTime();
  const funFacts = getWeatherFacts();

  return (
    <div className="space-y-6 mt-8">
      
      {/* 💧 Skin & Hair Care Tips */}
      <div className="glass-card rounded-2xl p-6 border border-[#FF6B35]/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaTint className="text-[#FF6B35]" />
          💧 Skin & Hair Care Tips
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

      {/* 🎯 Weather Score */}
      <div className="glass-card rounded-2xl p-6 border border-[#FF6B35]/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaStar className="text-[#FF6B35]" />
          🎯 Weather Score
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Score Circle */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-[#FF6B35] flex items-center justify-center">
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

          {/* Score Breakdown */}
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

      {/* 🌅 Best Time to Go Out */}
      {bestTime && (
        <div className="glass-card rounded-2xl p-6 border border-[#FF6B35]/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaClock className="text-[#FF6B35]" />
            🌅 Best Time to Go Out
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#FF6B35]">
                {bestTime.timeStr}
              </div>
              <p className="text-white/60 text-sm">{bestTime.temp}°{unit}</p>
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

      {/* ⚡ Weather Fun Facts */}
      <div className="glass-card rounded-2xl p-6 border border-[#FF6B35]/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-[#FF6B35]" />
          ⚡ Did You Know?
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
        <div className="mt-3 text-center">
          <button 
            onClick={() => window.location.reload()}
            className="text-white/40 text-xs hover:text-[#FF6B35] transition-colors"
          >
            🔄 Show new facts
          </button>
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
          🚀 Premium features powered by AI
        </p>
      </div>
    </div>
  );
};

export default PremiumFeatures;