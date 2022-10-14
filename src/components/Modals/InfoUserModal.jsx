import React, { useContext } from "react";
import { Button,Modal } from 'antd';
import {AppContext} from '../../context/AppProvider';
import './InfoUser.scss';
function InfoUserModal() {
    const {isModalOpen, setIsModalOpen} = useContext(AppContext);
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

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
            <h2>Trần Hoàng Long</h2>
            <h3>Thông tin cá nhân</h3>
            <div className="content">
            <div className="content_top">
            <div>
                <span className="lable_info"  style={{paddingRight:5}}>Điện thoại:</span>
                <span className="lable_infoA">0394758355</span>
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
                <Button className="btn_dangxuat">Đăng Xuất</Button>
            </div>
            </div>

            </Modal>

        </div>

     );
}

export default InfoUserModal;