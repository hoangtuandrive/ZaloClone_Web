import React, { Component } from 'react';
import './chatBody.css'
import ChatList from  '../chatList/ChatList';
import ChatContent from  '../chatContent/ChatContent';
import UserProfile from  '../userProfile/UserProfile';
import Introduce from '../introduce/Introduce';


class ChatBody extends Component {
    render() { 
        return (
            <div className='main__chatBody'>
                <ChatList/>
                <ChatContent/>
                <UserProfile/>


            </div>
        );
    }
}
 
export default ChatBody;