import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem/ItemConversationList';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';

import './ContactList.css';

import {User} from '../../models';
import { Auth, DataStore} from "aws-amplify";
import ContactListItem from '../ContactListItem/ItemContactList';
export default function ContactList(props) {
 

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const fetchUserList = async () => {
 
      const GetUser = (await DataStore.query(User))
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
             <ToolbarButton key="cog" icon="ion-ios-cog"  />
            
            // <Button key="cog" onClick={handleInfouser}>Đăng Nhập<LoginOutlined /> </Button>
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <ContactListItem
              key={conversation.id}
              data={conversation}
            />
          )
        }
      </div>
    );
}