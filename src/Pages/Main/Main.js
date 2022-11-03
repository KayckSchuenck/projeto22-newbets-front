import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Country from "../../components/BetUtils/Country";
import { TailSpin } from "react-loader-spinner";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export default function Main() {
  const [cardForm, setCardForm] = useState(clearCardInputs);

  function clearCardInputs() {
    return {
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
    };
  }

  function handleInputFocus(e) {
    setCardForm({ ...cardForm, focus: e.target.name });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCardForm({ ...cardForm, [name]: value });
  }
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
      <CreditCard>
        <Cards
          cvc={cardForm.cvc}
          expiry={cardForm.expiry}
          focused={cardForm.focus}
          name={cardForm.name}
          number={cardForm.number}
        />
        <Form>
          <div>
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <p>E.g.:49..., 51..., 36..., 27...</p>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <Flex>
            <input
              type="number"
              name="expiry"
              placeholder="Valid Thru"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </Flex>
        </Form>
      </CreditCard>
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

const CreditCard = styled.div`
  display: flex;
  align-items: center;
  height: 225px;
  padding: 15px;
  color: #8e8e8e;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 180px;
  margin-left: 25px;
  input {
    width: 300px;
    border-radius: 5px;
    height: 42px;
    padding: 0 10px;
    font-size: 18px;
    color: #8e8e8e;
  }
  p {
    font-size: 15px;
    margin-top: 5px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  input {
    width: 146px;
  }
`;
