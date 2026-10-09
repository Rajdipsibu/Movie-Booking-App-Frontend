import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { LucideEye, LucideEyeOff } from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        return toast.error("Passwords do not match");
    }

    try {
      // Endpoint updated to match your backend logic
      const res = await api.post('/users/resetPassword', { token, newPassword });
      if (res.data.success) {
        toast.success("Password updated! Logging you in...");
        navigate('/login');
      }
    } catch (err) {
      toast.error("Token invalid or expired.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 font-sans">
      <div className="max-w-md w-full mx-auto bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-8 uppercase tracking-tighter">
            Reset Password
        </h2>
        
        <form onSubmit={handleReset} className="space-y-5">
          {/* New Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              placeholder="New Password"
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-[#F84464] transition-all text-sm pr-12"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F84464] transition-colors"
            >
              {showPassword ? <LucideEyeOff size={20} /> : <LucideEye size={20} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm New Password"
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none focus:border-[#F84464] transition-all text-sm pr-12"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {/* The second eye button must stay inside this relative div */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#F84464] transition-colors"
            >
              {showPassword ? <LucideEyeOff size={20} /> : <LucideEye size={20} />}
            </button>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#F84464] text-white py-4 rounded-2xl font-bold mt-4 shadow-lg shadow-red-100 hover:brightness-110 active:scale-95 transition-all uppercase text-sm tracking-widest"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;