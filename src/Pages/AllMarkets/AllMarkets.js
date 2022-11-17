import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Goals from "../../components/BetUtils/ChosenMarkets/Goals";
import HomeAwayDraw from "../../components/BetUtils/ChosenMarkets/HomeAwayDraw";
import ExactScores from "../../components/BetUtils/ChosenMarkets/ExactScores";
import { TailSpin } from "react-loader-spinner";
import { Loading } from "../Main/Main";

export default function AllMarkets() {
  const location = useLocation();
  const { fixtureId } = useParams();
  const { home, away, homeLogo, awayLogo } = location.state;
  const [oddsData, setOddsData] = useState();

  async function fetchData() {
    const config = {
      headers: {
        ["x-rapidapi-key"]: process.env.REACT_APP_API_KEY,
      },
    };
    try {
      const { data: result } = await axios.get(
        `${process.env.REACT_APP_EXTERNAL_API_BASE_URL}/odds?fixture=${fixtureId}`,
        config
      );
      const markets = result.response[0].bookmakers[0].bets;
      const chosenMarkets = markets.filter(
        (market) => market.id === 1 || market.id === 5 || market.id === 10
      );
      setOddsData(chosenMarkets);
    } catch (erro) {
      console.log(erro);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <TeamInfo>
          <OnlyToFlex>
            <img src={homeLogo} />
            <span>{home}</span>
          </OnlyToFlex>
          <span>X</span>
          <OnlyToFlex>
            <span>{away}</span>
            <img src={awayLogo} />
          </OnlyToFlex>
        </TeamInfo>
        {oddsData ? (
          oddsData.map((elem) => {
            if (elem.id === 1) {
              return (
                <Market>
                  <h2>{elem.name}</h2>
                  <Winner>
                    {elem.values.map((line, index) => (
                      <HomeAwayDraw
                        odd={line.odd}
                        value={line.value}
                        fixtureId={fixtureId}
                        key={index}
                      />
                    ))}
                  </Winner>
                </Market>
              );
            }

            if (elem.id === 5) {
              return (
                <Market>
                  <h2>{elem.name}</h2>
                  <Flex>
                    <Block>
                      {elem.values.map((line, index) => (
                        <Goals
                          odd={line.odd}
                          value={line.value}
                          fixtureId={fixtureId}
                          key={index}
                        />
                      ))}
                    </Block>
                  </Flex>
                </Market>
              );
            }

            if (elem.id === 10) {
              return (
                <Market>
                  <h2>{elem.name}</h2>
                  <Flex>
                    <Block>
                      {elem.values.map((line, index) => (
                        <ExactScores
                          odd={line.odd}
                          value={line.value}
                          fixtureId={fixtureId}
                          key={index}
                        />
                      ))}
                    </Block>
                  </Flex>
                </Market>
              );
            }
          })
        ) : (
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
        )}
      </Container>
    </>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60vw;
  p {
    color: yellow;
    margin: 10px 0;
  }
  img {
    width: 20px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8vw;
  
`;

const Market = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  h2{
    color: lightgreen;
    font-weight: 700;
  }
  
`;
const Block = styled.div`
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  row-gap: 10px;
  column-gap: 10px;
`;
const TeamInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  font-size: 24px;
  margin-bottom: 30px;
  img {
    width: 30px;
  }
  @media (max-width: 500px) {
    width: 345px;
    font-size: 21px;
  }
`;

const Winner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 50vw;
  margin-top: 15px;
  margin-bottom: 20px;
  p {
    color: yellow;
  }
  img {
    width: 20px;
  }
`;

const OnlyToFlex = styled.div`
  display: flex;
  align-items: center;
  span{
    margin:0 5px
  }
`;
