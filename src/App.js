import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import UserContext from "./components/Context/userContext";
import BetContext from "./components/Context/betContext";
import Main from "./Pages/Main/Main";
import AllLeagueGames from "./Pages/AllLeagueGames/AllLeagueGames";
import AllMarkets from "./Pages/AllMarkets/AllMarkets";

function App() {
  const [token, setToken] = useState();
  const [name, setName] = useState();

  const userContext = {
    token,
    setToken,
    name,
    setName,
  };

  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserContext.Provider value={userContext}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Main />} />
          <Route path="/leagues/:id" element={<AllLeagueGames />} />
          <Route path="/markets/:fixtureId" element={<AllMarkets />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
