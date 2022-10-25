import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem/ItemConversationList';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';

import './ConversationList.css';
import {User, ChatRoomUser, ChatRoom , Message } from '../../models';
import { Auth, DataStore} from "aws-amplify";
export default function ConversationList(props) {
 

  // const conversations = [
  //   {
  //     image:
  //       "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
  //     id: 1,
  //     name: "Thuan",
  //     text: "Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World",
  //     active: true,
  //     isOnline: true,
  //   }
  // ];

  // const [conversations, setConversations] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === currentUser.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatRoom);
      // const chatRooms=(await DataStore.query(ChatRoomUser));
 
      setChatRooms(chatRooms);
    };
    fetchChatRooms();
    console.log(chatRooms);
  }, []);
    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
             <ToolbarButton key="cog" icon="ion-ios-cog"  />
            
            // <Button key="cog" onClick={handleInfouser}>Đăng Nhập<LoginOutlined /> </Button>
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        {console.log(chatRooms)}
        <ConversationSearch />
        {
          chatRooms.map(conversation =>
            <ConversationListItem
              key={conversation.id}
              data={conversation}
            />
          )
        }
      </div>
    );
}