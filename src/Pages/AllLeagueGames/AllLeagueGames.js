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

  const data = [
    {
      fixture: {
        id: 838964,
        referee: null,
        timezone: "UTC",
        date: "2022-10-11T22:00:00+00:00",
        timestamp: 1665525600,
        periods: {
          first: null,
          second: null,
        },
        venue: {
          id: 242,
          name: "Estádio Brinco de Ouro da Princesa",
          city: "Campinas, São Paulo",
        },
        status: {
          long: "Not Started",
          short: "NS",
          elapsed: null,
        },
      },
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
        round: "Regular Season - 35",
      },
      teams: {
        home: {
          id: 138,
          name: "Guarani Campinas",
          logo: "https://media.api-sports.io/football/teams/138.png",
          winner: null,
        },
        away: {
          id: 146,
          name: "CRB",
          logo: "https://media.api-sports.io/football/teams/146.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
      score: {
        halftime: {
          home: null,
          away: null,
        },
        fulltime: {
          home: null,
          away: null,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 838965,
        referee: null,
        timezone: "UTC",
        date: "2022-10-14T22:00:00+00:00",
        timestamp: 1665784800,
        periods: {
          first: null,
          second: null,
        },
        venue: {
          id: 232,
          name: "Estádio Rei Pelé",
          city: "Maceió, Alagoas",
        },
        status: {
          long: "Not Started",
          short: "NS",
          elapsed: null,
        },
      },
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
        round: "Regular Season - 35",
      },
      teams: {
        home: {
          id: 150,
          name: "CSA",
          logo: "https://media.api-sports.io/football/teams/150.png",
          winner: null,
        },
        away: {
          id: 148,
          name: "Londrina",
          logo: "https://media.api-sports.io/football/teams/148.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
      score: {
        halftime: {
          home: null,
          away: null,
        },
        fulltime: {
          home: null,
          away: null,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 838967,
        referee: null,
        timezone: "UTC",
        date: "2022-10-15T22:00:00+00:00",
        timestamp: 1665871200,
        periods: {
          first: null,
          second: null,
        },
        venue: {
          id: 233,
          name: "Estádio Heriberto Hülse",
          city: "Criciúma, Santa Catarina",
        },
        status: {
          long: "Not Started",
          short: "NS",
          elapsed: null,
        },
      },
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
        round: "Regular Season - 35",
      },
      teams: {
        home: {
          id: 140,
          name: "Criciuma",
          logo: "https://media.api-sports.io/football/teams/140.png",
          winner: null,
        },
        away: {
          id: 7779,
          name: "Ituano",
          logo: "https://media.api-sports.io/football/teams/7779.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
      score: {
        halftime: {
          home: null,
          away: null,
        },
        fulltime: {
          home: null,
          away: null,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 838968,
        referee: null,
        timezone: "UTC",
        date: "2022-10-15T00:30:00+00:00",
        timestamp: 1665793800,
        periods: {
          first: null,
          second: null,
        },
        venue: {
          id: 5664,
          name: "Estádio Dr. Jorge Ismael de Biasi",
          city: "Novo Horizonte, São Paulo",
        },
        status: {
          long: "Not Started",
          short: "NS",
          elapsed: null,
        },
      },
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
        round: "Regular Season - 35",
      },
      teams: {
        home: {
          id: 7834,
          name: "Novorizontino",
          logo: "https://media.api-sports.io/football/teams/7834.png",
          winner: null,
        },
        away: {
          id: 755,
          name: "Nautico Recife",
          logo: "https://media.api-sports.io/football/teams/755.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
      score: {
        halftime: {
          home: null,
          away: null,
        },
        fulltime: {
          home: null,
          away: null,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 838969,
        referee: null,
        timezone: "UTC",
        date: "2022-10-14T00:30:00+00:00",
        timestamp: 1665707400,
        periods: {
          first: null,
          second: null,
        },
        venue: {
          id: 256,
          name: "Estádio Germano Krüger",
          city: "Ponta Grossa, Paraná",
        },
        status: {
          long: "Not Started",
          short: "NS",
          elapsed: null,
        },
      },
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
        round: "Regular Season - 35",
      },
      teams: {
        home: {
          id: 1223,
          name: "Operario-PR",
          logo: "https://media.api-sports.io/football/teams/1223.png",
          winner: null,
        },
        away: {
          id: 1211,
          name: "Brusque",
          logo: "https://media.api-sports.io/football/teams/1211.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
      score: {
        halftime: {
          home: null,
          away: null,
        },
        fulltime: {
          home: null,
          away: null,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 838971,
        referee: null,
        timezone: "UTC",
        date: "2022-10-12T00:30:00+00:00",
        timestamp: 1665534600,
        periods: {
          first: null,
          second: null,
        },
        venue: {
          id: 265,
          name: "Estádio Governador João Castelo",
          city: "São Luís, Maranhão",
        },
        status: {
          long: "Not Started",
          short: "NS",
          elapsed: null,
        },
      },
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
        round: "Regular Season - 35",
      },
      teams: {
        home: {
          id: 155,
          name: "Sampaio Correa",
          logo: "https://media.api-sports.io/football/teams/155.png",
          winner: null,
        },
        away: {
          id: 132,
          name: "Chapecoense-sc",
          logo: "https://media.api-sports.io/football/teams/132.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
      score: {
        halftime: {
          home: null,
          away: null,
        },
        fulltime: {
          home: null,
          away: null,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 838972,
        referee: null,
        timezone: "UTC",
        date: "2022-10-15T19:30:00+00:00",
        timestamp: 1665862200,
        periods: {
          first: null,
          second: null,
        },
        venue: {
          id: 8268,
          name: "Estádio Soares de Azevedo",
          city: "Muriaé, Minas Gerais",
        },
        status: {
          long: "Not Started",
          short: "NS",
          elapsed: null,
        },
      },
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
        round: "Regular Season - 35",
      },
      teams: {
        home: {
          id: 2227,
          name: "Tombense",
          logo: "https://media.api-sports.io/football/teams/2227.png",
          winner: null,
        },
        away: {
          id: 139,
          name: "Ponte Preta",
          logo: "https://media.api-sports.io/football/teams/139.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
      score: {
        halftime: {
          home: null,
          away: null,
        },
        fulltime: {
          home: null,
          away: null,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
    {
      fixture: {
        id: 838973,
        referee: null,
        timezone: "UTC",
        date: "2022-10-14T23:30:00+00:00",
        timestamp: 1665790200,
        periods: {
          first: null,
          second: null,
        },
        venue: {
          id: 280,
          name: "Estádio Onésio Brasileiro Alvarenga",
          city: "Goiânia, Goiás",
        },
        status: {
          long: "Not Started",
          short: "NS",
          elapsed: null,
        },
      },
      league: {
        id: 72,
        name: "Serie B",
        country: "Brazil",
        logo: "https://media.api-sports.io/football/leagues/72.png",
        flag: "https://media.api-sports.io/flags/br.svg",
        season: 2022,
        round: "Regular Season - 35",
      },
      teams: {
        home: {
          id: 142,
          name: "Vila Nova",
          logo: "https://media.api-sports.io/football/teams/142.png",
          winner: null,
        },
        away: {
          id: 135,
          name: "Cruzeiro",
          logo: "https://media.api-sports.io/football/teams/135.png",
          winner: null,
        },
      },
      goals: {
        home: null,
        away: null,
      },
      score: {
        halftime: {
          home: null,
          away: null,
        },
        fulltime: {
          home: null,
          away: null,
        },
        extratime: {
          home: null,
          away: null,
        },
        penalty: {
          home: null,
          away: null,
        },
      },
    },
  ];

  async function fetchData() {
    const config = {
      headers: {
        ["x-rapidapi-key"]: process.env.REACT_APP_API_KEY,
      },
    };
    try {
      // const { data: result } = await axios.get(
      //   `${process.env.REACT_APP_EXTERNAL_API_BASE_URL}/fixtures?season=2022&status=NS&league=${id}&from=${date}&to=${nextDate}`,
      //   config
      // );
      const hashtable = {};
      data
        // result.response
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
