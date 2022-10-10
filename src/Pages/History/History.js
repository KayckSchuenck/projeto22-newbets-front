import axios from "axios";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../components/Context/userContext";
import Registers from "../../components/Registers/Registers";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import { Loading } from "../Main/Main";
import { Link } from "react-router-dom";

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
      .get(`${process.env.REACT_APP_API_BASE_URL}/bets/history`, config)
      .then((res) => {
        setHistoryData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  return !historyData ? (
    <Loading>
      <TailSpin
        height="150"
        width="150"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Loading>
  ) : !historyData.lenght ? (
    <>
      <NoRegisters>
        <p> Não há registros ainda.</p>
        <Link to="/"> Comece a apostar já!! </Link>
      </NoRegisters>
    </>
  ) : (
    <Flex>
      {historyData.map((register, index) => {
        return (
          <Registers
            won={register.won}
            amount={register.amount}
            odd={register.odd}
            finished={register.finished}
            type={register.type}
            homeScore={register.scoreHome}
            awayScore={register.scoreAway}
            value={register.value}
            key={index}
          />
        );
      })}
    </Flex>
  );
}

const Flex = styled.div`
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  margin-left: 10vw;
`;

const NoRegisters = styled.div`
  padding: 15px;
  font-size: 20px;
  a {
    color: lightgreen;
    font-style: italic;
  }
`;
