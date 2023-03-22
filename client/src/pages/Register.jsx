// import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
// import classes from './styles.module.css';
import "./register.css";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ${'' /* background-color: #1c192d6e; */}
  background-color: #92a7b6;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 20rem;
  padding: 25px;
  background-color: white;
  border-radius: 15px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 350;
  justify-content: center;
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 90%;
  margin: 20px 10px 0px 0px;
  padding: 5px;
`;

const Agreement = styled.span`
  font-size: 13px;
  margin: 20px 5px;
`;

// const invalid = styled.div`
//   border-color: red;
//   background: #fbdada;
// `;

// const control = styled.div`
//   border-color: red;
//   background: #fbdada;
// `;

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [error, setError] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const inputisvalid = username.trim() !== "" && email.includes("@") && password.trim().length > 5;

  const enteredNameIsValid = username.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredEmailIsValid = email.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const nameInputChangeHandler = (event) => {
    setUsername(event.target.value);
    setFormIsValid(inputisvalid);
  };

  // let formisvalid = false;

  // if (enteredNameIsValid && enteredEmailIsValid) {
  //   formisvalid = true;
  // }

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  const emailInputBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const emailInputChangeHandler = (event) => {
    setEmail(event.target.value);
    setFormIsValid(inputisvalid);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    setFormIsValid(inputisvalid);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(password.trim().length > 5);
    // setEnteredEmailTouched(true);
  };

  const nameInputClasses = nameInputIsInvalid ? "form-control invalid" : "form-control";
  const emailInputClasses = emailInputIsInvalid ? "form-control invalid" : "form-control";
  const passwordInputClasses = passwordIsValid === false ? "form-control invalid" : "form-control";
//  const passwordInputError =  passwordIsValid === false && '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await publicRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <Container>
        <Wrapper>
          <Title className="registerTitle">Register</Title>
          <Form className="registerForm" onSubmit={handleSubmit}>
            {/* <label>Username</label>
            <Input
              type="text"
              className="registerInput"
              placeholder="Enter your username..."
              onChange={(e) => setUsername(e.target.value)}
            /> */}
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
            {/* <label>Email</label>
            <Input
              type="text"
              className="registerInput"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            <div className={emailInputClasses}>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                className="registerInput"
                placeholder="Enter your email..."
                onChange={emailInputChangeHandler}
                onBlur={emailInputBlurHandler}
                value={email}
              />
              {emailInputIsInvalid && (
                <p className="error-text">PLease enter valid email-id.</p>
              )}
            </div>
            <div className={passwordInputClasses} >
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
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <button
              className="register_btn"
              type="submit"
              disabled={!formIsValid}
            >
              Register
            </button>
          </Form>
          <Link className="link" to="/login"></Link>
          {error && (
            <span
              style={{
                color: "red",
                marginTop: "10px",
                WebkitTextStrokeWidth: "thin",
                margin: "50px",
                fontSize: "26px",
                textAlign: "center",
              }}
            >
              Invalid credentials!
            </span>
          )}
        </Wrapper>
      </Container>
    </div>
  );
}
