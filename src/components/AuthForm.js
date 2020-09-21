import styled from "styled-components";
import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <Holder>
        <ErrorMessage>{error}</ErrorMessage>
        <Input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <SubmitButton onClick={onSubmit}>
          {newAccount ? "Create Account" : "Log In"}
        </SubmitButton>
        <ChangeAuth onClick={toggleAccount}>
          {newAccount ? "Sign in" : "Create Account"}
        </ChangeAuth>
      </Holder>
    </>
  );
};
export default AuthForm;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 20px;
  width: 540px;
  height: 50px;
  border: none;
  border-bottom: 2px solid #576b7a;
  font-size: 17px;
  font-weight: 400;
  color: black;
  background-color: #f3f7f9;
  &::placeholder {
    color: #576b7a;
  }

  &:focus {
    outline: none !important;
  }
`;

const SubmitButton = styled.div`
  margin-bottom: 33px;
  background-color: #0091ee;
  width: 550px;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChangeAuth = styled.div`
  color: #0091ee;
  font-size: 15px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #ef2055;
  font-size: 15px;
  width: 540px;
  height: 20px;
`;
