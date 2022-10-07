import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import axios from "axios";
import Dates from "../../components/BetUtils/Dates";

export default function AllLeagueGames() {
  const [gamesData, setGamesData] = useState();
  const { id } = useParams();
  const date = dayjs().format("YYYY-MM-DD");
  const nextDate = dayjs().add(4, "day").format("YYYY-MM-DD");

  async function fetchData() {
    const config = {
      headers: {
        ["x-rapidapi-key"]: process.env.REACT_APP_API_KEY,
      },
    };
    try {
      const { data: result } = await axios.get(
        `${process.env.REACT_APP_EXTERNAL_API_BASE_URL}/fixtures?season=2022&status=NS&league=${id}&from=${date}&to=${nextDate}`,
        config
      );
      const hashtable = {};
      result.response
        .sort((a, b) => {
          if (a.fixture.date < b.fixture.date) return -1;
        })
        .forEach((e) => {
          const day = e.fixture.date.slice(0, 10);
          if (hashtable[day]) {
            hashtable[day].games.push({ ...e.teams, gameId: e.fixture.id });
          } else
            hashtable[day] = {
              games: [{ ...e.teams, gameId: e.fixture.id }],
              date: day,
            };
        });
      const grouped = Object.values(hashtable);
      setGamesData(grouped);
    } catch (erro) {
      console.log(erro);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return !gamesData ? (
    <>loading</>
  ) : (
    <>
      <Block>
        {gamesData.map((e, index) => (
          <Dates date={e.date} key={index} games={e.games} id={id} />
        ))}
      </Block>
    </>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;
