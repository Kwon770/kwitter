import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Kweet from "components/Kweet";
import KweetFactory from "components/KweetFactory";

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
    <div>
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
    </div>
  );
};
export default Home;
