import React, { useEffect } from "react";
import { authService, dbService } from "fbase";

export default ({ userObj }) => {
  //   const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    // history.push("/");
  };

  const getMyKweets = async () => {
    const kweets = await dbService
      .collection("kweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(kweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyKweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
