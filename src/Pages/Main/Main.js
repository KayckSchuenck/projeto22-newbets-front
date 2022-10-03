import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Country from "../../components/BetUtils/Country";

export default function Main() {
  const [leagueData, setLeagueData] = useState();

  async function fetchData() {
    const config = {
      headers: {
        ["x-rapidapi-key"]: process.env.REACT_APP_API_KEY,
      },
    };
    try {
      const { data: result } = await axios.get(
        `${process.env.REACT_APP_EXTERNAL_API_BASE_URL}/leagues?season=2022&current=true`,
        config
      );
      const hashtable = {};
      result.response
        .filter((e) => e.seasons[0].coverage.odds)
        .sort((a, b) => {
          if (a.country.name > b.country.name) return 1;
          else return -1;
        })
        .forEach((e) => {
          if (hashtable[e.country.name]) {
            hashtable[e.country.name].leagues.push(e.league);
          } else
            hashtable[e.country.name] = {
              leagues: [e.league],
              name: e.country.name,
              flag: e.country.flag,
            };
        });
      const grouped = Object.values(hashtable);
      setLeagueData(grouped);
    } catch (erro) {
      console.log(erro);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return !leagueData ? (
    <>loading</>
  ) : (
    <Block>
      {leagueData.map((country, index) => (
        <Country
          name={country.name}
          leagues={country.leagues}
          countryFlag={country.flag}
          key={index}
        />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;
