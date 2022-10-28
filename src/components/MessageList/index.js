import React, { useEffect, useState, useContext } from "react";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";
import chatData from "../../assets/dummy-data/Chats.js";
import { ChatRoom, Message as MessageModel, ChatRoomUser } from "../../models";
import { DataStore, SortDirection, Auth } from "aws-amplify";
import { Alert } from "antd";
import "./MessageList.css";
import { Spin } from "antd";
import { AppContext } from "../../context/AppProvider";

const MY_USER_ID = "apple";

export default function MessageList(props) {
  const [messages, setMessages] = useState([]);
  // const [messageTest, setMessageTest] = useState<MessageModel>([]);
  //  const {setSelectedRoomId} = React.useContext(AppContext);
  const [chatRoom, setChatRoom] = useState(null);
  const { selectedRoomId } = useContext(AppContext);
  // useEffect(() => {
  //   const fetchChatRooms = async () => {
  //     const currentUser = await Auth.currentAuthenticatedUser();
  //     const chatRoom = (await DataStore.query(ChatRoomUser))
  //       .filter(
  //         (chatRoomUser) => chatRoomUser.user.id === currentUser.attributes.sub
  //       )
  //       .map((chatRoomUser) => chatRoomUser.chatRoom);
  //     setChatRoom(chatRoom);
  //   };
  //   setChatRoom(chatRoom);
  //   fetchChatRooms();
  // }, []);
  
  console.log("test", chatRoom);
  // console.warn("Displaying chat room: ",route.params?.id);


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
    if (!chatRoom.id) {
      console.warn("No chatroom id received");
      return;
    }
    const chatRooms = await DataStore.query(ChatRoom, chatRoom.id);
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
    setMessages(fetchedMessages);
  };

  if (!chatRoom) {
    return <Spin></Spin>;
  }



  // useEffect(() => {
  //   // console.log("mess props", props);
  //   getMessages();
  // }, []);

  // const getMessages = () => {
  //   var tempMessages = [
      // {
      //   id: 1,
      //   author: "apple",
      //   message:
      //     "Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
      // {
      //   id: 2,
      //   author: "orange",
      //   message:
      //     "Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
      // {
      //   id: 3,
      //   author: "orange",
      //   message:
      //     "Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
      // {
      //   id: 4,
      //   author: "apple",
      //   message: "Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
      // {
      //   id: 5,
      //   author: "apple",
      //   message: "Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
      // {
      //   id: 6,
      //   author: "apple",
      //   message: "Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
      // {
      //   id: 7,
      //   author: "orange",
      //   message: "Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
      // {
      //   id: 8,
      //   author: "orange",
      //   message: "Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
      // {
      //   id: 9,
      //   author: "apple",
      //   message: "Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
      // {
      //   id: 10,
      //   author: "orange",
      //   message: "Hello world! Hello world! Hello world!",
      //   timestamp: new Date().getTime(),
      // },
  //   ];
  //   setMessages([...messages, ...tempMessages]);
  // };

  // const renderMessages = () => {
  //   let i = 0;
  //   let messageCount = messages.length;
  //   let tempMessages = [];

  //   while (i < messageCount) {
  //     let previous = messages[i - 1];
  //     let current = messages[i];
  //     let next = messages[i + 1];
  //     let isMine = current.author === MY_USER_ID;
  //     let currentMoment = moment(current.timestamp);
  //     let prevBySameAuthor = false;
  //     let nextBySameAuthor = false;
  //     let startsSequence = true;
  //     let endsSequence = true;
  //     let showTimestamp = true;

  //     if (previous) {
  //       let previousMoment = moment(previous.timestamp);
  //       let previousDuration = moment.duration(
  //         currentMoment.diff(previousMoment)
  //       );
  //       prevBySameAuthor = previous.author === current.author;

  //       if (prevBySameAuthor && previousDuration.as("hours") < 1) {
  //         startsSequence = false;
  //       }

  //       if (previousDuration.as("hours") < 1) {
  //         showTimestamp = false;
  //       }
  //     }

  //     if (next) {
  //       let nextMoment = moment(next.timestamp);
  //       let nextDuration = moment.duration(nextMoment.diff(currentMoment));
  //       nextBySameAuthor = next.author === current.author;

  //       if (nextBySameAuthor && nextDuration.as("hours") < 1) {
  //         endsSequence = false;
  //       }
  //     }

  //     tempMessages.push(
  //       <Message
  //         key={i}
  //         isMine={isMine}
  //         startsSequence={startsSequence}
  //         endsSequence={endsSequence}
  //         showTimestamp={showTimestamp}
  //         data={current}
  //       />
  //     );

  //     // Proceed to the next message.
  //     i += 1;
  //   }

  //   return tempMessages;
  // };

  return (
    // <div className="message-list">
    //   <Toolbar
    //     title="Conversation Title"
    //     rightItems={[
    //       <ToolbarButton
    //         key="info"
    //         icon="ion-ios-information-circle-outline"
    //       />,
    //       <ToolbarButton key="video" icon="ion-ios-videocam" />,
    //       <ToolbarButton key="phone" icon="ion-ios-call" />,
    //     ]}
    //   />
    //   {messages.map((message) => (

    //       <div className="message-list-container">
    //         <Message key={message.id} data={message}/>
    //       </div>
    //   ))}
      
    //   {chatRoom.map((compose) => (
    //     <Compose key={compose.id} data={compose} 
    //     leftItems={[
    //       <ToolbarButton key="photo" icon="ion-ios-camera" />,
    //       <ToolbarButton key="image" icon="ion-ios-image" />,
    //       <ToolbarButton key="audio" icon="ion-ios-mic" />,
    //       <ToolbarButton key="emoji" icon="ion-ios-happy" />,
    //     ]}
    //     rightItems={[<ToolbarButton key="photo" icon="ion-ios-send" />]}
    //     />
    //   ))}
    //   {/* <Compose
    //     leftItems={[
    //       <ToolbarButton key="photo" icon="ion-ios-camera" />,
    //       <ToolbarButton key="image" icon="ion-ios-image" />,
    //       <ToolbarButton key="audio" icon="ion-ios-mic" />,
    //       <ToolbarButton key="emoji" icon="ion-ios-happy" />,
    //     ]}
    //     rightItems={[<ToolbarButton key="photo" icon="ion-ios-send" />]}
    //     chatRoom={chatRooms}
    //   /> */}
    // </div>


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
          {chatRoom.map((compose) => (
          <Compose key={compose.id} data={compose} 
         
            leftItems={[
              <ToolbarButton key="photo" icon="ion-ios-camera" />,
              <ToolbarButton key="image" icon="ion-ios-image" />,
              <ToolbarButton key="audio" icon="ion-ios-mic" />,
              <ToolbarButton key="emoji" icon="ion-ios-happy" />,
            ]}
            rightItems={[<ToolbarButton key="photo" icon="ion-ios-send" />]}
          />
          ))}
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
