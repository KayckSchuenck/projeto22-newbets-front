import axios from "axios";
import { useContext } from "react";
import UserContext from "../Context/userContext";
import CheckToken from "./checkToken";

export default function postBet(userBet, rota) {
  const { setAvailableAmount } = useContext(UserContext);
  const config = CheckToken();
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/bets/${rota}`, userBet, config)
    .then((res) => {
      alert("Aposta efetuada com sucesso");
      setAvailableAmount(res.data);
    })
    .catch((erro) => console.log(erro));
}
