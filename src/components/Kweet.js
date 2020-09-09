import React from "react";

const Kweet = ({ kweetObj, isOwner }) => (
  <div>
    <h4>{kweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete</button>
        <button>Edit</button>
      </>
    )}
  </div>
);

export default Kweet;
