import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem/ItemConversationList";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/AppProvider";
import "./ContactList.css";

import { User } from "../../models";
import { Auth, DataStore } from "aws-amplify";
import ContactListItem from "../ContactListItem/ItemContactList";
export default function ContactList(props) {
  const [conversations, setConversations] = useState([]);
  const { setIsModalOpen } = React.useContext(AppContext);
  const [users, setUsers] = useState([]);
  const handleInfouser = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchUserList = async () => {
      const GetUser = await DataStore.query(User);
      console.log(GetUser);
      setConversations(GetUser);
    };
    fetchUserList();
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
      {conversations.map((conversation) => (
        <ContactListItem key={conversation.id} data={conversation} />
      ))}
    </div>
  );
}
