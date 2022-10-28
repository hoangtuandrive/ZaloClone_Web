import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem/ItemConversationList";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import "./ConversationList.css";
import { AppContext } from "../../context/AppProvider";
import { User, ChatRoomUser, ChatRoom, Message } from "../../models";
import { Auth, DataStore } from "aws-amplify";
import MessageList from "../MessageList";
export default function ConversationList(props) {
  const { setIsModalOpen } = React.useContext(AppContext);
  const [users, setUsers] = useState([]);
  const handleInfouser = () => {
    setIsModalOpen(true);
  };

  const { setSelectedRoomId } = React.useContext(AppContext);
  const [chatRooms, setChatRooms] = useState([]);
  // const {setSelectedRoomId} = React.useContext(AppContext);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === currentUser.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatRoom);
      setChatRooms(chatRooms);
    };
    setChatRooms(chatRooms);
    fetchChatRooms();
    console.log(chatRooms);
  }, []);

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[
          // <ToolbarButton key="cog" icon="ion-ios-cog" onClick={handleInfouser} />
          <UserOutlined
            key="cog"
            onClick={handleInfouser}
            className="toolbar-button user"
          />,
        ]}
        rightItems={[
          <PlusCircleOutlined
            key="cog"
            // onClick={handleInfouser}
            className="toolbar-button add"
          />,
        ]}
      />
      <ConversationSearch />
      {chatRooms.map((conversation) => (
         <div key={conversation.id} onClick={()=>setSelectedRoomId(conversation.id)}>
          <ConversationListItem key={conversation.id} data={conversation}/> 
       </div>
      ))}
    </div>
  );
}
