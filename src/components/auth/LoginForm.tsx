import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../services/auth.service";
import toast from "react-hot-toast";
import { LucideEye, LucideEyeOff } from "lucide-react";

const LoginForm: React.FC = () => {
  const [step, setStep] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Where to go after login — defaults to home
  const from = (location.state as { from?: string })?.from || "/";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      localStorage.setItem("token", res);
      toast.success("Login successful 🎉");
      navigate(from, { replace: true }); // ← go back to the original page
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-700">
        <h2 className="text-3xl font-black text-white text-center mb-8 uppercase tracking-tighter">
          Cinema<span className="text-red-500">Nexus</span>{" "}
          <span className="block text-sm font-medium text-gray-400 mt-2">
            {step === "login" ? "Login to your account" : "Verify OTP & login"}
          </span>
        </h2>

        {/* LOGIN FORM */}
        {step === "login" && (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-red-500 outline-none transition-all"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

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

            <button className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold shadow-lg shadow-red-900/20 transition-all active:scale-95 uppercase text-sm tracking-widest">
              Login
            </button>
          </form>
        )}

        {/* Register & forgot Password */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-sm text-gray-500">
            Not a member?{" "}
            <Link to="/register" className="text-red-500 font-bold hover:underline">
              Register now
            </Link>
          </p>
          
          <div className="block">
            <Link to="/forgot_password">
              <button className="text-xs font-bold text-gray-500 hover:text-red-500 uppercase tracking-widest transition-colors">
                Forgot Password?
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;