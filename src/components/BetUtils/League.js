import styled from "styled-components";
import { Link } from "react-router-dom";

export default function League({ name, id }) {
  const link = `/leagues/${id}`;
  return (
    <Box>
      <Link to={link}>
        <span>{name}</span>
      </Link>
    </Box>
  );
}

const Box = styled.button`
  border-radius: 5px;
  margin-left: 15px;
  margin-bottom: 5px;
  width: 20vw;
  text-align: center;
  a {
    color: black;
    padding-left: 15px;
  }
  @media (max-width: 550px) {
    width: 25vw;
  }
`;
