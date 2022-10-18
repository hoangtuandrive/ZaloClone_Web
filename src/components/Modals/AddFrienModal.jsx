import React, { useContext } from "react";
import { Button,Modal } from 'antd';
import {AppContext} from '../../context/AppProvider';

function AddFriendModal() {
    const {isAddFriendVisible, setisAddFriendVisible} = useContext(AppContext);
    const handleOk = () => {
       setisAddFriendVisible(false);
      };
    
      const handleCancel = () => {
        setisAddFriendVisible(false);
      };
  
    return ( 
            <div>
                <Modal
        title='Thêm Bạn'
        open={isAddFriendVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        
      >
      <input type="text" placeholder="Nhập tên bạn cần tìm" />
      </Modal>
            </div>
     );
}

export default AddFriendModal;