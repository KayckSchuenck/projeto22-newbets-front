import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../Context/userContext";
import {
  IoPersonCircleSharp,
  IoArrowUpCircleSharp,
  IoArrowDownCircleSharp,
} from "react-icons/io5";

export default function Header() {
  const { setAvailableAmount, setName, setToken } = useContext(UserContext);
  const [selected, setSelected] = useState(false);

  function logout() {
    localStorage.clear();
    setName();
    setToken();
    setAvailableAmount();
  }

  const { name, availableAmount } = useContext(UserContext);
  return name && availableAmount ? (
    <>
      <Flex>
        <Link to="/">NEW BETS</Link>
        <div>
          <p>Olá {name}</p>
          <p>Saldo Disponível: R$ {availableAmount.toFixed(2)}</p>
        </div>
        <Logout onClick={() => setSelected(!selected)}>
          <IoPersonCircleSharp style={{ height: 50, width: 50 }} />
          {selected ? (
            <IoArrowUpCircleSharp style={{ height: 30, width: 30 }} />
          ) : (
            <IoArrowDownCircleSharp style={{ height: 30, width: 30 }} />
          )}
        </Logout>
      </Flex>
      {selected ? (
        <UserOptions>
          <button>
            <Link to="/history">Histórico de apostas</Link>
          </button>
          <NotDone>Adicionar fundos</NotDone>
          <NotDone>Realizar um saque</NotDone>
          <button onClick={logout}>Logout</button>
        </UserOptions>
      ) : (
        <></>
      )}
    </>
  ) : (
    <Flex>
      <Link to="/">NEW BETS</Link>
      <Link to="/login">Faça seu login</Link>
      <Link to="/sign-up">Registre-se já</Link>
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  background-color: #126e51;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px 0 15px;
  height: 15vh;
  font-size: 20px;
  color: #e4e4e4;
  a {
    margin: 0 10px;
    color: #e4e4e4;
  }
  a:hover {
    color: #26ffbe;
  }

  @media (max-width: 611px) {
    font-size: 16px;
  }
`;

const Logout = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 66px;
  width: 70px;
  border-radius: 3px;
  padding: 5px;
  margin-left: 10px;
`;

const UserOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00ad76;
  width: 25vw;
  padding: 10px 10px 0;
  position: fixed;
  right: 0;
  border-radius: 10px;
  a {
    color: black;
  }
  button {
    border-radius: 4px;
    font-size: 16px;
    width: 20vw;
    font-weight: 700;
    height: 40px;
    margin-bottom: 10px;
    padding: 5px;
    background-color: #e4e4e4;
  }
  @media (max-width: 470px) {
    button {
      font-size: 14px;
      height: 60px;
      padding: 4px;
    }
  }
`;

const NotDone = styled.button`
  text-decoration: line-through;
  font-style: italic;
`;
