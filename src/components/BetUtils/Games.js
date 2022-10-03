import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import BetContext from "../Context/betContext";

export default function Games({
  home,
  away,
  homeLogo,
  awayLogo,
  homeOdd,
  awayOdd,
  fixtureId,
}) {
  const { betsArray, setBetsArray } = useContext(BetContext);
  const [amount, setAmount] = useState();
  const link = `/bets/${fixtureId}`;
  // <input
  //   type="number"
  //   placeholder="0.00"
  //   value={amount}
  //   onChange={() => setAmount([...amount, e.target.value])}
  // />;
  // handleBet() {
  //   setBetsArray([...betsArray, { id: fixtureId, amount }]);
  // }
  return (
    <Box>
      <Flex>
        <span>{homeOdd}</span>
        {home} <img src={homeLogo} />
      </Flex>

      <Flex>
        <Link to={link}>Outros mercados</Link>
      </Flex>

      <Flex>
        <span>{awayOdd}</span> {away} <img src={awayLogo} />
      </Flex>
    </Box>
  );
}

const Box = styled.button`
  background-color: lightblue;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  img {
    margin-left: 5px;
    width: 10px;
    height: 10px;
  }
  span {
    color: yellow;
    margin-right: 10px;
    cursor: pointer;
  }
  a {
    color: red;
  }
  cursor: default;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  width: 30vw;
`;
