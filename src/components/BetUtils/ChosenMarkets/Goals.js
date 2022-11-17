import { useState, useContext } from "react";
import styled from "styled-components";
import { BetFlex } from "../Games";
import UserContext from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

export default function Goals({ odd, value, fixtureId }) {
  const { postBet, token } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

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

    if (!token) {
      alert("Por favor efetue seu login");
      navigate("/login");
    } else {
      postBet(userBet, "goals");
    }
    setSelected();
  }

  return (
    <>
      <Container>
        <Button onClick={() => setSelected(!selected)}>
          <h1>{value}</h1>
          <p>{odd}</p>
        </Button>
        {selected ? (
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
      </Container>
    </>
  );
}

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(228, 228, 228, 0.5);
  border-radius: 5px;
  width: 12vw;
  height: 18vh;
  padding: 15px 10px;
  margin-bottom: 10px;
  font-size: 18px;
  @media (max-width:673px){
    font-size: 15px;
    padding:15px 5px
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e4e4e4;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 50vw;
  input {
    background-color: rgba(0, 0, 0, 0);
    border: solid 1px #367a65;
    padding: 3px;
    border-radius: 5px;
    width: 15vw;
    text-align: center;
    margin-left: 10px;
    color: #5a8700;
    font-weight: 700;
    font-size: 18px;
  }
  button {
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px;
    background-color: gray;
    color: white;
    width: 175px;
  }
  span {
    color: darkgreen;
    font-weight: 700;
  }
`;
