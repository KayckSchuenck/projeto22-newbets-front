import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import UserContext from "./components/Context/userContext";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();

  const userContext = {
    token,
    setToken,
    name,
    setName,
    id,
    setId,
  };

  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserContext.Provider value={userContext}>
        <Header />
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
            <Route path="/main" element={<Main />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
