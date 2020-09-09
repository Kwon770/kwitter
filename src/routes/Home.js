import React, { useState } from "react";

const Home = () => {
  const [kweet, setKweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={kweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Kweet" />
      </form>
    </div>
  );
};
export default Home;
