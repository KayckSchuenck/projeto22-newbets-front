import { useState, useContext } from "react";
import styled from "styled-components";
import { BetFlex, Form } from "../Games";
import UserContext from "../../Context/userContext";

export default function ExactScore({ odd, value, setScore, score, fixtureId }) {
  const { postBet } = useContext(UserContext);
  const [amount, setAmount] = useState();
  const [selected, setSelected] = useState(false);

  const values = value.split(":");
  const scoreHome = values[0];
  const scoreAway = values[1];

  function handleBetScores(e) {
    e.preventDefault();

    const userBet = {
      amount,
      fixtureId,
      odd,
      scoreHome,
      scoreAway,
    };

    postBet(userBet, "scores");
    setSelected();
  }
  return (
    <>
      <Button>
        <p>{value}</p>
        <p onClick={() => setSelected(!selected)}>{odd}</p>
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
    </>
  );
}

const Button = styled.button`
  width: 20vw;
  background-color: #e4e4e4;
`;
