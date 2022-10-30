import React, { useContext, useEffect } from "react";
import { Modal } from "antd";
import { AppContext } from "../../context/AppProvider";
import styles from './GroupInfo.modulo.scss';
import { Auth, DataStore } from "aws-amplify";
import { useState } from "react";
import classNames from 'classnames/bind';
import {ChatRoomUser} from "../../../src/models";
import ContactListItem from "../ContactListItem/ItemContactList";
const cx = classNames.bind(styles);
function InfoGroup() {
    const { isModalOpenGroup, setIsModalOpenGroup ,selectedRoomId} = useContext(AppContext);
    const [allUsers, setAllUsers] = useState([]);
    useEffect(()=>{
        fetchUsers();
    },[]);

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
    return ( 
        <div className="container">
        <Modal
        title="InfoGroup"
        open={isModalOpenGroup}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal"
        footer={null}
      >
        <div className={cx('warap')}>
            <div className={cx("content")}>
          
            {allUsers.map((item)=>{
                <ContactListItem key={item.id} data={item} />
            })}
            </div>           
        </div>
      </Modal>
      </div>
     );
}

export default InfoGroup;