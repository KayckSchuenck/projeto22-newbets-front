import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { BetFlex, Form } from "../Games";
import UserContext from "../../Context/userContext";
import CheckToken from "../../Utils/checkToken";

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
    const config = CheckToken();
    const userBet = {
      amount,
      fixtureId,
      odd,
      value: numberValue,
      type,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/bets/corners`,
        userBet,
        config
      )
      .then(() => {
        alert("Aposta efetuada com sucesso");
        setCorners();
      })
      .catch((erro) => alert(erro.message));
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
