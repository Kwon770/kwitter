import React from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <Holder>
      <FaTwitter color="#4aa0eb" size="40px" style={{ marginBottom: 40 }} />
      <span style={{ fontSize: 20, fontWeight: 600, marginBottom: 25 }}>
        Login Kwitter
      </span>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </Holder>
  );
};
export default Auth;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px;
`;
