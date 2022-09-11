import React, { Component } from 'react';

import ChatListItems from './ChatListItems';
import classNames from 'classnames/bind';
import styles from './chatList.module.scss';
const cx = classNames.bind(styles);

class ChatList extends Component {
    allChatUsers = [
        {
          image:
            "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 1,
          name: "Thuan",
          active: true,
          isOnline: true,
        },
        {
          image:
            "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 2,
          name: "Lo",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 3,
          name: "Joran",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 4,
          name: "Joren",
          active: false,
          isOnline: true,
        },
        {
          image:
            "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 5,
          name: "Outa",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 6,
          name: "Gole",
          active: false,
          isOnline: true,
        },
        {
          image:
            "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 7,
          name: "Akzac",
          active: false,
          isOnline: true,
        },
        {
          image:
            "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 8,
          name: "Anna",
          active: false,
          isOnline: false,
        },
        {
          image:
            "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 9,
          name: "Dra",
          active: false,
          isOnline: true,
        },
        {
          image: "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg",
          id: 10,
          name: "Minh",
          active: false,
          isOnline: true,
        },
      ];

      constructor(props) {
        super(props);
        this.state = {
          allChats: this.allChatUsers,
        };
      }

    render() { 
        return (
            <div className={cx('main__chatlist')}>
                <div className={cx('chatList__Search')}>
                    <div className={cx('search_wrap')}>
                    <button className={cx('search-btn')}>
                       <i className='fa fa-search' aria-hidden="true"></i>
                    </button>
                        <input type='text' placeholder='Tìm kiếm' required/>
                    </div>
                </div>
                <div className={cx('chatlist__items')}>
                {this.state.allChats.map((item, index) => {
            return (
              <ChatListItems
                name={item.name}
                key={item.id}
                animationDelay={index + 1}
                active={item.active ? 'active' : ''}
                isOnline={item.isOnline ? 'active' : ''}
                image={item.image}
              />
            );
          })}
                </div>
            </div>
        );
    }
}
 
export default ChatList;