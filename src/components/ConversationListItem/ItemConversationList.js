import React, {useEffect,useState} from 'react';


import './ConversationListItem.css';
import { ChatRoom,User,ChatRoomUser,Message } from '../../models';
import { Auth, DataStore } from "aws-amplify";
import { Spin } from 'antd';
// import moment from "moment";
export default function ConversationListItem(props) {
  // useEffect(() => {
  //   shave('.conversation-snippet', 20);
  // })
  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedChatRoomUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatRoom.id === props.data.id)
        .map((chatRoomUser) => chatRoomUser.user);
      console.log(fetchedChatRoomUsers);

      // setUsers(fetchedChatRoomUsers);

      //Find other user from current user in that chat room
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedChatRoomUsers.find(
          (user) => user.id !== authUser.attributes.sub
        ) || null
      );
    };
    fetchUsers();
  }, []);

 //get last message from that chatroom, query by id
 useEffect(() => {
  if (!props.data.chatRoomLastMessageId) {
    return;
  }
  DataStore.query(Message, props.data.chatRoomLastMessageId).then(
    setLastMessage
  );
}, []);

 //Loading
 if (!user) {
  return (
    <Spin
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    />
  );
}

  //get time
  // const time = moment(lastMessage?.createdAt).from(moment());

    // const { imageUri, name, text } = props.data;

    return (
      <div className="conversation-list-item">
        <img className="conversation-photo" src={props.data.imageUri || user?.imageUri} alt="placeholder" />
        <div className="conversation-info">
          <h1 className="conversation-title">{props.data.name || user?.name  }</h1>
          <p className="conversation-snippet">{lastMessage?.content}</p>
          {/* {console.log(user)} */}
        </div>
      </div>
    );
}