import React ,{useState,useEffect}from 'react';
import styles from './Message.modulo.scss';
import classNames from 'classnames/bind';
import {User} from '../../models'
import { Spin } from 'antd';
import { DataStore, Auth } from "aws-amplify";
const cx = classNames.bind(styles);

const cx = classNames.bind(styles);
export default function Message(props) {
  const [user, setUser] = useState();
  const [isMe, setIsMe] = useState(false);
  useEffect(() => {
    DataStore.query(User, props.data.userID).then(setUser);
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
    return(
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
    );
}