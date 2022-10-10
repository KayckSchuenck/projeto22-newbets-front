import { useState } from "react";
import League from "./League";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import styled from "styled-components";

export default function Country({ name, leagues, countryFlag }) {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <LeagueContainer>
        <Flex1>
          <Box onClick={() => setSelected(!selected)}>
            <span>{name}</span>
            <img src={countryFlag} />
          </Box>
          {selected ? (
            <IoArrowUpCircleOutline
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => setSelected(!selected)}
            />
          ) : (
            <IoArrowDownCircleOutline
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => setSelected(!selected)}
            />
          )}
        </Flex1>
        {selected ? (
          leagues.map((league, index) => (
            <League name={league.name} key={index} id={league.id} />
          ))
        ) : (
          <></>
        )}
      </LeagueContainer>
    </>
  );
}

const Flex1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 5px 15px;
  font-size: 20px;
  width: 30vw;
  margin-bottom: 5px;

  span {
    color: black;
    font-weight: bold;
  }
  @media (max-width: 708px) {
    font-size: 15px;
  }
  @media (max-width: 550px) {
    width: auto;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20vw;
  height: 10vh;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  img {
    margin-left: 5px;
    width: 4vw;
    height: 4vh;
  }
  background-color: #e4e4e4d6;
  @media (max-width: 708px) {
    height: 10vh;
  }
  @media (max-width: 550px) {
    width: 25vw;
  }
`;

const LeagueContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  margin-bottom: 10px;
`;
