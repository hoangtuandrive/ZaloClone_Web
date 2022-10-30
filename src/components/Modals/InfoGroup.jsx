import React, { useContext, useEffect } from "react";
import { Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
import styles from "./GroupInfo.modulo.scss";
import { Auth, DataStore } from "aws-amplify";
import { useState } from "react";
import classNames from "classnames/bind";
import { ChatRoom, User, ChatRoomUser } from "../../../src/models";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";
import ContactListItem from "../ContactListItem/ItemContactList";
import { Button } from "antd";
import { UserDeleteOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { fontSize } from "@mui/system";
const cx = classNames.bind(styles);
function InfoGroup() {
  const { isModalOpenGroup, setIsModalOpenGroup, selectedRoomId } =
    useContext(AppContext);
  const [allUsers, setAllUsers] = useState([]);
  const [chatRoom, setChatRoom] = useState();

  useEffect(() => {
    fetchUsers();
    fetchChatRoom();
  }, []);

  const handleOk = () => {
    setIsModalOpenGroup(false);
  };

  const handleCancel = () => {
    setIsModalOpenGroup(false);
  };

  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === selectedRoomId)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(fetchedUsers);
  };

  const fetchChatRoom = async () => {
    if (!selectedRoomId) {
      console.warn("No chatroom id provided");
      return;
    }
    const chatRoom = await DataStore.query(ChatRoom, selectedRoomId);
    if (!chatRoom) {
      console.error("Couldn't find a chat room with this id");
    } else {
      setChatRoom(chatRoom);
    }
    console.log(chatRoom);
  };
  return (
    <div className="container">
      <Modal
        title={chatRoom?.name}
        open={isModalOpenGroup}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className={cx("warap")}>
          <div className={cx("content")}>
            {allUsers.map((item) => {
              const isAdmin = chatRoom?.Admin?.id === item.id;
              return (
                <div className={cx("group-conversation-list-item")}>
                  <div className={cx("conversation-photo")}>
                    <AmplifyS3Image
                      imgKey={item.imageUri || item?.imageUri}
                      alt="placeholder"
                      style={{ "--height": "50px", "--width": "50px" }}
                    />
                  </div>
                  <div className={cx("conversation-info")}>
                    <h1 className={cx("conversation-title")}>
                      {item.name}
                      {isAdmin && <span> (Admin)</span>}
                    </h1>
                    <p className={cx("conversation-snippet")}>{item.text}</p>
                  </div>
                  <div>
                    {/* <UserSwitchOutlined
                      style={{ fontSize: 28, marginLeft: 20, marginRight: 10 }}
                    /> */}
                    <UserDeleteOutlined style={{ fontSize: 28 }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={cx("button")}>
            <Button type="primary">Change Group Name</Button>
            <Button
              type="primary"
              style={{ marginLeft: 20, backgroundColor: "red" }}
            >
              Delete Group
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// const GroupHeader = (chatRoom) => {
//   return (

//   )
// }

export default InfoGroup;
