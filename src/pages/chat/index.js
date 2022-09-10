import React from 'react';
import ChatList from '../../components/chatList/ChatList';
import Slider from '../../components/slider';
import './chat.scss';
import {  Col, Row } from 'antd';
import ChatContent from '../../components/chatContent/ChatContent';
function chat() {
    return ( 
        <div className='wrapper_chat'>
            <Row gutter={[0, 8]}>
                <Col span={1}>                                          
                   <Slider />
               </Col>
               <Col span={5}>

                  <ChatList />                                                          
               </Col>
               <Col span={18}>

                  <ChatContent />                                                          
               </Col>
            </Row>
        </div>
     );
}

export default chat;
