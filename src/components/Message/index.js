import React, { useState, useEffect } from "react";
import styles from "./Message.modulo.scss";
import classNames from "classnames/bind";
import { User } from "../../models";
import { Spin } from "antd";
import { DataStore, Auth, Storage } from "aws-amplify";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";

import ReactAudioPlayer from "react-audio-player";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
const cx = classNames.bind(styles);

export default function Message(props) {
  const [user, setUser] = useState();
  const [isMe, setIsMe] = useState(false);
  const [soundURI, setSoundURI] = useState(null);
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

  useEffect(() => {
    if (props.data.audio) {
      Storage.get(props.data.audio).then(setSoundURI);
    }
  }, [props.data]);

  console.log(soundURI);

  if (!user) {
    return <Spin></Spin>;
  }
  return (
    <div className={cx("message", isMe ? "rightContainer" : "leftContainer")}>
      <div className={cx("messImg")}>
        <AmplifyS3Image
          imgKey={user?.imageUri || null}
          style={{ "--height": "50px", "--width": "50px" }}
        />
      </div>

      <div className={cx("messright")}>
        <div
          className={cx("messText")}
          style={{
            color: isMe ? "white" : "black",
            backgroundColor: isMe ? "rgb(55 74 216)" : "lightgray",
          }}
        >
          {props.data.image && (
            <div style={{ marginBottom: props.data.content ? 10 : 0 }}>
              <div>
                <AmplifyS3Image
                  imgKey={props.data.image}
                  style={{ "--height": "300px" }}
                />
              </div>
              {/* <div className={cx('imgSize')}>
          <AmplifyS3Image
             imgKey={"63020dda-908f-4f60-9217-0a693fc367cf.png"}
          />
          </div> */}
            </div>
          )}

          {soundURI && <AudioPlayer soundURI={soundURI} />}

          {props.data.content}
        </div>
      </div>
    </div>
  );
}
