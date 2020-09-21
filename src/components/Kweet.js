import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import styled from "styled-components";

const Kweet = ({ kweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this kweet");
    if (ok) {
      await dbService.doc(`kweets/${kweetObj.id}`).delete();
      await storageService.refFromURL(kweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`kweets/${kweetObj.id}`).update({
      text: newKweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewKweet(value);
  };

  return (
    <Holder>
      <Profile src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/08/shutterstock-illustrator-flat-character-design-steve-guttenberg.jpg" />
      <Content>
        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Edit your kweet"
                onChange={onChange}
                value={newKweet}
                required
              />
              <input type="submit" value="Update" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        ) : (
          <>
            <ContentBar>
              <CreatorName>{kweetObj.creatorName}</CreatorName>
              <CreatorId>{`∙ @${kweetObj.creatorId} ∙`}</CreatorId>
              <Timestamp>
                {`${kweetObj.createdMonth}월${kweetObj.createdDay}일 ${
                  parseInt(kweetObj.createdHours) < 10
                    ? "0" + kweetObj.createdHours
                    : kweetObj.createdHours
                }:${
                  parseInt(kweetObj.createdMinutes) < 10
                    ? "0" + kweetObj.createdMinutes
                    : kweetObj.createdMinutes
                }`}
              </Timestamp>
            </ContentBar>
            <ContentText>{kweetObj.text}</ContentText>
            {kweetObj.attachmentUrl && (
              <AttachmentPreivew>
                <PreviewImage src={kweetObj.attachmentUrl} />
              </AttachmentPreivew>
            )}
            {isOwner && (
              <>
                <button onClick={onDeleteClick}>Delete</button>
                <button onClick={toggleEditing}>Edit</button>
              </>
            )}
          </>
        )}
      </Content>
    </Holder>
  );
};

export default Kweet;

const Holder = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
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

const ContentBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CreatorName = styled.h2`
  font-weight: 600;
  font-size: 16px;
  color: black;
  margin-right: 5px;
`;

const CreatorId = styled.h5`
  color: #657685;
  margin-right: 5px;
`;

const Timestamp = styled.h5`
  color: #657685;
  margin-right: 5px;
`;

const ContentText = styled.div``;

const AttachmentPreivew = styled.div`
  position: relative;
  margin: 10px 0px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
`;
