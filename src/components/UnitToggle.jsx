import React from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';

const UnitToggle = ({ unit, setUnit }) => {
  return (
    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full p-1">
      <FaTemperatureHigh className="text-[#FF6B35] ml-2" />
      <button
        onClick={() => setUnit('C')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          unit === 'C' 
            ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30' 
            : 'text-white/60 hover:text-white'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit('F')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          unit === 'F' 
            ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30' 
            : 'text-white/60 hover:text-white'
        }`}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;