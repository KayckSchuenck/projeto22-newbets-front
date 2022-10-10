import axios from "axios";
import { useContext } from "react";
import UserContext from "../Context/userContext";
import { useNavigate } from "react-router-dom";

const usePostBet = (userBet, route) => {
  const { token, setAvailableAmount } = useContext(UserContext);
  const navigate = useNavigate();

  if (!token) {
    alert("Por favor efetue seu login");
    navigate("/login");
  } else {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/bets/${route}`,
        userBet,
        config
      )
      .then((res) => {
        alert("Aposta efetuada com sucesso");
        setAvailableAmount(res.data);
      })
      .catch((erro) => console.log(erro));
  }
};

export default usePostBet;
