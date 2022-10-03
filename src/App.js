import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/Login";
import UserContext from "./components/Context/userContext";
import BetContext from "./components/Context/betContext";
import PublicRoute from "./components/Routes/PublicRoute";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Main from "./Pages/Main/Main";
import AllLeagueGames from "./components/BetUtils/AllLeagueGames";

function App() {
  const [token, setToken] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [betsArray, setBetsArray] = useState([]);

  const userContext = {
    token,
    setToken,
    name,
    setName,
    id,
    setId,
  };

  const betContext = {
    betsArray,
    setBetsArray,
  };

  return (
    <BrowserRouter>
      <GlobalStyles />
      <BetContext.Provider value={betContext}>
        <UserContext.Provider value={userContext}>
          <Routes>
            <Route
              element={<PublicRoute auth={localStorage.getItem("isLogged")} />}
            >
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route
              element={<PrivateRoute auth={localStorage.getItem("isLogged")} />}
            >
              <Route path="/" element={<Main />} />
              <Route path="/leagues/:id" element={<AllLeagueGames />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </BetContext.Provider>
    </BrowserRouter>
  );
}

export default App;
