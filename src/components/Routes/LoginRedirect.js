import { Navigate, Outlet } from "react-router-dom";


export default function LoginRedirect({ auth }) {
  return (
    (auth ? <Navigate to='/' /> : <Outlet />)
  )
}
