import React from 'react';
import { Link } from 'react-router-dom';
import { FaCloudSun, FaArrowRight, FaShieldAlt, FaGlobe, FaBolt, FaUserPlus, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 via-[#2D2D3F] to-[#2D2D3F]"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FFB07C]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#FF6B35]/20 backdrop-blur-sm border border-[#FF6B35]/30 rounded-full px-4 py-2 mb-6">
              <FaBolt className="text-[#F1C40F] animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Real-Time Weather Updates</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-white">Your</span>
              <span className="text-[#FF6B35]"> Weather</span>
              <br />
              <span className="text-white">Companion</span>
            </h1>
            
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Get accurate weather forecasts, real-time updates, and personalized weather alerts — all in one beautiful platform.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                // ✅ LOGGED IN USER
                <Link to="/dashboard" className="bg-[#FF6B35] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#FFB07C] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6B35]/30 text-lg flex items-center justify-center gap-2 group">
                  Go to Dashboard
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                // ❌ NOT LOGGED IN - TWO OPTIONS
                <>
                  <Link to="/dashboard" className="bg-[#FF6B35] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#FFB07C] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6B35]/30 text-lg flex items-center justify-center gap-2 group">
                    🌤️ Try Demo
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/signup" className="border-2 border-[#FF6B35] text-[#FF6B35] px-8 py-3 rounded-full font-semibold hover:bg-[#FF6B35] hover:text-white transition-all duration-300 text-lg flex items-center justify-center gap-2">
                    <FaUserPlus />
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>

            {/* Show Demo Notice */}
            {!isAuthenticated && (
              <div className="mt-6 flex items-center justify-center gap-2 text-white/40 text-sm">
                <FaLock className="text-xs" />
                <span>Demo includes basic weather search</span>
                <span className="text-white/20">•</span>
                <Link to="/signup" className="text-[#FF6B35] hover:underline font-medium">
                  Sign up for premium features →
                </Link>
              </div>
            )}

            {/* Login link for guests */}
            {!isAuthenticated && (
              <div className="mt-4 text-white/40 text-sm">
                Already have an account? <Link to="/login" className="text-[#FF6B35] hover:underline">Login</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-[#2D2D3F]">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why <span className="text-[#FF6B35]">AERO Weather</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="text-5xl mb-4 text-[#FF6B35] group-hover:scale-110 transition-transform inline-block">
                <FaCloudSun />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Data</h3>
              <p className="text-white/60 text-sm">
                Live weather updates from reliable sources, updated every minute.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="text-5xl mb-4 text-[#FF6B35] group-hover:scale-110 transition-transform inline-block">
                <FaGlobe />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
              <p className="text-white/60 text-sm">
                Search any city worldwide and get accurate weather information.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2">
              <div className="text-5xl mb-4 text-[#FF6B35] group-hover:scale-110 transition-transform inline-block">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-white/60 text-sm">
                Your data is encrypted and protected with industry-standard security.
              </p>
            </div>
          </div>

          {/* Premium Features Banner */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="glass-card rounded-2xl p-6 border border-[#FF6B35]/20">
              <h3 className="text-xl font-bold text-white text-center mb-4">
                ⭐ Premium Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3">
                  <p className="text-white/80 text-sm">❤️ Favorites</p>
                  <p className="text-white/40 text-xs">Cloud Sync</p>
                </div>
                <div className="text-center p-3">
                  <p className="text-white/80 text-sm">💧 Skin Tips</p>
                  <p className="text-white/40 text-xs">Weather-based</p>
                </div>
                <div className="text-center p-3">
                  <p className="text-white/80 text-sm">🎯 Weather Score</p>
                  <p className="text-white/40 text-xs">AI Powered</p>
                </div>
                <div className="text-center p-3">
                  <p className="text-white/80 text-sm">📊 History</p>
                  <p className="text-white/40 text-xs">Recent Searches</p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <Link to="/signup" className="text-[#FF6B35] hover:underline font-medium text-sm">
                  🔓 Sign up to unlock all features →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;