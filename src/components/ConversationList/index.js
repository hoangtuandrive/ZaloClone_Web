import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';


import {AppContext} from '../../context/AppProvider';
import {LoginOutlined } from '@ant-design/icons';
import { Button } from "antd";

import './ConversationList.css';

export default function ConversationList(props) {
  // const [conversations, setConversations] = useState();
  const {setIsModalOpen} =  React.useContext(AppContext);
  const handleInfouser = () =>{
    setIsModalOpen(true);
  }
  const conversations = [
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
      id: 1,
      name: "Thuan",
      text: "Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World",
      active: true,
      isOnline: true,
    },
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
      id: 2,
      name: "Lo",
      text: "Hello World",
      active: false,
      isOnline: false,
    },
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
      id: 3,
      name: "Joran",
      text: "Hello World",
      active: false,
      isOnline: false,
    },
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
      id: 4,
      name: "Joren",
      text: "Hello World",
      active: false,
      isOnline: true,
    },
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
      id: 5,
      name: "Outa",
      text: "Hello World",
      active: false,
      isOnline: false,
    },
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
      id: 6,
      name: "Gole",
      text: "Hello World",
      active: false,
      isOnline: true,
    },
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
      id: 7,
      name: "Akzac",
      text: "Hello World",
      active: false,
      isOnline: true,
    },
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
      id: 8,
      name: "Anna",
      text: "Hello World",
      active: false,
      isOnline: false,
    },
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
      id: 9,
      name: "Dra",
      text: "Hello World",
      active: false,
      isOnline: true,
    },
    {
      image:
        "http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png",
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
            // <ToolbarButton key="cog" icon="ion-ios-cog" onClick={handleInfouser} />
            
            <Button key="cog" onClick={handleInfouser}>Đăng Nhập<LoginOutlined /> </Button>
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