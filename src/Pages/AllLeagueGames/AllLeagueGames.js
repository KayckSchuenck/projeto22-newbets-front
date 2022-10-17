import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import axios from "axios";
import Dates from "../../components/BetUtils/Dates";
import { TailSpin } from "react-loader-spinner";
import { Loading } from "../Main/Main";

export default function AllLeagueGames() {
  const [gamesData, setGamesData] = useState();
  const { id } = useParams();
  const date = dayjs().format("YYYY-MM-DD");
  const nextDate = dayjs().add(6, "day").format("YYYY-MM-DD");

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
            hashtable[day].games.push({
              ...e.teams,
              gameId: e.fixture.id,
              logo: e.league.logo,
            });
          } else
            hashtable[day] = {
              games: [{ ...e.teams, gameId: e.fixture.id }],
              date: day,
              logo: e.league.logo,
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
    <Loading>
      <TailSpin
        height="150"
        width="150"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Loading>
  ) : (
    <>
      <Block>
        {gamesData.map((e, index) => (
          <Dates
            date={e.date}
            key={index}
            games={e.games}
            id={id}
            logo={e.logo}
          />
        ))}
      </Block>
    </>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
