import React from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";
import { BiHomeAlt, BiSearch, BiUser, BiPen } from "react-icons/bi";

const Navigator = () => {
  return (
    <Bar>
      <Icons>
        <FaTwitter color="#4aa0eb" size="40px" style={{ margin: 10 }} />
        <BiHomeAlt
          color="#222427"
          size="35px"
          style={{ margin: 15 }}
          onMouseEnter={({ target }) => (target.style.color = "#4aa0eb")}
          onMouseLeave={({ target }) => (target.style.color = "#222427")}
        />
        <BiSearch
          color="#222427"
          size="35px"
          style={{ margin: 15 }}
          onMouseEnter={({ target }) => (target.style.color = "#4aa0eb")}
          onMouseLeave={({ target }) => (target.style.color = "#222427")}
        />
        <BiUser
          color="#222427"
          size="35px"
          style={{ margin: 15 }}
          onMouseEnter={({ target }) => (target.style.color = "#4aa0eb")}
          onMouseLeave={({ target }) => (target.style.color = "#222427")}
        />
        <PostButton
          style={{ margin: 15 }}
          onMouseEnter={({ target }) =>
            (target.style.backgroundColor = "#2980b9")
          }
          onMouseLeave={({ target }) =>
            (target.style.backgroundColor = "#4aa0eb")
          }
        >
          <BiPen color="#ffffff" size="35px" />
        </PostButton>
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
  align-items: center;
`;

const PostButton = styled.div`
  background-color: #4aa0eb;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
