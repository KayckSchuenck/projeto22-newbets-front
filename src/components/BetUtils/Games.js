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
    e.preventDefault();

    if (!token) {
      alert("Por favor efetue seu login");
      navigate("/login");
    } else {
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
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/bets/options`,
          userBet,
          config
        )
        .then(() => alert("Aposta efetuada com sucesso"))
        .catch((erro) => console.log(erro));
      setSelectedHome();
    }
  }

  function handleBetAway(e) {
    e.preventDefault();

    if (!token) {
      alert("Por favor efetue seu login");
      navigate("/login");
    } else {
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

      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/bets/options`,
          userBet,
          config
        )
        .then(() => alert("Aposta efetuada com sucesso"))
        .catch((erro) => console.log(erro));
      setSelectedAway();
    }
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
          {home} <img src={homeLogo} alt={"logo"} />
        </Flex>

        <Flex>
          <Link to={link} state={{ home, away }}>
            Outros mercados
          </Link>
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
          {away} <img src={awayLogo} alt={"logo"} />
        </Flex>
      </Box>
      {selectedHome ? (
        <Form onSubmit={handleBetHome}>
          {home} - {homeOdd}
          Resultado final
          <BetFlex>
            <input
              type="number"
              placeholder="R$ 0.00"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <span>Retorno esperado={(amount * homeOdd).toFixed(2)}</span>
          </BetFlex>
          <button type="submit">Faça já sua aposta</button>
        </Form>
      ) : (
        <></>
      )}
      {selectedAway ? (
        <Form onSubmit={handleBetAway}>
          {away} - {awayOdd}
          <BetFlex>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <span>Retorno esperado={(amount * awayOdd).toFixed(2)}</span>
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
    color: black;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  input {
    background-color: rgba(0, 0, 0, 0);
    border: solid 1px #367a65;
    padding: 3px;
    border-radius: 5px;
    width: 10vw;
    margin: 0 5px 5px 0;
  }
  button {
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px;
    background-color: gray;
    color: white;
  }
`;
