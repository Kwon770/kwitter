import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";

export default ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update" />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
