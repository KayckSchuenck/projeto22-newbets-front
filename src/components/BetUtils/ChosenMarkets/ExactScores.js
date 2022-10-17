import { useState, useContext } from "react";
import { BetFlex } from "../Games";
import UserContext from "../../Context/userContext";
import { Container, Form, Button } from "./Goals";
import { useNavigate } from "react-router-dom";

export default function ExactScore({ odd, value, fixtureId }) {
  const { postBet, token } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const values = value.split(":");
  const scoreHome = values[0];
  const scoreAway = values[1];

  function handleBetScores(e) {
    e.preventDefault();
    setSelected();

    const userBet = {
      amount,
      fixtureId,
      odd,
      scoreHome,
      scoreAway,
    };

    if (!token) {
      alert("Por favor efetue seu login");
      navigate("/login");
    } else {
      postBet(userBet, "scores");
    }
  }
  return (
    <Container>
      <Button onClick={() => setSelected(!selected)}>
        <h1>{value}</h1>
        <p>{odd}</p>
      </Button>
      {selected ? (
        <Form onSubmit={handleBetScores}>
          {value} - {odd}
          <BetFlex>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
            />
            <span>Retorno esperado={(amount * odd).toFixed(2)}</span>
          </BetFlex>
          <button type="submit">Faça já sua aposta</button>
        </Form>
      ) : (
        <></>
      )}
    </Container>
  );
}
