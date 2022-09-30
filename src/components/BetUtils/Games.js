import styled from "styled-components";

export default function ({ home, away, homeLogo, awayLogo }) {
  return (
    <Box>
      {home} <img src={homeLogo} /> x {away} <img src={awayLogo} />
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
