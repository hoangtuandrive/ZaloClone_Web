import React, { useEffect, useState, useContext } from "react";
import "./Compose.css";
import { Button } from "antd";
import { ChatRoomUser, Message, ChatRoom } from "../../models";
import { Auth, DataStore } from "aws-amplify";
import { AppContext } from "../../context/AppProvider";
import ToolbarButton from "../ToolbarButton";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { FrownTwoTone } from "@ant-design/icons";
import Emoji from "../Emoji/Emoji";
export default function Compose(props) {
  // console.log("Right", props);
  console.log("chatroom", { props });
  const [message, setMessage] = useState("");
  useEffect(() => {
    setMessage(props.messageEmoji);
  }, [props.messageEmoji]);

  const { selectedRoomId, setIsEmojiPickerOpen } = useContext(AppContext);
  // const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState();

  // console.log("alo", props.data.id);

  // console.log(props.chatRoom);
  const saveNewMessage = async () => {
    // get all the users of this chatroom
    const user = await Auth.currentAuthenticatedUser();
    const newMessage = await DataStore.save(
      new Message({
        content: message,
        userID: user.attributes.sub,
        chatroomID: selectedRoomId,
      })
    );
    updateLastMessage(newMessage);

    setMessage("");
    setIsEmojiPickerOpen(false);
  };

  const updateLastMessage = async (newMessage) => {
    DataStore.save(
      ChatRoom.copyOf(props.chatRoom, (updatedChatRoom) => {
        updatedChatRoom.newMessages = 1;
        updatedChatRoom.LastMessage = newMessage;
      })
    );
  };

  const onPress = () => {
    saveNewMessage();
  };

  // const pickEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
  //   setMessage(currentMessage => currentMessage + emojiData.emoji)

  // }

  // console.log(props.leftItems);

  return (
    <div className="compose">
      {/* <div className="left-button"> {props.leftItems.} </div> */}
      <div className="left-button">
        <ToolbarButton key="photo" icon="ion-ios-camera" />
        <ToolbarButton key="image" icon="ion-ios-image" />
        <ToolbarButton key="audio" icon="ion-ios-mic" />

        {/* <div onClick={() =>
              setIsEmojiPickerOpen(currentValue => !currentValue)
              }>
                    <ToolbarButton key="emoji" icon="ion-ios-happy">

                 </ToolbarButton> 
                    </div> */}
        <FrownTwoTone
          onClick={() => setIsEmojiPickerOpen((currentValue) => !currentValue)}
          style={{
            fontSize: 24,
            alignItems: "center",
            display: "flex",
            marginLeft: 11,
          }}
        />

        {/* { isEmojiPickerOpen && (
             
             <EmojiPicker 
     autoFocusSearch={false}
     width="100%"
     onEmojiClick={pickEmoji}
    
    //  emojiStyle={EmojiStyle.APPLE}
    //  size={22}
      />
  
    
    )}         */}
      </div>
      <div className="container">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          spellCheck="false"
        />

        <div className="right-button" onClick={onPress}>
          {/* <Button type="primary" className="btnSend" onClick={onPress} >Send</Button> */}
          {props.rightItems}
        </div>
      </div>
    </div>
  );
}
