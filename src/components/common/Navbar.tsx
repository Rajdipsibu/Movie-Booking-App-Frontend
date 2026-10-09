import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../auth/LogoutButton";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Listen for route changes
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // This function checks the token and updates state
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  };

  useEffect(() => {
    checkAuth();
  }, [location]); // Re-run check whenever the URL/route changes

  const handleLogout = () => {
    logout();
    setIsLogin(false);
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 transition ${
      isActive
        ? "text-red-500 border-b-2 border-red-500 font-semibold"
        : "text-white hover:text-red-400"
    }`;

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-red-500">
            CinemaNexus 🎬
          </Link>

          <div className="hidden md:flex space-x-6">
            <NavLink to="/" className={linkClass}>Movies</NavLink>
            <NavLink to="/theaters" className={linkClass}>Theaters</NavLink>
            {isLogin && (
              <NavLink to="/my_bookings" className={linkClass}>My Bookings</NavLink>
            )}
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            {isLogin ? (
              <>
                <Link to="/profile" className="px-4 py-1 border border-red-500 rounded hover:bg-red-500 transition">
                  Profile
                </Link>
                <button onClick={handleLogout} className="px-4 py-1 border border-red-500 rounded hover:bg-red-500 transition">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-1 border border-red-500 rounded hover:bg-red-500 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;