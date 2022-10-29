import React ,{useState,useEffect}from 'react';
import styles from './Message.modulo.scss';
import classNames from 'classnames/bind';
import {User} from '../../models'
import { Spin } from 'antd';
import { DataStore, Auth } from "aws-amplify";
import { AmplifyS3Image }  from '@aws-amplify/ui-react/legacy';
import useWindowDimensions from '../hooks/useWindowDimensions ';
import { AspectRatio } from 'react-aspect-ratio';
const cx = classNames.bind(styles);

export default function Message(props) {
  const [user, setUser] = useState();
  const [isMe, setIsMe] = useState(false);
  const { width } = useWindowDimensions();
  console.log(props.data);
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
            <AmplifyS3Image imgKey={user?.imageUri || null}/>
        </div>
     
        <div className={cx('messright')}>
        {props.data.image && (
        <div style={{ marginBottom: props.data.content ? 10 : 0 }}>
        
            <div className={cx('imgSize')}>
          <AmplifyS3Image
             imgKey={props.data.image}
          />
          </div>
          {/* <div className={cx('imgSize')}>
          <AmplifyS3Image
             imgKey={"63020dda-908f-4f60-9217-0a693fc367cf.png"}
          />
          </div> */}
           
          
          </div>
        )}
          <div className={cx('messText')} style={{ color: isMe ? "white" : "black" }}>
            {props.data.content}
          </div>
        </div>
      </div>
    );
}