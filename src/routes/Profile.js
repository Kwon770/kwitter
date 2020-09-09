import React from "react";
import { authService } from "fbase";

export default () => {
  //   const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    // history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
