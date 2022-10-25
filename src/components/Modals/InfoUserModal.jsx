import React, { useContext,useEffect } from "react";
import { Button,Modal } from 'antd';
import {AppContext} from '../../context/AppProvider';
import './InfoUser.scss';
import { Auth, DataStore } from "aws-amplify";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {User} from '../../models';


function InfoUserModal() {
    const {isModalOpen, setIsModalOpen} = useContext(AppContext);
    const [UserIn,setUserIn]= useState({});
    const handleOk = () => {
      setIsModalOpen(false);  
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
    const navigate = useNavigate();
  

    useEffect(() => {
        const fetchUser = async () => {
          const currentUser = await Auth.currentAuthenticatedUser();
          const user=(await DataStore.query(User)).filter(
             (User) => User.id === currentUser.attributes.sub);
         
          console.log(user);
          console.log(currentUser);
          // var name= currentUser.attributes.name;
          // var email= currentUser.attributes.email;
          // var sub=currentUser.attributes.sub;
          //  setUserIn(user.name); 
          //  var ten=user..name;
        //  console.log(ten);
        
        };
         fetchUser();
      }, []);
    
    return ( 
        <div className="container_info">
            <Modal     
             title='Thông Tin Tài Khoản'
             open={isModalOpen}
             onOk={handleOk}
              onCancel={handleCancel}
              className="modal"
            >
            <div className="img_info">

            <img className="imguser_info" alt="Ảnh User" 
            src="http://www.psdgraphics.com/file/user-icon.jpg" 
            style={{width:100,
                    height:100}} />
            </div>
            
         
            <h2>{UserIn.name}</h2>
            <h3>Thông tin cá nhân</h3>
            <div className="content">
            <div className="content_top">
            <div>
                <span className="lable_info"  style={{paddingRight:5}}>Điện thoại:</span>
                <span className="lable_infoA">{UserIn.email}</span>
            </div>
            <div>
                <span className="lable_info" style={{paddingRight:10}}>Giới Tính: </span>
                <span className="lable_infoA" >       Nam</span>
            </div>
            <div>
                <span className="lable_info">Ngày Sinh: </span>
                <span className="lable_infoA">10/10/2022</span>
            </div>
            </div>
            <div className="btn_info">
                <Button className="btn_capnhat">Cập Nhật Thông Tin</Button>
                
            </div>
            </div>

            </Modal>

        </div>

     );
}

export default InfoUserModal;