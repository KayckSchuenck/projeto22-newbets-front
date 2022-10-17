import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
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
  const [amount, setAmount] = useState(0);
  const [selectedHome, setSelectedHome] = useState();
  const [selectedAway, setSelectedAway] = useState();
  const { postBet, token } = useContext(UserContext);
  const link = `/markets/${fixtureId}`;
  const navigate = useNavigate();

  function handleBetHome(e) {
    e.preventDefault();
    setSelectedHome();

    const userBet = {
      amount,
      fixtureId,
      odd: homeOdd,
      value: "home",
    };

    if (!token) {
      alert("Por favor efetue seu login");
      navigate("/login");
    } else {
      postBet(userBet, "options");
    }
  }

  function handleBetAway(e) {
    e.preventDefault();

    const userBet = {
      amount,
      fixtureId,
      odd: awayOdd,
      value: "away",
    };

    postBet(userBet, "options");
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
          <p>{home}</p> <img src={homeLogo} alt={"logo"} />
        </Flex>

        <FlexCenter>
          <Link to={link} state={{ home, away, homeLogo, awayLogo }}>
            Outros mercados
          </Link>
        </FlexCenter>

        <Flex>
          <span
            onClick={() => {
              setSelectedHome(false);
              setSelectedAway(!selectedAway);
            }}
          >
            {awayOdd}
          </span>
          <p>{away} </p>
          <img src={awayLogo} alt={"logo"} />
        </Flex>
      </Box>
      {selectedHome ? (
        <Form onSubmit={handleBetHome}>
          {home} - {homeOdd}
          <BetFlex>
            R$
            <input
              type="number"
              placeholder="R$ 0.00"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <span>Retorno esperado: {(amount * homeOdd).toFixed(2)}</span>
          </BetFlex>
          <button type="submit">Faça já sua aposta</button>
        </Form>
      ) : (
        <></>
      )}
      {selectedAway ? (
        <Form onSubmit={handleBetAway}>
          <BetFlex>
            {away} - {awayOdd}
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
          </BetFlex>
          <span>Retorno esperado: R${(amount * awayOdd).toFixed(2)}</span>
          <button type="submit">Faça já sua aposta</button>
        </Form>
      ) : (
        <></>
      )}
    </>
  );
}

const Box = styled.div`
  background-color: #126e51;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
  height: 40px;
  font-size: 20px;
  img {
    margin-left: 5px;
    width: 4vw;
    height: 5vh;
  }
  span {
    color: yellow;
    margin-right: 5px;
    cursor: pointer;
  }
  a {
    color: black;
  }
  @media (max-width: 708px) {
    padding: 0 10px;
    font-size: 15px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 32vw;
  p {
    color: white;
  }
  span {
    line-break: loose;
  }
`;

export const BetFlex = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  span {
    color: black;
  }
  input {
    margin-right: 5px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e4e4e4;
  margin-bottom: 10px;
  border-radius: 5px;
  input {
    background-color: rgba(0, 0, 0, 0);
    border: solid 1px #367a65;
    padding: 3px;
    border-radius: 5px;
    width: 15vw;
    text-align: center;
    margin-left: 10px;
    color: #5a8700;
    font-weight: 700;
    font-size: 18px;
  }
  button {
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px;
    background-color: gray;
    color: white;
    width: 175px;
  }
  span {
    color: #64a964;
    font-weight: 700;
  }
`;

const FlexCenter = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  width: 20vw;
  border-radius: 2px;
  background-color: #e3dbdb;
  a {
    font-style: italic;
  }
`;
