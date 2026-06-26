import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto mt-6 animate-pulse">
      {/* Current Weather Skeleton */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <div className="h-8 w-40 bg-white/10 rounded-lg mb-2"></div>
            <div className="h-4 w-32 bg-white/10 rounded-lg mb-4"></div>
            <div className="h-16 w-16 bg-white/10 rounded-full mx-auto md:mx-0"></div>
          </div>
          <div className="my-6 md:my-0">
            <div className="h-20 w-32 bg-white/10 rounded-lg"></div>
            <div className="h-4 w-24 bg-white/10 rounded-lg mt-2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="h-4 w-16 bg-white/10 rounded-lg mb-2 mx-auto"></div>
              <div className="h-6 w-12 bg-white/10 rounded-lg mx-auto"></div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="h-4 w-16 bg-white/10 rounded-lg mb-2 mx-auto"></div>
              <div className="h-6 w-12 bg-white/10 rounded-lg mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Skeleton */}
      <div className="mt-8">
        <div className="h-8 w-48 bg-white/10 rounded-lg mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-3">
              <div className="h-4 w-12 bg-white/10 rounded-lg mx-auto mb-2"></div>
              <div className="h-10 w-10 bg-white/10 rounded-full mx-auto mb-2"></div>
              <div className="h-6 w-12 bg-white/10 rounded-lg mx-auto mb-1"></div>
              <div className="h-3 w-16 bg-white/10 rounded-lg mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast Skeleton */}
      <div className="mt-8">
        <div className="h-8 w-48 bg-white/10 rounded-lg mb-4"></div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-3">
              <div className="h-3 w-12 bg-white/10 rounded-lg mx-auto mb-2"></div>
              <div className="h-8 w-8 bg-white/10 rounded-full mx-auto mb-2"></div>
              <div className="h-5 w-10 bg-white/10 rounded-lg mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;