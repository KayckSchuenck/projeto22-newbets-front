import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import axios from "axios";
import Games from "./Games";

export default function () {
  const [gamesData, setGamesData] = useState();
  const { id } = useParams();
  const date = dayjs().format("YYYY-MM-DD");

  async function fetchData() {
    const config = {
      headers: {
        ["x-rapidapi-key"]: process.env.REACT_APP_API_KEY,
      },
    };
    try {
      const { data: result } = await axios.get(
        `${process.env.REACT_APP_EXTERNAL_API_BASE_URL}/fixtures?season=2022&status=NS&league=${id}&from=${date}&to=2022-10-05`,
        config
      );
      setGamesData(result.response);
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
          <Games
            home={e.teams.home.name}
            homeLogo={e.teams.home.logo}
            key={index}
            awayLogo={e.teams.away.logo}
            away={e.teams.away.name}
          />
        ))}
      </Block>
    </>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;
