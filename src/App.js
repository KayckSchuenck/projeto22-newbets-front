import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import UserContext from "./components/Context/userContext";
import Main from "./Pages/Main/Main";
import AllLeagueGames from "./Pages/AllLeagueGames/AllLeagueGames";
import AllMarkets from "./Pages/AllMarkets/AllMarkets";
import Header from "./components/Header/Header";
import PersistRoute from "./components/Routes/PersistRoute";
import History from "./Pages/History/History";
import axios from "axios";
import LoginRedirect from "./components/Routes/LoginRedirect";

function App() {
  const [token, setToken] = useState();
  const [name, setName] = useState();
  const [availableAmount, setAvailableAmount] = useState();

  function postBet(userBet, route) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/bets/${route}`,
        userBet,
        config
      )
      .then((res) => {
        alert("Aposta efetuada com sucesso");
        setAvailableAmount(res.data.availableMoney);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }

  const userContext = {
    token,
    setToken,
    name,
    setName,
    availableAmount,
    setAvailableAmount,
    postBet,
  };

  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserContext.Provider value={userContext}>
        <Header />
        <Routes>
          <Route
            element={<LoginRedirect auth={localStorage.getItem("isLogged")} />}
          >
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            element={<PersistRoute auth={localStorage.getItem("isLogged")} />}
          >
            <Route path="/" element={<Main />} />
            <Route path="/leagues/:id" element={<AllLeagueGames />} />
            <Route path="/markets/:fixtureId" element={<AllMarkets />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
