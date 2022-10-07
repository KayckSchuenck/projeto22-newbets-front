import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { BetFlex, Form } from "../Games";
import UserContext from "../../Context/userContext";
import CheckToken from "../../Utils/checkToken";

export default function ExactScore({ odd, value, setScore, score, fixtureId }) {
  const [amount, setAmount] = useState();
  const values = value.split(" ");
  const scoreHome = values[0];
  const scoreAway = values[1];

  function handleBetScores(e) {
    e.preventDefault();

    const config = CheckToken();

    const userBet = {
      amount,
      fixtureId,
      odd,
      scoreHome,
      scoreAway,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/bets/scores`,
        userBet,
        config
      )
      .then(() => {
        alert("Aposta efetuada com sucesso");
        setScore();
      })
      .catch((erro) => alert(erro.message));
  }
  return (
    <>
      <Block>
        <p>{value}</p>
        <p onClick={() => setScore(!score)}>{odd}</p>
      </Block>
      {score ? (
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

const Block = styled.div``;
