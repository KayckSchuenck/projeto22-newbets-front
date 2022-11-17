import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../components/Context/userContext";
import { ThreeDots } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();
  const { setToken, setName, setAvailableAmount } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false)

  function clearLoginInputs() {
    return {
      email: "",
      password: "",
    };
  }

  const [postForm, setPostForm] = useState(clearLoginInputs);
  function handleForm(e) {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setPostForm(clearLoginInputs);
    setLoginError(false)
    const loginPost = {
      email: postForm.email,
      password: postForm.password,
    };

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/login`, loginPost)
      .then((res) => {
        localStorage.setItem(
          "isLogged",
          JSON.stringify({
            name: res.data.name,
            token: res.data.token,
          })
        );
        setName(res.data.name);
        setToken(res.data.token);
        setAvailableAmount(res.data.availableMoney);
        navigate(-1);
      })
      .catch((error) => {
        setLoginError(true)
        setLoading(false);
      });
  }

  return (
    <Container>
      <Slogan>
        <span>NEWBETS</span>
        <p>Para apostar, todo lugar é possível</p>
      </Slogan>

      <Form $loading={loading} onSubmit={handleLoginSubmit}>
        <input
          type="email"
          placeholder="e-mail"
          name="email"
          value={postForm.email}
          onChange={handleForm}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={postForm.password}
          onChange={handleForm}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <ThreeDots /> : <>Login</>}
        </button>

        <Link to="/sign-up">
          Faça seu cadastro agora e receba R$ 20,00 de bonus
        </Link>
        {loginError ? <span>Erro ao fazer seu login, tente novamente</span> : <></>}
      </Form>

    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e4e4e4;
  height: 50vh;
  width: 55vw;
  border-radius: 5px;
  padding: 10px;
  span{
    color:red;
    margin-top:10px;
    font-size: 22px;
  }
  input,
  button {
    font-size: 15px;
    border-radius: 3px;
    pointer-events: ${(props) => (props.$loading ? "none" : "auto")};
    height: 45px;
    width: 50vw;
  }
  input {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f0f0f0;
    color: #333;
  }
  input::placeholder {
    color: #9f9f9f;
  }
  button {
    color: white;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #126e51;
    margin-bottom: 14px;
  }
  a {
    font-size: 16px;
    color: #126e51;
    pointer-events: ${(props) => (props.$loading ? "none" : "auto")};
  }
  @media (max-width: 708px) {
    input {
      padding-right: 7px;
      width: 70vw;
    }
    button {
      width: 70vw;
    }
    width: 75vw;
  }
`;

export const Slogan = styled.div`
  margin-top: 10px;
  background-color: #383838;
  border-radius: 5px;
  padding: 10px;
  width: 55vw;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  color: white;
  @media (max-width: 708px) {
    width: 75vw;
  }
`;
