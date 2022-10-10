import { useState, useContext } from "react";
import styled from "styled-components";
import { BetFlex, Form } from "../Games";
import UserContext from "../../Context/userContext";
export default function Goals({ odd, value, setGoals, goals, fixtureId }) {
  const { postBet } = useContext(UserContext);
  const [amount, setAmount] = useState();

  const type = value.includes("Under") ? "under" : "over";
  const numberValue = Number(value.replace(/'Over '|'Under '/g, ""));

  function handleBetGoals(e) {
    e.preventDefault();

    const userBet = {
      amount,
      fixtureId,
      odd,
      value: numberValue,
      type,
    };

    postBet(userBet, "goal");
    setGoals();
  }

  return (
    <>
      <Block>
        <p>{value}</p>
        <p onClick={() => setGoals(!goals)}>{odd}</p>
      </Block>
      {goals ? (
        <Form onSubmit={handleBetGoals}>
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
