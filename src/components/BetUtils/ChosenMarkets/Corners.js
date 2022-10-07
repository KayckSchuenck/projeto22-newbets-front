import { useState } from "react";
import styled from "styled-components";
import { BetFlex, Form } from "../Games";
import postBet from "../../Utils/postBet";

export default function Corners({
  odd,
  value,
  setCorners,
  corners,
  fixtureId,
}) {
  const [amount, setAmount] = useState();
  const type = value.includes("Under") ? "under" : "over";
  const numberValue = Number(value.replace(/'Over '|'Under '/g, ""));

  function handleBetCorners(e) {
    e.preventDefault();
    const userBet = {
      amount,
      fixtureId,
      odd,
      value: numberValue,
      type,
    };

    postBet(userBet, "corner");
    setCorners();
  }

  return (
    <>
      <Block>
        <p>{value}</p>
        <p onClick={() => setCorners(!corners)}>{odd}</p>
      </Block>
      {corners ? (
        <Form onSubmit={handleBetCorners}>
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
