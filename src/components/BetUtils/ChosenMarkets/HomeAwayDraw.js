import { useContext, useState } from "react";
import styled from "styled-components";
import UserContext from "../../Context/userContext";
import { BetFlex, Form } from "../Games";

export default function HomeAwayDraw({ odd, value, fixtureId }) {
  const { postBet } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(false);

  function handleBetWinner(e) {
    e.preventDefault();

    const userBet = {
      amount,
      fixtureId,
      odd,
      value,
    };

    postBet(userBet, "options");
    setSelected();
  }
  return (
    <>
      <Container>
        <Block onClick={() => setSelected(!selected)}>
          <h1>{value}</h1>
          <p>{odd}</p>
        </Block>
        {selected ? (
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
      </Container>
    </>
  );
}

const Block = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(228, 228, 228, 0.5);
  border-radius: 5px;
  width: 10vw;
  height: 18vh;
  font-size: 18px;
  padding: 20px 10px;
  h1 {
    color: black;
    font-weight: 700;
    font-size: 17px;
    margin-top: 0;
  }
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
