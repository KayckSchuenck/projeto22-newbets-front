import styled from "styled-components";
import { Link } from "react-router-dom";

export default function League({ name, countryFlag, id }) {
  const link = `/leagues/${id}`;
  return (
    <Box>
      <Link to={link}>
        <span>{name}</span>
      </Link>
      <img src={countryFlag} />
    </Box>
  );
}

const Box = styled.button`
  background-color: lightblue;
  border-radius: 5px;
  img {
    margin-left: 5px;
    width: 10px;
    height: 10px;
  }
`;
