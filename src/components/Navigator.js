import React from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";
import { BiHomeAlt, BiSearch, BiUser, BiPen } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navigator = () => {
  return (
    <Bar>
      <Icons>
        <FaTwitter color="#4aa0eb" size="40px" style={{ margin: 10 }} />
        <Link to="/">
          <Icon>
            <BiHomeAlt
              color="#222427"
              size="35px"
              style={{ margin: 15 }}
              onMouseEnter={({ target }) => (target.style.color = "#4aa0eb")}
              onMouseLeave={({ target }) => (target.style.color = "#222427")}
            />
            <Title>Home</Title>
          </Icon>
        </Link>
        <Icon>
          <BiSearch
            color="#222427"
            size="35px"
            style={{ margin: 15 }}
            onMouseEnter={({ target }) => (target.style.color = "#4aa0eb")}
            onMouseLeave={({ target }) => (target.style.color = "#222427")}
          />
          <Title>Search</Title>
        </Icon>
        <Link to="/profile">
          <Icon>
            <BiUser
              color="#222427"
              size="35px"
              style={{ margin: 15 }}
              onMouseEnter={({ target }) => (target.style.color = "#4aa0eb")}
              onMouseLeave={({ target }) => (target.style.color = "#222427")}
            />
            <Title>Profile</Title>
          </Icon>
        </Link>
        <RoundPostButton
          onMouseEnter={({ target }) =>
            (target.style.backgroundColor = "#2980b9")
          }
          onMouseLeave={({ target }) =>
            (target.style.backgroundColor = "#4aa0eb")
          }
        >
          <BiPen color="#ffffff" size="35px" />
        </RoundPostButton>
        <SquarePostButton>Kweet</SquarePostButton>
      </Icons>
    </Bar>
  );
};
export default Navigator;

const Bar = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  border-right: 1px solid lightgray;
`;

const Icons = styled.div`
  width: 60px;
  margin: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media screen and (min-width: 961px) {
    margin-right: 200px;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: none;
  font-size: 20px;
  font-weight: 700;

  @media screen and (min-width: 961px) {
    display: block;
  }
`;

const RoundPostButton = styled.div`
  background-color: #4aa0eb;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-top: 15px;
  margin-left: 3px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 961px) {
    display: none;
  }
`;

const SquarePostButton = styled.div`
  background-color: #4aa0eb;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  margin-top: 15px;
  display: none;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: 700;

  @media screen and (min-width: 961px) {
    display: flex;
  }
`;
