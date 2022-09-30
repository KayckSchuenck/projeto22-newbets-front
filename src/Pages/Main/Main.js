import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import League from "../../components/BetUtils/League";

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
      const coverageOdds = result.response.filter(
        (e) => e.seasons[0].coverage.odds
      );
      console.log(coverageOdds);
      setLeagueData(coverageOdds);
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
      {leagueData.map((e, index) => (
        <League
          name={e.league.name}
          key={index}
          countryFlag={e.country.flag}
          id={e.league.id}
        />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;
