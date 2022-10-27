import React, { useEffect, useState,useContext } from "react";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";
import chatData from "../../assets/dummy-data/Chats.js";

import "./MessageList.css";
import { AppContext } from "../../context/AppProvider";
import { Alert } from "antd";
import {ChatRoom,Message as MessageModel} from '../../models'
import { DataStore, SortDirection } from "aws-amplify";
const MY_USER_ID = "apple";

export default function MessageList(props) {
 
 // const [messages, setMessages] = useState([]);


  const message =[
      {
        id: 1,
        author: "apple",
        message:
          "1 Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!",
        timestamp: new Date().getTime(),
      },
      {
        id: 2,
        author: "orange",
        message:
          " 2 Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!",
        timestamp: new Date().getTime(),
      },
      {
        id: 3,
        author: "orange",
        message:
          " 3 Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!",
        timestamp: new Date().getTime(),
      }
    ];
  const { selectedRoomId } =useContext(AppContext);
 
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);   

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

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
      console.log(chatRoom.id);
      return;
    }
    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom.id),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );
    console.log(fetchedMessages);
    setMessages(fetchedMessages);
  };
  console.log(fetchMessages);
  console.log(selectedRoomId);
  console.log(messages);
  return (
  

    <div className="Wrapped">
    { selectedRoomId ? (
      
      <div className="message-list">
            <Toolbar
            title="Conversation Title"
            rightItems={[
              <ToolbarButton
                key="info"
                icon="ion-ios-information-circle-outline"
              />,
              <ToolbarButton key="video" icon="ion-ios-videocam" />,
              <ToolbarButton key="phone" icon="ion-ios-call" />,
            ]}
          />
          <div className="message-list-container"> {messages.map((messItem)=>(
            <Message key={messItem.id} data={messItem}>

            </Message>
          ))
           } </div>
          <Compose
            leftItems={[
              <ToolbarButton key="photo" icon="ion-ios-camera" />,
              <ToolbarButton key="image" icon="ion-ios-image" />,
              <ToolbarButton key="audio" icon="ion-ios-mic" />,
              <ToolbarButton key="emoji" icon="ion-ios-happy" />,
            ]}
            rightItems={[<ToolbarButton key="photo" icon="ion-ios-send" />]}
          />
         </div>
          
         ) : (  <Alert
           message='Hãy chọn phòng'
           type='info'
           showIcon
           style={{ margin: 5 }}
           closable
         />
         )}
          </div>
       
  );
}
