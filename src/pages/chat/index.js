import React from "react";
import ConversationList from "../../components/ConversationList/ConversationList";
import MessageList from "../../components/MessageList";
import Slidebar from "../../components/Slidebar";
import "./Messenger.css";
import InfoUserModal from "../../components/Modals/InfoUserModal";

export default function Messenger(props) {
  return (
    <div className="messenger">
      <div className="slidebar">
        <Slidebar />
      </div>
      <div className="scrollable sidebar">
        <ConversationList />
      </div>
      <div className="content">
        <MessageList />
      </div>
    </div>
  );
}
