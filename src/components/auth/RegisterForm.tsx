import React, { useState } from 'react';
import { registerUser } from '../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { LucideEye, LucideEyeOff } from 'lucide-react';

const RegisterForm: React.FC = () => {

  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser({
        name: formData.username,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert(res.message || "User registered successfully!");
      navigate('/login');
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "Registration failed!";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Register here
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-200"
              placeholder="enter your name"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
           {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-200"
              placeholder="name@company.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password Field */}
          <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              {/* FIXED: Wrapper must be 'relative' and contain both Input and Button */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-red-500 outline-none transition-all pr-12"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  {showPassword ? (
                    <LucideEyeOff size={20} strokeWidth={2.5} />
                  ) : (
                    <LucideEye size={20} strokeWidth={2.5} />
                  )}
                </button>
              </div>
            </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-200"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          already exist then 
          <Link className="text-red-500 font-medium hover:underline"
          to="/login">
          Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;