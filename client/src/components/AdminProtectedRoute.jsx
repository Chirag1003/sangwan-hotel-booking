import { Navigate, Outlet } from 'react-router-dom';

export default function AdminProtectedRoute() {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
}
