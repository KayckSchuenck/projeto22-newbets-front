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
  background-color: lightblue;
  border-radius: 5px;

  span {
    background-color: red;
  }
`;
