import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../Context/userContext";

export default function Games({
  home,
  away,
  homeLogo,
  awayLogo,
  homeOdd,
  awayOdd,
  fixtureId,
}) {
  const navigate = useNavigate();
  const { token, id } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [selectedHome, setSelectedHome] = useState();
  const [selectedAway, setSelectedAway] = useState();
  const link = `/markets/${fixtureId}`;

  function handleBetHome(e) {
    e.prevent.default();

    if (!token) {
      alert("Por favor efetue seu login");
      navigate("/login");
    }

    const config = {
      Authorization: `Bearer ${token}`,
    };

    const userBet = {
      amount,
      fixtureId,
      odd: homeOdd,
      value: "home",
      userId: id,
    };

    axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/bets/options`,
      userBet,
      config
    );
    setSelectedHome();
  }

  function handleBetAway(e) {
    e.prevent.default();

    if (!token) {
      alert("Por favor efetue seu login");
      navigate("/login");
    }

    const config = {
      Authorization: `Bearer ${token}`,
    };

    const userBet = {
      amount,
      fixtureId,
      odd: awayOdd,
      value: "away",
      userId: id,
    };

    axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/bets/options`,
      userBet,
      config
    );
    setSelectedAway();
  }

  return (
    <>
      <Box>
        <Flex>
          <span
            onClick={() => {
              setSelectedHome(!selectedHome);
              setSelectedAway(false);
            }}
          >
            {homeOdd}
          </span>
          {home} <img src={homeLogo} />
        </Flex>

        <Flex>
          <Link to={link}>Outros mercados</Link>
        </Flex>

        <Flex>
          <span
            onClick={() => {
              setSelectedHome(false);
              setSelectedAway(!selectedAway);
            }}
          >
            {awayOdd}
          </span>
          {away} <img src={awayLogo} />
        </Flex>
      </Box>
      {selectedHome ? (
        <Form onSubmit={handleBetHome}>
          <BetFlex>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <span>Retorno esperado={amount * homeOdd}</span>
          </BetFlex>
          <button type="submit">Faça já sua aposta</button>
        </Form>
      ) : (
        <></>
      )}
      {selectedAway ? (
        <Form onSubmit={handleBetAway}>
          <BetFlex>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <span>Retorno esperado={amount * awayOdd}</span>
          </BetFlex>
          <button type="submit">Faça já sua aposta</button>
        </Form>
      ) : (
        <></>
      )}
    </>
  );
}

const Box = styled.button`
  background-color: lightblue;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  img {
    margin-left: 5px;
    width: 10px;
    height: 10px;
  }
  span {
    color: yellow;
    margin-right: 10px;
    cursor: pointer;
  }
  a {
    color: red;
  }
  cursor: default;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  width: 30vw;
`;

const BetFlex = styled.div`
  display: flex;
  align-items: center;

  span {
    color: white;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    background-color: #151515;
  }
`;
