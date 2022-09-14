import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';


import './ConversationList.css';

export default function ConversationList(props) {
  // const [conversations, setConversations] = useState();
  
  const conversations = [
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 1,
      name: "Thuan",
      text: "Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World",
      active: true,
      isOnline: true,
    },
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 2,
      name: "Lo",
      text: "Hello World",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 3,
      name: "Joran",
      text: "Hello World",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 4,
      name: "Joren",
      text: "Hello World",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 5,
      name: "Outa",
      text: "Hello World",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 6,
      name: "Gole",
      text: "Hello World",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 7,
      name: "Akzac",
      text: "Hello World",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 8,
      name: "Anna",
      text: "Hello World",
      active: false,
      isOnline: false,
    },
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 9,
      name: "Dra",
      text: "Hello World",
      active: false,
      isOnline: true,
    },
    {
      image:
        "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
      id: 10,
      name: "Minh",
      text: "Hello World",
      active: false,
      isOnline: true,
    },
  ];

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.id}
              data={conversation}
            />
          )
        }
      </div>
    );
}