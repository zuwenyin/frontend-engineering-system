import { Navigate, Outlet, useLocation } from "react-router"

const isAuthenticated = true

export function RequireAuth() {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}
