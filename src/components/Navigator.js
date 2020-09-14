import React from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";

const Navigator = () => {
  return (
    <Bar>
      <FaTwitter />
    </Bar>
  );
};
export default Navigator;

const Bar = styled.div`
  height: 100%;
  width: 100%;
  /* max-width: 30%;
  min-width: 20%; */
  background-color: red;
`;
