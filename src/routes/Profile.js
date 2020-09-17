import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import Navigator from "components/Navigator";
import Kweet from "components/Kweet";

export default ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [myKweets, setMyKweets] = useState([]);

  //   const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    // history.push("/");
  };

  const getMyKweets = async () => {
    const kweets = await dbService
      .collection("kweets")
      .where("creatorId", "==", userObj.uid)
      // .orderBy("createdAt")
      .get();
    setMyKweets(kweets.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
      <Form onSubmit={onSubmit}>
        <Navigator />
        <Main>
          {/* <input
            type="text"
            placeholder="Display name"
            value={newDisplayName}
            onChange={onChange}
          />
          <input type="submit" value="Update" /> */}
          <Header>
            <BiArrowBack color="#4aa0eb" size={21} />
            <Holder>
              <Name>{userObj.displayName}</Name>
              <KweetCount>{`${myKweets.length} Kweet`}</KweetCount>
            </Holder>
          </Header>
          <MyProfile>
            <Wallpaper />
            <Information>
              <Name>{userObj.displayName}</Name>
              <Id>{`@${userObj.uid}`}</Id>
            </Information>
            <ProfileImage src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/08/shutterstock-illustrator-flat-character-design-steve-guttenberg.jpg" />
          </MyProfile>
          <Menu>
            <span>Kweets</span>
          </Menu>
          {myKweets.map((myKweet) => (
            <Kweet key={myKweet.id} kweetObj={myKweet} isOwner={true} />
          ))}
          <Divider />
        </Main>
        <RightBlank />
      </Form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

const Form = styled.form`
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

const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px;
`;

const Holder = styled.div`
  align-items: flex-start;
  margin-left: 35px;
`;

const Name = styled.h2`
  font-size: 17px;
  font-weight: 800;
`;

const Id = styled.h5`
  color: #657685;
  margin-right: 5px;
`;

const KweetCount = styled.h4`
  color: #657685;
`;

const MyProfile = styled.div`
  position: relative;
`;

const Wallpaper = styled.div`
  width: 100%;
  height: 200px;
  background-color: lightgray;
`;

const Information = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  padding-top: 65px;
  padding-left: 15px;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 110px;
  left: 15px;
  width: 135px;
  height: 135px;
  border-radius: 70px;
  border: 5px solid white;
`;

const Menu = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #4aa0eb;
  color: #4aa0eb;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 7px;
  background-color: lightgray;
`;
