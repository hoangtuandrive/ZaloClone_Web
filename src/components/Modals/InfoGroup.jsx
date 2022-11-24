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
  const { isModalOpenGroup, setIsModalOpenGroup, selectedRoomId,setRenderContent,RenderContent } =
    useContext(AppContext);
  const [allUsers, setAllUsers] = useState([]);
  const [chatRoom, setChatRoom] = useState();
  const [roomName, setRoomName] = useState("");
  const [render, setRender] = useState(false);
  useEffect(() => {
    fetchUsers();
    fetchChatRoom();
  }, [selectedRoomId,render]);

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
        
        setRender(!render);
        setRenderContent(!RenderContent);
      }
      else{
        return;
      }
      
    }
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
  const confirmChangeAdmin = async (user) => {
    // check if Auth user is admin of this group
    const authData = await Auth.currentAuthenticatedUser();
    if (chatRoom?.Admin?.id !== authData.attributes.sub) {
      alert("You are not the admin of this group");
      return;
    }

    else if (user.id === chatRoom?.Admin?.id) {
      alert("You are the admin");
      return;
    }
    else{
      let result = window.confirm('Are you sure you want to change admin ?');
      if(result){
        changeAdmin(user);
      }
      else{
        return;
      }
    }
    
    setRender(!render);
  };
  const changeAdmin = async (user) => {
    const changeAdmin = await DataStore.save(
      ChatRoom.copyOf(chatRoom, (updatedAdmin) => {
        updatedAdmin.Admin.id = user.id;
      })
    );
    console.log("Change admin");
    console.log(changeAdmin);
    setRenderContent(!RenderContent);
  };

  const changRoomName = async () => {
    // check if Auth user is admin of this group
    const authData = await Auth.currentAuthenticatedUser();
    if (chatRoom?.Admin?.id !== authData.attributes.sub) {
      alert("You are not the admin of this group");
      return;
    }
    var ten=prompt("Change Room Name:");
    if(ten===""){
      console.log(ten);
    }
    else{
        // setRoomName(ten);
      console.log("changeRoomName1");
      DataStore.save(
        ChatRoom.copyOf(chatRoom, (updatedName) => {
          updatedName.name = ten;  
        })
      );
      console.log("changeRoomName: ",ten);
       setRenderContent(!RenderContent);
      // RenDer();
      setRender(!render);
    
    }  
  };
  // function RenDer(){
  //     const subscription = DataStore.observe(ChatRoom).subscribe((msg) => {
  //       console.log(msg.model, msg.opType, msg.element);
  //       if (msg.model === ChatRoom && msg.opType === "UPDATE"){
  //         //apend new message to existing messages
  //         console.log("asd");
  //         console.log(RenderContent);
  //         setRenderContent(!RenderContent);
  //       }
  //     });
  //     return () => subscription.unsubscribe(); 
  // }
  const deleteRoom = async () => {
    const authData = await Auth.currentAuthenticatedUser();
    if (chatRoom?.Admin?.id !== authData.attributes.sub) {
      alert("You are not the admin of this group");
      return;
    }
    console.log("deleteRoom1");
    const toDelete = await DataStore.query(ChatRoom, chatRoom.id);
    await DataStore.save(
      ChatRoom.copyOf(toDelete, (updatedChatRoom) => {
        updatedChatRoom.name = "Deleted";
      })
    );
    console.log("deleteRoom");
    setRender(!render);
    setRenderContent(!RenderContent);
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
          <div className={cx("contentG scrollG")}>
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
                  <div className="admin"> 
                    <UserSwitchOutlined
                      style={{ fontSize: 28 }}
                      onClick={()=>{
                        confirmChangeAdmin(item)
                      }}
                    />
                  
                      <UserDeleteOutlined style={{ fontSize: 28 }} onClick={()=>{confirmDelete(item)}}  />
                 
                   
                  </div>
                </div>
              );
            })}
          </div>
          <div className={cx("button")}>
            <Button type="primary" onClick={() => changRoomName()}>Change Group Name</Button>
            <Button
              type="primary"
              style={{ marginLeft: 20, backgroundColor: "red" }}
              onClick={() => deleteRoom()}
            >
              Delete Group
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default InfoGroup;
