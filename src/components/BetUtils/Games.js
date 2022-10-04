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
  const [amount, setAmount] = useState();
  const [selectedHome, setSelectedHome] = useState();
  const [selectedAway, setSelectedAway] = useState();
  const link = `/markets/${fixtureId}`;

  function handleBet(homeAway) {
    if (!token) {
      alert("Por favor efetue seu login");
      navigate("/login");
    }

    const config = {
      Authorization: `Bearer ${token}`,
    };

    let odd;
    if ((homeAway = "home")) odd = homeOdd;
    if ((homeAway = "away")) odd = awayOdd;

    const userBet = {
      amount,
      fixtureId,
      odd,
      value: homeAway,
      userId: id,
    };

    axios.post(`${REACT_APP_API_BASE_URL}/bets/options`, userBet, config);
    setSelectedAway();
    setSelectedHome();
  }

  return (
    <Box>
      <Flex>
        <span>{homeOdd}</span>
        {home} <img src={homeLogo} />
      </Flex>
      {selectedHome ? (
        <Form onSubmit={() => handleBet("home")}>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            required
            onChange={() => setAmount([...amount, e.target.value])}
          />
          <span>Retorno esperado={amount * homeOdd}</span>

          <button type="submit">Faça já sua aposta</button>
        </Form>
      ) : (
        <></>
      )}

      <Flex>
        <Link to={link}>Outros mercados</Link>
      </Flex>

      <Flex>
        <span>{awayOdd}</span> {away} <img src={awayLogo} />
      </Flex>
      {selectedAway ? (
        <Form onSubmit={() => handleBet("away")}>
          <BetFlex>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              required
              onChange={() => setAmount([...amount, e.target.value])}
            />
            <span>Retorno esperado={amount * awayOdd}</span>
          </BetFlex>
          <button type="submit">Faça já sua aposta</button>
        </Form>
      ) : (
        <></>
      )}
    </Box>
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
