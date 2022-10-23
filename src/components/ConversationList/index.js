import React, { useState, useEffect } from "react";
import ConversationSearch from "../ConversationSearch";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";

import { AppContext } from "../../context/AppProvider";
import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { User } from "../../models";
import { DataStore } from "aws-amplify";

import "./ConversationList.css";

export default function ConversationList(props) {
  const { setIsModalOpen } = React.useContext(AppContext);
  const [users, setUsers] = useState([]);
  const handleInfouser = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

  return (
    <div className="conversation-list">
      <Toolbar
        title="Messenger"
        leftItems={[
          // <ToolbarButton key="cog" icon="ion-ios-cog" onClick={handleInfouser} />
          <Button key="cog" onClick={handleInfouser}>
            Modal
            <LoginOutlined />{" "}
          </Button>,
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      <ConversationSearch />
      {users.map((conversation) => (
        <ConversationListItem key={conversation.id} data={conversation} />
      ))}
    </div>
  );
}
