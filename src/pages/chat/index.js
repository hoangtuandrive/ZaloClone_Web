import React from 'react';
import ConversationList from '../../components/ConversationList';
import ChatContent from '../../components/chatContent/ChatContent';
// import MessageList from '../MessageList';
import './Messenger.css';

export default function Messenger(props) {
    return (
      <div className="messenger">

        <div className="scrollable sidebar">
          <ConversationList />
        </div>

        <div className="scrollable content">
        <ChatContent />
        </div>
      </div>
    );
}