import React from "react";
import {Row,Col} from 'antd';
import AnhMau from "../../../../assets/images/homeabout.png";
import {  FireOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
function About() {
    return ( 
    <div className="homeabout">
           <div className="info">
                <h1>Tải Zalo PC cho máy tính</h1>
                <h2>Ứng dụng Zalo PC đã có mặt trên Windows, Mac OS, Web</h2>           
             <div className="desc">           
                    <Row >
                        <Col span={12}>
                            <ul>
                                <li>
                                Gửi file, ảnh, video cực nhanh lên đến 1GB
                                </li>
                                <li>
                                Đồng bộ tin nhắn với điện thoại
                                </li>
                                <li>
                                Tối ưu cho chat nhóm và trao đổi công việc
                                </li>
                            </ul>
                            <Link to='/login' className="btn">
                                <FireOutlined /> Trải nghiệm phiên bản web
                        </Link>
             
                        </Col>
                   <Col span={12}>    
                    <img src={AnhMau} alt="anh minh hoa" className="aboutinfo"/>
                    </Col>
                </Row>
             </div>
          
             
           </div>

    </div>
    );
}

export default About;