import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/userContext.js";

export default function PublicRoute({ auth }) {
  const { setToken, setName, setId } = useContext(UserContext);
  const parseAuth = JSON.parse(auth);

  if (auth) {
    setName(parseAuth.name);
    setToken(parseAuth.token);
    setId(parseAuth.id);
  }

  return auth ? <Navigate to="/main" /> : <Outlet />;
}
