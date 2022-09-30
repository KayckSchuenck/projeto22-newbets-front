import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Context/userContext";

export default function PrivateRoute({ auth }) {
  const { token, setToken, setName, setId } = useContext(UserContext);
  const parseAuth = JSON.parse(auth);
  if (auth && !token) {
    setName(parseAuth.name);
    setToken(parseAuth.token);
    setId(parseAuth.id);
  }
  if (!auth) return <Navigate to="/" />;
  if (auth && token) return <Outlet />;
  return <></>;
}
