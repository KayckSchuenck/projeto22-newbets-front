import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { BetFlex, Form } from "../Games";
import UserContext from "../../Context/userContext";
import CheckToken from "../../Utils/checkToken";

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

    const config = CheckToken();

    const userBet = {
      amount,
      fixtureId,
      odd,
      value,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/bets/options`,
        userBet,
        config
      )
      .then(() => {
        alert("Aposta efetuada com sucesso");
        setWinner();
      })
      .catch((erro) => alert(erro.message));
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
