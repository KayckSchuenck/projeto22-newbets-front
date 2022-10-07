import UserContext from "../Context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckToken() {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  if (!token) {
    alert("Por favor efetue seu login");
    navigate("/login");
  } else {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
