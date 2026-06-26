import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  FaUserPlus, 
  FaSignInAlt, 
  FaEnvelope, 
  FaLock, 
  FaUser,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const isLogin = location.pathname === '/login';

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return { score, label: 'Weak', color: 'text-red-400' };
    if (score <= 3) return { score, label: 'Medium', color: 'text-yellow-400' };
    return { score, label: 'Strong', color: 'text-green-400' };
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate email
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (!isLogin) {
      // Signup validations
      if (!formData.name.trim()) {
        toast.error('Please enter your full name');
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        setLoading(false);
        return;
      }
    }

   // Call auth function
let result;
if (isLogin) {
  result = await login(formData.email, formData.password);
} else {
  result = await register(formData.email, formData.password);
}

console.log('Auth result:', result); // ✅ Debug log

setLoading(false);

if (result.success) {
  navigate('/dashboard');
}
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl max-w-md w-full animate-fade-in-up">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 text-[#FF6B35]">
            {isLogin ? <FaSignInAlt className="mx-auto" /> : <FaUserPlus className="mx-auto" />}
          </div>
          <h2 className="text-3xl font-bold">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-white/60 mt-2">
            {isLogin 
              ? 'Login to access your personalized weather' 
              : 'Sign up to unlock premium features'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name - Only for Signup */}
          {!isLogin && (
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <FaUser className="inline mr-2 text-[#FF6B35]" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-white/5 border ${
                  touched.name && !formData.name.trim() 
                    ? 'border-red-500' 
                    : 'border-white/10'
                } rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors`}
                placeholder="John Doe"
                required={!isLogin}
              />
              {touched.name && !formData.name.trim() && (
                <p className="text-red-400 text-xs mt-1">Full name is required</p>
              )}
            </div>
          )}
          
          {/* Email */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <FaEnvelope className="inline mr-2 text-[#FF6B35]" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-white/5 border ${
                touched.email && !validateEmail(formData.email) 
                  ? 'border-red-500' 
                  : 'border-white/10'
              } rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors`}
              placeholder="you@example.com"
              required
            />
            {touched.email && !validateEmail(formData.email) && (
              <p className="text-red-400 text-xs mt-1">Please enter a valid email</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              <FaLock className="inline mr-2 text-[#FF6B35]" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-white/5 border ${
                  touched.password && !validatePassword(formData.password) 
                    ? 'border-red-500' 
                    : 'border-white/10'
                } rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors pr-12`}
                placeholder="Min 6 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched.password && (
              <>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${passwordStrength.color.replace('text', 'bg')}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${passwordStrength.color}`}>
                    {passwordStrength.label}
                  </span>
                </div>
                {!validatePassword(formData.password) && (
                  <p className="text-red-400 text-xs mt-1">Minimum 6 characters required</p>
                )}
              </>
            )}
          </div>
          {/* Remember Me - Only for Login */}
{isLogin && (
  <div className="flex items-center justify-between">
    <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
      <input 
        type="checkbox" 
        className="accent-[#FF6B35] w-4 h-4"
        defaultChecked
      />
      Remember me
    </label>
    <button 
      type="button"
      className="text-[#FF6B35] text-sm hover:underline"
      onClick={() => toast.info('Password reset coming soon!')}
    >
      Forgot password?
    </button>
  </div>
)}

          {/* Confirm Password - Only for Signup */}
          {!isLogin && (
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                <FaLock className="inline mr-2 text-[#FF6B35]" />
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-white/5 border ${
                  touched.confirmPassword && formData.password !== formData.confirmPassword 
                    ? 'border-red-500' 
                    : 'border-white/10'
                } rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FF6B35] transition-colors`}
                placeholder="Confirm your password"
                required={!isLogin}
              />
              {touched.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B35] text-white rounded-full font-semibold py-3 text-lg hover:bg-[#FFB07C] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#FF6B35]/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              isLogin ? (
                <>
                  <FaSignInAlt className="inline mr-2" />
                  Login
                </>
              ) : (
                <>
                  <FaUserPlus className="inline mr-2" />
                  Create Account
                </>
              )
            )}
          </button>

          {/* Toggle Link */}
          <p className="text-center text-white/60 text-sm mt-4">
            {isLogin ? (
              <>Don't have an account? <Link to="/signup" className="text-[#FF6B35] hover:underline font-semibold">Sign up</Link></>
            ) : (
              <>Already have an account? <Link to="/login" className="text-[#FF6B35] hover:underline font-semibold">Login</Link></>
            )}
          </p>

          {/* Premium Features Preview */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs text-center">
              🔒 By signing up, you get:
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <span className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded-full">⭐ Favorites Cloud Sync</span>
              <span className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded-full">💧 Skin Care Tips</span>
              <span className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded-full">🎯 Weather Score</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;