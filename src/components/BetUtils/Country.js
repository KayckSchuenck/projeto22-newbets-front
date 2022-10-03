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
      <Flex1>
        <Flex2 onClick={() => setSelected(!selected)}>
          <span>{name}</span>
          <img src={countryFlag} />
        </Flex2>
        {selected ? (
          <IoArrowUpCircleOutline
            style={{ cursor: "pointer" }}
            onClick={() => setSelected(!selected)}
          />
        ) : (
          <IoArrowDownCircleOutline
            style={{ cursor: "pointer" }}
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
    </>
  );
}

const Flex1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
  padding: 0 20px;
  background-color: lightgreen;
  span {
    color: blue;
  }
`;

const Flex2 = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    margin-left: 5px;
    width: 15px;
    height: 100%;
  }
`;
