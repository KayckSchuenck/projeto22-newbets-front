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
  const { home, away } = location.state;
  const [oddsData, setOddsData] = useState();
  const [goalsSelected, setGoalsSelected] = useState(false);
  const [scoreSelected, setScoreSelected] = useState(false);
  const [winnerSelected, setWinnerSelected] = useState(false);

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
        <Flex>
          <span>{home}</span>
          <span>{away}</span>
        </Flex>
        {oddsData ? (
          oddsData.map((elem) => {
            if (elem.id === 1) {
              return (
                <Market>
                  <span>{elem.name}</span>
                  <Flex>
                    {elem.values.map((line, index) => (
                      <HomeAwayDraw
                        odd={line.odd}
                        value={line.value}
                        setWinner={setWinnerSelected}
                        winner={winnerSelected}
                        fixtureId={fixtureId}
                        key={index}
                      />
                    ))}
                  </Flex>
                </Market>
              );
            }

            if (elem.id === 5) {
              return (
                <Market>
                  <span>{elem.name}</span>
                  <Flex>
                    {elem.values.map((line, index) => (
                      <Goals
                        odd={line.odd}
                        value={line.value}
                        setGoals={setGoalsSelected}
                        goals={goalsSelected}
                        fixtureId={fixtureId}
                        key={index}
                      />
                    ))}
                  </Flex>
                </Market>
              );
            }

            if (elem.id === 10) {
              return (
                <Market>
                  <span>{elem.name}</span>
                  <Flex>
                    {elem.values.map((line, index) => (
                      <ExactScores
                        odd={line.odd}
                        value={line.value}
                        setScore={setScoreSelected}
                        score={scoreSelected}
                        fixtureId={fixtureId}
                        key={index}
                      />
                    ))}
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
  width: 50vw;
  p {
    color: yellow;
    margin: 10px 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10vw;
`;

const Market = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    margin: 30px 0;
  }
`;
