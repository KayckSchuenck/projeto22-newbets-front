import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Corners from "../../components/BetUtils/Corners";
import Goals from "../../components/BetUtils/Goals";
import HomeAwayDraw from "../../components/BetUtils/HomeAwayDraw";
import ExactScore from "../../components/BetUtils/ExactScore";

export default function AllMarkets() {
  const location = useLocation();
  const { fixtureId } = useParams();
  const { home, away } = location.state;
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
      const filterMarkets = markets.filter(
        (e) => e.id === 1 || e.id === 5 || e.id === 45
      );
      setOddsData(filterMarkets);
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
                    <HomeAwayDraw odd={e.odd} value={e.value} />
                  ))}
                </Flex>
              </Market>;
            if (e.id === 5)
              <Market>
                <span>{e.name}</span>
                <Flex>
                  {e.values.map((e) => (
                    <Goals odd={e.odd} value={e.value} />
                  ))}
                </Flex>
              </Market>;
            if (e.id === 45)
              <Market>
                <span>{e.name}</span>
                <Flex>
                  {e.values.map((e) => (
                    <Corners odd={e.odd} value={e.value} />
                  ))}
                </Flex>
              </Market>;
            if (e.id === 10)
              <Market>
                <span>{e.name}</span>
                <Flex>
                  {e.values.map((e) => (
                    <ExactScore odd={e.odd} value={e.value} />
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
