import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../Context/userContext";

export default function Header() {
  const { name, availableAmount } = useContext(UserContext);
  return name && availableAmount ? (
    <Flex>
      Olá {name}
      Saldo Disponível:{availableAmount}
    </Flex>
  ) : (
    <Link to="/login">Faça seu login</Link>
  );
}

const Flex = styled.div`
  display: flex;
  background-color: green;
  height: 15vh;
`;
