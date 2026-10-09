import { Navigate, Outlet, useLocation } from 'react-router-dom';

const isAuthenticated = () => {
  return Boolean(localStorage.getItem("token"));
};

function AuthGuard() {
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";

  if (isAuthenticated()) {
    // Already logged in — send to where they wanted to go (or home)
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}

export default AuthGuard;