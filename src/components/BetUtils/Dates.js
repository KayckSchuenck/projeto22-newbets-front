import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Games from "./Games";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

export default function Dates({ date, games, id }) {
  const [selected, setSelected] = useState();
  const [gameOdds, setGameOdds] = useState();

  function createHashtable(data) {
    const hashtable = {};

    games.forEach((game) => {
      hashtable[game.gameId] = game;
    });

    data.forEach((odd) => {
      if (hashtable[odd.fixture.id]) {
        hashtable[odd.fixture.id] = {
          ...hashtable[odd.fixture.id],
          odds: odd.bookmakers[0].bets[0].values,
          fixtureId: odd.fixture.id,
        };
      }
    });

    const gameDataWithOdds = Object.values(hashtable);
    setGameOdds(gameDataWithOdds);
  }

  async function fetchData() {
    const config = {
      headers: {
        ["x-rapidapi-key"]: process.env.REACT_APP_API_KEY,
      },
    };

    try {
      const { data: result } = await axios.get(
        `${process.env.REACT_APP_EXTERNAL_API_BASE_URL}/odds?season=2022&date=${date}&league=${id}&bet=2`,
        config
      );

      if (!result.response.length) {
        alert("Sem jogos disponíveis para essa data");
      }

      createHashtable(result.response);
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <>
      <Flex1>
        <span>{date}</span>
        {selected ? (
          <IoArrowUpCircleOutline
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelected(!selected);
            }}
          />
        ) : (
          <IoArrowDownCircleOutline
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelected(!selected);
              if (!gameOdds) fetchData();
            }}
          />
        )}
      </Flex1>
      {selected && gameOdds ? (
        gameOdds.map((game, index) => {
          if (!game.odds) return null;
          return (
            <Games
              home={game.home.name}
              homeLogo={game.home.logo}
              homeOdd={game.odds[0].odd}
              awayLogo={game.away.logo}
              away={game.away.name}
              awayOdd={game.odds[1].odd}
              fixtureId={game.fixtureId}
              key={index}
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}

const Flex1 = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 20px;
  padding: 0 20px;
  background-color: lightgreen;
  span {
    color: blue;
  }
`;
