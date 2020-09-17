import React, { useState } from "react";
import styled from "styled-components";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePicture, AiFillDelete } from "react-icons/ai";

const KweetFactory = ({ userObj }) => {
  const [kweet, setKweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [pictureOver, setPictureOver] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const date = new Date();
    const kweetObj = {
      text: kweet,
      createdMonth: date.getMonth() + 1,
      createdDay: date.getDate(),
      createdHours: date.getHours(),
      createdMinutes: date.getMinutes(),
      creatorId: userObj.uid,
      creatorName: userObj.displayName,
      attachmentUrl,
    };
    await dbService.collection("kweets").add(kweetObj);
    setKweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const clearAttachmentClick = () => setAttachment(null);

  return (
    <Holder onSubmit={onSubmit}>
      <Profile src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/08/shutterstock-illustrator-flat-character-design-steve-guttenberg.jpg" />
      <Content>
        {/* <KweetHolder> */}
        <KweetInput
          value={kweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        {attachment && (
          <AttachmentPreivew>
            <PreviewImage src={attachment} />
            <ClearButton onClick={clearAttachmentClick}>
              <AiFillDelete color="#ffffff" size={20} />
            </ClearButton>
          </AttachmentPreivew>
        )}
        <Menu>
          <>
            <label
              htmlFor="picture"
              style={{ position: "relative" }}
              onMouseEnter={() => setPictureOver(true)}
              onMouseLeave={() => setPictureOver(false)}
            >
              <AiOutlinePicture size={30} color="#4aa0eb" />
              {pictureOver && <PictureOverAnimation />}
            </label>
            <input
              id="picture"
              type="file"
              accept="image/*"
              onChange={onFileChange}
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                border: 0,
              }}
            />
          </>
          <KweetButton type="submit" value="Kweet" />
        </Menu>
        {/* </KweetHolder> */}
      </Content>
    </Holder>
  );
};
export default KweetFactory;

const Holder = styled.form`
  width: 100%;
  border-bottom: 7px solid lightgray;
  display: flex;
  flex-direction: row;
`;

const Profile = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  margin: 10px;
`;

const Content = styled.div`
  margin: 10px;
  width: 100%;
`;

const KweetInput = styled.input`
  border: none;
  width: 90%;
  font-size: 20px;
  &:focus {
    outline: none !important;
  }
`;

const Menu = styled.div`
  height: 50px;
  width: 90%;
  border-top: 1px solid lightgray;
  margin-top: 10px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PictureOverAnimation = styled.div`
  position: absolute;
  bottom: -2px;
  left: -5px;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #4aa0eb;
  opacity: 0.2;
`;

const AttachmentPreivew = styled.div`
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
`;

const ClearButton = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 150);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KweetButton = styled.input`
  height: 45px;
  width: 65px;
  border: none;
  border-radius: 25px;
  background-color: #4aa0eb;
  color: white;
  font-size: 15px;
`;
