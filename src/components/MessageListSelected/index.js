import React, { useEffect, useState, useContext, useRef } from "react";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";
import chatData from "../../assets/dummy-data/Chats.js";

import "./MessageList.css";
import { AppContext } from "../../context/AppProvider";
import { Alert } from "antd";
import { ChatRoom, Message as MessageModel, ChatRoomUser } from "../../models";
import { DataStore, SortDirection, Auth } from "aws-amplify";
import {
  InfoCircleTwoTone,
  PhoneOutlined,
  PhoneTwoTone,
} from "@ant-design/icons";
import InfoGroup from "../Modals/InfoGroup";
import EmojiPicker from "emoji-picker-react";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
const MY_USER_ID = "apple";

function MessageListSelected() {
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [render, setRender] = useState(false);
  const {
    selectedRoomId,
    setIsModalOpenGroup,
    isEmojiPickerOpen,
    RenderContent,
  } = useContext(AppContext);
  const [messageEmoji, setMessageEmoji] = useState("");
  const scrollRef = useRef();

  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === selectedRoomId)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(fetchedUsers);

    const authUser = await Auth.currentAuthenticatedUser();
    setUser(
      fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
    );
  };

  useEffect(() => {
    fetchChatRoom();
    fetchUsers();
  }, [selectedRoomId, RenderContent]);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      const chatRoom = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === currentUser.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatRoom);
      setChatRoom(chatRoom);
    };
    setChatRoom(chatRoom);
    fetchChatRooms();
  }, []);
  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "INSERT") {
        //apend new message to existing messages
        setMessages((existingMessages) => [msg.element, ...existingMessages]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // useEffect(() => {

  // }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchChatRoom = async () => {
    if (!selectedRoomId) {
      console.warn("No chatroom id received");
      return;
    }
    const chatRooms = await DataStore.query(ChatRoom, selectedRoomId);

    if (!chatRooms) {
      console.error("No chatroom found with this id");
    } else {
      setChatRoom(chatRooms);
      console.log(chatRooms);
    }
  };

  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }
    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom?.id),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );
    console.log(fetchedMessages);
    setMessages(fetchedMessages);
  };
  console.log(selectedRoomId);
  // console.log(messages);
  // console.log(chatRoom);
  const pickEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setMessageEmoji((currentMessage) => currentMessage + emojiData.emoji);
  };

  const OpenVideoCall = async () => {
    const user = await Auth.currentAuthenticatedUser();
    await DataStore.save(
      new MessageModel({
        content: "Video Call",
        userID: user.attributes.sub,
        chatroomID: selectedRoomId,
      })
    );
    window.open(
      "https://webrtc-video-room.herokuapp.com/r/64371264",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="message-list">
      <Toolbar
        // title={chatRoom?.name || user?.name}
        rightItems={[
          <InfoCircleTwoTone
            key="info"
            onClick={() => {
              setIsModalOpenGroup(true);
            }}
            style={{
              fontSize: 32,
              alignItems: "center",
              display: "flex",
              marginLeft: 11,
              marginRight: 30,
            }}
          />,
          <PhoneTwoTone
            key="info"
            onClick={() => {
              OpenVideoCall();
            }}
            style={{
              fontSize: 32,
              alignItems: "center",
              display: "flex",
              marginLeft: 11,
              marginRight: 30,
            }}
          />,
        ]}
        leftItems={[
          <AmplifyS3Image
            imgKey={user?.imageUri || null}
            style={{ "--height": "50px", "--width": "50px" }}
          />,
          <h1 className="toolbar-title">{chatRoom?.name || user?.name}</h1>,
        ]}
      />
      <div className="chatbox">
        <div className="message-list-container">
          {messages.map((messItem) => (
            <div key={messItem.id} ref={scrollRef}>
              {/* {moment(messItem.createdAt).format("dddd, MMMM Do, h:mm:ss a")} */}
              <Message data={messItem}></Message>
            </div>
          ))}
        </div>
      </div>

      <Compose
        chatRoom={chatRoom}
        messageEmoji={messageEmoji}
        leftItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />,
        ]}
        rightItems={[<ToolbarButton key="photo" icon="ion-ios-send" />]}
        // messageEmoji={messageEmoji}
      ></Compose>
      {isEmojiPickerOpen && (
        <div style={{ bottom: 60, position: "sticky" }}>
          <EmojiPicker
            autoFocusSearch={false}
            width="30%"
            onEmojiClick={pickEmoji}
          />
        </div>
      )}
      <InfoGroup />
    </div>
  );
}

export default MessageListSelected;
