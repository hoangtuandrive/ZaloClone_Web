import { Button } from "antd";
import React from "react";
import {LoginOutlined,CheckOutlined ,EditOutlined  } from '@ant-design/icons';
function Footers() {
   
    return (  
        <div className="infooter">
            
            <Button className="dir-control">Đăng Nhập<LoginOutlined /></Button>
            <Button className="dir-control"><EditOutlined />Đăng Ký</Button>
        </div>
    );
}

export default Footers;