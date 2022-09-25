import React from "react";
import ConversationList from "../../components/ConversationList";
import MessageList from "../../components/MessageList";
import "./Messenger.css";

export default function Messenger(props) {
  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList />
      </div>
      <div className="scrollable content">
        <MessageList />
      </div>
    </div>
  );
}
