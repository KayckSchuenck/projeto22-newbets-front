import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Container, Slogan } from "./Login";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function clearSignUpInputs() {
    return {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      cpf: "",
    };
  }

  const [postForm, setPostForm] = useState(clearSignUpInputs);

  function handleForm(e) {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleSignUpSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setPostForm(clearSignUpInputs);

    const promise = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/signup`,
      postForm
    );
    promise
      .then(() => {
        navigate("/login");
      })
      .catch((erro) => {
        console.log(erro);
        alert(`${erro.response.data}`);
        setLoading(false);
      });
  }

  return (
    <Container>
      <Slogan>
        <span>NEW BETS</span>
        <p>Para apostar, todo lugar é possivel</p>
      </Slogan>

      <Form $loading={loading} onSubmit={handleSignUpSubmit}>
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
        <input
          type="password"
          placeholder="confirm your password"
          name="confirmPassword"
          value={postForm.confirmPassword}
          onChange={handleForm}
          required
        />
        <input
          type="text"
          placeholder="name"
          name="name"
          value={postForm.name}
          onChange={handleForm}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          name="cpf"
          value={postForm.cpf}
          onChange={handleForm}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <ThreeDots /> : <>Sign Up</>}
        </button>
        <Link to="/login">Login</Link>
      </Form>
    </Container>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e4e4e4;
  height: 70vh;
  width: 55vw;
  border-radius: 5px;
  padding: 15px 10px;
  input,
  button {
    font-size: 15px;
    border-radius: 4px;
    pointer-events: ${(props) => (props.$loading ? "none" : "auto")};
    height: 45px;
    width: 35vw;
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
    margin-bottom: 15px;
    margin-top: 5px;
  }
  a {
    font-size: 16px;
    color: #126e51;
    pointer-events: ${(props) => (props.$loading ? "none" : "auto")};
  }
  @media (max-width: 708px) {
    padding: 10px;
    height: 68vh;
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
