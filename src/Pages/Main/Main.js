import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Country from "../../components/BetUtils/Country";
import { TailSpin } from "react-loader-spinner";

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
        .filter((elem) => elem.seasons[0].coverage.odds)
        .sort((prev, next) => {
          if (prev.country.name > next.country.name) return 1;
          else return -1;
        })
        .forEach((leagues) => {
          if (hashtable[leagues.country.name]) {
            hashtable[leagues.country.name].leagues.push(leagues.league);
          } else
            hashtable[leagues.country.name] = {
              leagues: [leagues.league],
              name: leagues.country.name,
              flag: leagues.country.flag,
            };
        });
      const groupedLeagues = Object.values(hashtable);
      setLeagueData(groupedLeagues);
    } catch (erro) {
      console.log(erro);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return !leagueData ? (
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
  flex-wrap: wrap;
  padding: 10px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;