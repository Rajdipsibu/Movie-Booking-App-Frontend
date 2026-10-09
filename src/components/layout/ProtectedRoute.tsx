import { Navigate, Outlet, useLocation } from 'react-router-dom';

const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Pass the current path as "from" so LoginForm can redirect back here
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;