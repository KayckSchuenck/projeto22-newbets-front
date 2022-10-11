import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Games from "./Games";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

export default function Dates({ date, games, id, logo }) {
  const [selected, setSelected] = useState();
  const [gameOdds, setGameOdds] = useState();
  const data = [
    {
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
      },
      fixture: {
        id: 838968,
        timezone: "UTC",
        date: "2022-10-15T00:30:00+00:00",
        timestamp: 1665793800,
      },
      update: "2022-10-11T00:15:19+00:00",
      bookmakers: [
        {
          id: 6,
          name: "Bwin",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.22",
                },
                {
                  value: "Away",
                  odd: "3.90",
                },
              ],
            },
          ],
        },
        {
          id: 27,
          name: "NordicBet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.20",
                },
                {
                  value: "Away",
                  odd: "4.20",
                },
              ],
            },
          ],
        },
        {
          id: 1,
          name: "10Bet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.22",
                },
                {
                  value: "Away",
                  odd: "3.85",
                },
              ],
            },
          ],
        },
        {
          id: 7,
          name: "William Hill",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.25",
                },
                {
                  value: "Away",
                  odd: "3.75",
                },
              ],
            },
          ],
        },
        {
          id: 8,
          name: "Bet365",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.22",
                },
                {
                  value: "Away",
                  odd: "4.00",
                },
              ],
            },
          ],
        },
        {
          id: 26,
          name: "Betsson",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.20",
                },
                {
                  value: "Away",
                  odd: "4.20",
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: "Pinnacle",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.20",
                },
                {
                  value: "Away",
                  odd: "4.69",
                },
              ],
            },
          ],
        },
        {
          id: 30,
          name: "Netbet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.18",
                },
                {
                  value: "Away",
                  odd: "3.80",
                },
              ],
            },
          ],
        },
        {
          id: 23,
          name: "Sportingbet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.22",
                },
                {
                  value: "Away",
                  odd: "3.90",
                },
              ],
            },
          ],
        },
        {
          id: 28,
          name: "ComeOn",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.18",
                },
                {
                  value: "Away",
                  odd: "3.80",
                },
              ],
            },
          ],
        },
        {
          id: 22,
          name: "Tipico",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.20",
                },
                {
                  value: "Away",
                  odd: "4.10",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
      },
      fixture: {
        id: 838972,
        timezone: "UTC",
        date: "2022-10-15T19:30:00+00:00",
        timestamp: 1665862200,
      },
      update: "2022-10-11T00:15:19+00:00",
      bookmakers: [
        {
          id: 6,
          name: "Bwin",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.66",
                },
                {
                  value: "Away",
                  odd: "2.05",
                },
              ],
            },
          ],
        },
        {
          id: 27,
          name: "NordicBet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.68",
                },
                {
                  value: "Away",
                  odd: "2.10",
                },
              ],
            },
          ],
        },
        {
          id: 1,
          name: "10Bet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.66",
                },
                {
                  value: "Away",
                  odd: "2.05",
                },
              ],
            },
          ],
        },
        {
          id: 7,
          name: "William Hill",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.67",
                },
                {
                  value: "Away",
                  odd: "2.10",
                },
              ],
            },
          ],
        },
        {
          id: 8,
          name: "Bet365",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.67",
                },
                {
                  value: "Away",
                  odd: "2.10",
                },
              ],
            },
          ],
        },
        {
          id: 26,
          name: "Betsson",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.68",
                },
                {
                  value: "Away",
                  odd: "2.10",
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: "Pinnacle",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.67",
                },
                {
                  value: "Away",
                  odd: "2.21",
                },
              ],
            },
          ],
        },
        {
          id: 30,
          name: "Netbet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.62",
                },
                {
                  value: "Away",
                  odd: "2.05",
                },
              ],
            },
          ],
        },
        {
          id: 23,
          name: "Sportingbet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.66",
                },
                {
                  value: "Away",
                  odd: "2.05",
                },
              ],
            },
          ],
        },
        {
          id: 28,
          name: "ComeOn",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.62",
                },
                {
                  value: "Away",
                  odd: "2.05",
                },
              ],
            },
          ],
        },
        {
          id: 22,
          name: "Tipico",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.65",
                },
                {
                  value: "Away",
                  odd: "2.10",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
      },
      fixture: {
        id: 838967,
        timezone: "UTC",
        date: "2022-10-15T22:00:00+00:00",
        timestamp: 1665871200,
      },
      update: "2022-10-11T00:15:19+00:00",
      bookmakers: [
        {
          id: 6,
          name: "Bwin",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.35",
                },
                {
                  value: "Away",
                  odd: "2.95",
                },
              ],
            },
          ],
        },
        {
          id: 27,
          name: "NordicBet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.33",
                },
                {
                  value: "Away",
                  odd: "3.10",
                },
              ],
            },
          ],
        },
        {
          id: 7,
          name: "William Hill",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.36",
                },
                {
                  value: "Away",
                  odd: "3.00",
                },
              ],
            },
          ],
        },
        {
          id: 8,
          name: "Bet365",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.33",
                },
                {
                  value: "Away",
                  odd: "3.25",
                },
              ],
            },
          ],
        },
        {
          id: 26,
          name: "Betsson",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.33",
                },
                {
                  value: "Away",
                  odd: "3.10",
                },
              ],
            },
          ],
        },
        {
          id: 4,
          name: "Pinnacle",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.35",
                },
                {
                  value: "Away",
                  odd: "3.23",
                },
              ],
            },
          ],
        },
        {
          id: 23,
          name: "Sportingbet",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.35",
                },
                {
                  value: "Away",
                  odd: "2.95",
                },
              ],
            },
          ],
        },
        {
          id: 28,
          name: "ComeOn",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.31",
                },
                {
                  value: "Away",
                  odd: "2.90",
                },
              ],
            },
          ],
        },
        {
          id: 22,
          name: "Tipico",
          bets: [
            {
              id: 2,
              name: "Home/Away",
              values: [
                {
                  value: "Home",
                  odd: "1.35",
                },
                {
                  value: "Away",
                  odd: "2.95",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

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
      // const { data: result } = await axios.get(
      //   `${process.env.REACT_APP_EXTERNAL_API_BASE_URL}/odds?season=2022&date=${date}&league=${id}&bet=2`,
      //   config
      // );

      // if (!result.response.length) {
      //   alert("Sem jogos disponíveis para essa data");
      // }

      // createHashtable(result.response);
      createHashtable(data);
    } catch (erro) {
      console.log(erro);
    }
  }
  return (
    <>
      <BoxFlex>
        <Flex>
          <span>{date}</span>
          <img src={logo} />
        </Flex>
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
      </BoxFlex>
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

const BoxFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0 20px;
  background-color: #e4e4e4d6;
  margin-bottom: 10px;
  font-size: 20px;
  border-radius: 5px;
  span {
    color: darkgreen;
  }
  img {
    width: 25px;
    height: 25px;
    margin-left: 15px;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
