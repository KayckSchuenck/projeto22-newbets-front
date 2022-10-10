import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../Context/userContext";
import { IoPersonCircleSharp } from "react-icons/io5";

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
    <Flex>
      <div>
        <p>Olá {name}</p>
        <p>Saldo Disponível:R$ {availableAmount.toFixed(2)}</p>
      </div>
      <Link to="/history">Histórico</Link>
      <Logout>
        <IoPersonCircleSharp />
        <span onClick={logout}>Logout</span>
      </Logout>
    </Flex>
  ) : (
    <Flex>
      <Link to="/login">Faça seu login</Link>
    </Flex>
  );
}

const Flex = styled.div`
  display: flex;
  background-color: green;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 15vh;
  a {
    color: white;
  }
`;

const Logout = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
