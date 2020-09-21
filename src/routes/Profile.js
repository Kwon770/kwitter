import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import styled from "styled-components";
import { BiArrowBack, BiPencil } from "react-icons/bi";
import Navigator from "components/Navigator";
import Kweet from "components/Kweet";
import { Link } from "react-router-dom";

export default ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [myKweets, setMyKweets] = useState([]);
  const [editProfile, SetEditProfile] = useState(false);

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

  const updateName = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
  };

  return (
    <Form>
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
          <Link to="/">
            <BiArrowBack color="#4aa0eb" size={21} />
          </Link>
          <Holder>
            <Name>{userObj.displayName}</Name>
            <KweetCount>{`${myKweets.length} Kweet`}</KweetCount>
          </Holder>
        </Header>
        <MyProfile>
          <Wallpaper />
          <Information>
            <div>
              {editProfile ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BiPencil
                    size={15}
                    color="#4aa0eb"
                    style={{ marginRight: 5 }}
                  />
                  <NameInput
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                    onChange={onChange}
                  />
                </div>
              ) : (
                <Name>{userObj.displayName}</Name>
              )}
              <Id>{`@${userObj.uid}`}</Id>
            </div>
            {editProfile ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  small
                  onMouseEnter={({ target }) =>
                    (target.style.backgroundColor = "#eaf4fd")
                  }
                  onMouseLeave={({ target }) =>
                    (target.style.backgroundColor = "#ffffff")
                  }
                  onClick={() => {
                    SetEditProfile(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  small
                  onMouseEnter={({ target }) =>
                    (target.style.backgroundColor = "#eaf4fd")
                  }
                  onMouseLeave={({ target }) =>
                    (target.style.backgroundColor = "#ffffff")
                  }
                  onClick={() => {
                    updateName();
                    SetEditProfile(false);
                  }}
                >
                  Complete
                </Button>
              </div>
            ) : (
              <Button
                onMouseEnter={({ target }) =>
                  (target.style.backgroundColor = "#eaf4fd")
                }
                onMouseLeave={({ target }) =>
                  (target.style.backgroundColor = "#ffffff")
                }
                onClick={() => {
                  SetEditProfile(true);
                }}
              >
                Edit profile
              </Button>
            )}
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
      <button onClick={onLogOutClick}>Log out</button>
    </Form>
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
  width: 100%;
`;

const Wallpaper = styled.div`
  width: 100%;
  height: 200px;
  background-color: lightgray;
`;

const Information = styled.div`
  width: 95%;
  height: 50px;
  background-color: white;
  padding: 0px 15px;
  padding-top: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const Button = styled.div`
  width: ${(props) => (props.small ? "80px" : "130px")};
  height: 40px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid #4aa0eb;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4aa0eb;
  margin-left: 10px;
`;

const NameInput = styled.input`
  width: 200px;
  height: 20px;
  border: none;
  font-size: 17px;
  font-weight: 800;
  color: #4aa0eb;
  &:focus {
    outline: none !important;
  }
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
