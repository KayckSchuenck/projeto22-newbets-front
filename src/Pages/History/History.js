import axios from "axios";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../components/Context/userContext";
import Registers from "../../components/Registers/Registers";

export default function History() {
  const { token } = useContext(UserContext);
  const [historyData, setHistoryData] = useState();

  function fetchData() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`/bets/history`, config)
      .then((res) => {
        setHistoryData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => fetchData, []);

  return historyData ? (
    historyData.map((register) => {
      <Registers
        won={register.won}
        amount={register.amount}
        odd={register.odd}
        id={register.id}
        finished={register.finished}
      />;
    })
  ) : (
    <>loading</>
  );
}
