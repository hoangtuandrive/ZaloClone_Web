import React, { useState } from "react";
import ConversationList from "../../components/ConversationList";
import MessageList from "../../components/MessageList";
import { Layout, Menu } from "antd";
import "./Messenger.css";
import {
  UserOutlined,
  CommentOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Chat", "1", <CommentOutlined />),
  getItem("Contact", "2", <UserOutlined />),
  getItem("Profile", "3", <LogoutOutlined />),
];

export default function Messenger(props) {
  const [chatHeads, setChatHeads] = useState([]);
  const [receiver, setReceiver] = useState(null);

  return (
    <Layout>
      {/* <Sider>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider> */}
      <Content>
        <div className="messenger">
          <div className="scrollable sidebar">
            <ConversationList />
          </div>
          <div className="scrollable content">
            <MessageList />
          </div>
        </div>
      </Content>
    </Layout>
  );
}
