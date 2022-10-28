import React, {useEffect, useState} from 'react';
import moment from 'moment';
// import './Message.css';
import { DataStore,Auth } from 'aws-amplify';
import { User} from '../../models';
import { Spin } from 'antd';
import classNames from 'classnames/bind';
import styles from './Message.modulo.scss';

const cx = classNames.bind(styles);
export default function Message(props) {
  const [user, setUser] = useState();
  const [isMe, setIsMe] = useState(false);
   

    useEffect(() => {
      DataStore.query(User, props.data.userID).then(setUser);
      console.log("message", props);
    }, []);

    useEffect(() => {
      const checkIfMe = async () => {
        if (!user) {
          return;
        }
        const authUser = await Auth.currentAuthenticatedUser();
        setIsMe(user.id === authUser.attributes.sub);
      };
      checkIfMe();
    }, [user]);

    if (!user) {
      return <Spin></Spin>;
    }

    // const {
    //   data,
    //   isMine,
    //   startsSequence,
    //   endsSequence,
    //   showTimestamp
    // } = props;

    // const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
      // <div className={[
      //   'message',
      //   `${isMine ? 'mine' : ''}`,
      //   `${startsSequence ? 'start' : ''}`,
      //   `${endsSequence ? 'end' : ''}`
      // ].join(' ')}>
      //   {
      //     showTimestamp &&
      //       <div className="timestamp">
      //         { friendlyTimestamp }
      //       </div>
      //   }

      //   <div className="bubble-container">
      //     <div className="bubble" title={friendlyTimestamp}>
      //       { data.message }
      //     </div>
      //   </div>
      // </div>


    //   <div className='contain'>
    //   {isMe == false && (
    //     <img className='imgcustom'
    //         src= "https://static-images.vnncdn.net/files/publish/ty-phu-elon-musk-vua-chi-44-ty-usd-de-mua-lai-twitter-9ff465ee3a124118b8fc9b8e8c9bcb4a.jpg"
    //         alt="placeholder"
    //     />
    //   )}

    //   <div>
    //     <p>
    //       {props.data.content}
    //     </p>
    //   </div>
    // </div>
    <div className={cx('message', isMe ? 'rightContainer' : 'leftContainer')}>
    <div className={cx('messImg')}>
        <img src={"https://static-images.vnncdn.net/files/publish/ty-phu-elon-musk-vua-chi-44-ty-usd-de-mua-lai-twitter-9ff465ee3a124118b8fc9b8e8c9bcb4a.jpg"}
        alt="Khong Load"  />
    </div>
    <div className={cx('messright')}>
      <div className={cx('messText')} style={{ color: isMe ? "white" : "black" }}>
        {props.data.content}
      </div>
    </div>
  </div>


      // <div className="message">
      //   <div className="bubble-container">
      //     <div className="bubble" >
      //       {props.data.content}
      //     </div>
      //   </div>
      // </div>
    );
}