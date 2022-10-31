import React, { useContext, useEffect ,useState } from "react";
import { Modal,Alert } from "antd";
import { AppContext } from "../../context/AppProvider";
import styles from "./GroupInfo.modulo.scss";
import { Auth, DataStore } from "aws-amplify";
import classNames from "classnames/bind";
import { ChatRoom, User, ChatRoomUser } from "../../../src/models";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";

import { Button,Popconfirm } from "antd";
import { UserDeleteOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";

const cx = classNames.bind(styles);
function InfoGroup() {
  const { isModalOpenGroup, setIsModalOpenGroup, selectedRoomId } =
    useContext(AppContext);
  const [allUsers, setAllUsers] = useState([]);
  const [chatRoom, setChatRoom] = useState();

  useEffect(() => {
    fetchUsers();
    fetchChatRoom();
  }, [selectedRoomId]);

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
 
  const confirmDelete = async (user) => {
  
    // check if Auth user is admin of this group
    const authData = await Auth.currentAuthenticatedUser();
    if (chatRoom?.Admin?.id !== authData.attributes.sub) {
      alert("You are not the admin of this group");
       return;
    }
    else if (user.id === chatRoom?.Admin?.id) {
      alert("You are the admin, you cannot delete yourself");
      console.log(chatRoom.Admin.id);
       return;
    } 
    else{
      
      let result = window.confirm('Are you sure you want to delete?');
      if(result){
        deleteUser(user);
      }
      else{
        return;
      }
      
    }
    // alert(            
    //     "Confirm delete",
    //    `Are you sure you want to delete ${user.name} from the group`, 
    //   [
    //     {
    //       title: "Delete",
    //       onclick: () => deleteUser(user),
    //       style: "destructive",
    //     },
    //     {
    //       text: "Cancel",
    //     },
    //   ]
    // );
  };
  const deleteUser = async (user) => {
    const chatRoomUsersToDelete = await (
      await DataStore.query(ChatRoomUser)
    ).filter(
      (cru) => cru.chatRoom.id === chatRoom?.id && cru.user.id === user.id
    );

    console.log(chatRoomUsersToDelete);

    if (chatRoomUsersToDelete.length > 0) {
      await DataStore.delete(chatRoomUsersToDelete[0]);

      setAllUsers(allUsers.filter((u) => u.id !== user.id));
    }
  };
  // console.log(chatRoom);
const Xoa= ()=>{
  const modal= Modal.info();
  modal.update({
    title:'A',  
    
  })
}
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
                  
                  </div>
                  <div>
                    {/* <UserSwitchOutlined
                      style={{ fontSize: 28, marginLeft: 20, marginRight: 10 }}
                    /> */}
                  
                      <UserDeleteOutlined style={{ fontSize: 28 }} onClick={()=>{confirmDelete(item)}}  />
                 
                   
                  </div>
                </div>
              );
            })}
          </div>
          <div className={cx("button")}>
            <Button type="primary" onClick={Xoa}>Change Group Name</Button>
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
