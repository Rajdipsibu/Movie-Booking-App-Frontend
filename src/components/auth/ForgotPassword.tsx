import React, { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/users/fpassword', { email });
      if (res.data.success) {
        toast.success("Reset link sent! Check your inbox.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-2">FORGOT PASSWORD?</h2>
        <p className="text-gray-500 text-center text-sm mb-8">Enter your email and we'll send you a link to reset your password.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full bg-[#F84464] text-white py-3 rounded-xl font-bold hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {loading ? "Sending..." : "SEND RESET LINK"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;