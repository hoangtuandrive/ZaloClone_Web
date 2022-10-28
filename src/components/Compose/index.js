import React, {useState} from "react";
import "./Compose.css";
import { Button } from "antd";
import { ChatRoomUser, Message, ChatRoom } from "../../../src/models";
import { Auth, DataStore } from "aws-amplify";

export default function Compose(props) {
  // console.log("Right", props);
  console.log("chatroom", {props});
  const [message, setMessage] = useState("");

  // console.log("alo", props.data.id);

  const saveNewMessage = async () => {
    // get all the users of this chatroom
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: props.data.id,
      })
    );
    updateLastMessage(newMessage);

    setMessage("");
  };

  const updateLastMessage = async (newMessage) => {
    DataStore.save(
      ChatRoom.copyOf(props.data, (updatedChatRoom) => {
        updatedChatRoom.newMessages = 1;
        updatedChatRoom.LastMessage = newMessage;
      })
    );
  };



  const onPress = () => {
      saveNewMessage();
  };


  return (
    <div className="compose">
      <div className="left-button"> {props.leftItems} </div>
      <div className="container">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          spellCheck="false"
        />
        <div className="right-button" onClick={() => console.log("send")}>
          <Button type="primary" className="btnSend" onClick={onPress}>Send</Button>
        </div>
      </div>
    </div>
  );
}
