import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import "../components/Navbar_btn.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #92a7b6;
 ${'' /* background-color: #1c192d6e; */}
 ${'' /*   background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center; */}
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 20rem;
  padding: 23px;
  background-color: white;
  border-radius: 15px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 350;
  justify-content: center;
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  min-width: -webkit-fill-available;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 20px;
  margin: 10px 5px;
`;

const Span = styled.span`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [passwordIsValid, setPasswordIsValid] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const enteredNameIsValid = username.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const inputisvalid = username.trim() !== "" && password.trim().length > 5;

  const nameInputChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    setFormIsValid(inputisvalid);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(password.trim().length > 5);
  };

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";
  const passwordInputClasses =
    passwordIsValid === false ? "form-control invalid" : "form-control";

  return (
    <Container>
      <Wrapper>
        <Title>LOGIN</Title>
        <Form>
          <div className={nameInputClasses}>
            <label htmlFor="name">Username</label>
            <Input
              type="text"
              id="name"
              className="registerInput"
              placeholder="Enter your username..."
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              value={username}
            />
            {nameInputIsInvalid && (
              <p className="error-text">PLease enter valid username.</p>
            )}
          </div>
          <div className={passwordInputClasses}>
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              className="registerInput"
              placeholder="Enter your password..."
              value={password}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            {passwordIsValid === false && (
              <p className="error-text">PLease enter valid password.</p>
            )}
          </div>
          <button
            className="login_btn"
            onClick={handleClick}
            disabled={!formIsValid}
          >
            LOGIN
          </button>
          {error && <Error>Invalid Credentials!</Error>}
          <Agreement>
            <Link to="/register">
              <Span>DONT REMEMBER PASSWORD? then CREATE A NEW ACCOUNT</Span>
            </Link>
          </Agreement>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
