import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Corners from "../../components/BetUtils/ChosenMarkets/Corners";
import Goals from "../../components/BetUtils/ChosenMarkets/Goals";
import HomeAwayDraw from "../../components/BetUtils/ChosenMarkets/HomeAwayDraw";
import ExactScore from "../../components/BetUtils/ChosenMarkets/ExactScore";

export default function AllMarkets() {
  const location = useLocation();
  const { fixtureId } = useParams();
  const { home, away } = location.state;
  const [oddsData, setOddsData] = useState();
  const [cornerSelected, setCornerSelected] = useState(false);
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
        (market) =>
          market.id === 1 ||
          market.id === 5 ||
          market.id === 10 ||
          market.id === 45
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
          oddsData.map((e) => {
            if (e.id === 1)
              <Market>
                <span>{e.name}</span>
                <Flex>
                  {e.values.map((e) => (
                    <HomeAwayDraw
                      odd={e.odd}
                      value={e.value}
                      setWinner={setWinnerSelected}
                      winner={winnerSelected}
                      fixtureId={fixtureId}
                    />
                  ))}
                </Flex>
              </Market>;
            if (e.id === 5)
              <Market>
                <span>{e.name}</span>
                <Flex>
                  {e.values.map((e) => (
                    <Goals
                      odd={e.odd}
                      value={e.value}
                      setGoals={setGoalsSelected}
                      goals={goalsSelected}
                      fixtureId={fixtureId}
                    />
                  ))}
                </Flex>
              </Market>;
            if (e.id === 45)
              <Market>
                <span>{e.name}</span>
                <Flex>
                  {e.values.map((e) => (
                    <Corners
                      odd={e.odd}
                      value={e.value}
                      setCorners={setCornerSelected}
                      corners={cornerSelected}
                      fixtureId={fixtureId}
                    />
                  ))}
                </Flex>
              </Market>;
            if (e.id === 10)
              <Market>
                <span>{e.name}</span>
                <Flex>
                  {e.values.map((e) => (
                    <ExactScore
                      odd={e.odd}
                      value={e.value}
                      setScore={setScoreSelected}
                      score={scoreSelected}
                      fixtureId={fixtureId}
                    />
                  ))}
                </Flex>
              </Market>;
          })
        ) : (
          <>loading</>
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
