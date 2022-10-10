import { Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../Context/userContext";
import axios from "axios";

export default function PersistRoute({ auth }) {
  const { name, token, setToken, setName, setAvailableAmount } =
    useContext(UserContext);
  const parseAuth = JSON.parse(auth);

  if (auth && !name && !token) {
    const config = {
      headers: {
        Authorization: `Bearer ${parseAuth.token}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/bets`, config)
      .then((res) => setAvailableAmount(res.data.amount))
      .catch((error) => {
        alert(error.response.data);
        console.log(error);
      });
    setName(parseAuth.name);
    setToken(parseAuth.token);
  }

  return <Outlet />;
}
