import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Kweet from "components/Kweet";
import KweetFactory from "components/KweetFactory";
import Navigator from "components/Navigator";
import styled from "styled-components";

const Home = ({ userObj }) => {
  const [kweets, setKweets] = useState([]);

  useEffect(() => {
    dbService.collection("kweets").onSnapshot((snapshot) => {
      const kweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKweets(kweetArray);
    });
  }, []);

  return (
    <Holder>
      <Navigator />
      <Main>
        <KweetFactory userObj={userObj} />
        <div>
          {kweets.map((kweet) => (
            <Kweet
              key={kweet.id}
              kweetObj={kweet}
              isOwner={kweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </Main>
      <RightBlank />
    </Holder>
  );
};
export default Home;

const Holder = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Main = styled.div`
  height: 100%;
  width: 600px;
  min-width: 600px;
  background-color: white;
`;

const RightBlank = styled.div`
  height: 100%;
  width: 100%;
  border-left: 1px solid lightgray;
  background-color: white;
`;
