import { useState } from "react";
import styled from "styled-components";
import { BetFlex, Form } from "../Games";
import PostBet from "../../Utils/postBet";

export default function HomeAwayDraw({
  odd,
  value,
  setWinner,
  winner,
  fixtureId,
}) {
  const [amount, setAmount] = useState();

  function handleBetWinner(e) {
    e.preventDefault();

    const userBet = {
      amount,
      fixtureId,
      odd,
      value,
    };

    PostBet(userBet, "options");
    setWinner();
  }
  return (
    <>
      <Block>
        <p>{value}</p>
        <p onClick={() => setWinner(!winner)}>{odd}</p>
      </Block>
      {winner ? (
        <Form onSubmit={handleBetWinner}>
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

const Block = styled.div``;
