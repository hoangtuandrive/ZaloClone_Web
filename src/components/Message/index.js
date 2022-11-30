import React, { useState, useEffect } from "react";
import styles from "./Message.modulo.scss";
import classNames from "classnames/bind";
import { User } from "../../models";
import { Spin } from "antd";
import { DataStore, Auth, Storage, button } from "aws-amplify";
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy";

import ReactAudioPlayer from "react-audio-player";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";

import {FileWordOutlined ,DownloadOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

export default function Message(props) {
  const [user, setUser] = useState();
  const [isMe, setIsMe] = useState(false);
  const [soundURI, setSoundURI] = useState(null);
  const [linkdownload, setlinkdownload] = useState(null);
  const [check,setcheck]=useState(false);
  console.log(props);

  async function ObjectsFromS3() {
    let downloadLink = await generateDownloadLinks(props.data.file);
    setlinkdownload(downloadLink);
    

  }

  async function generateDownloadLinks(fileKey) {
    const result = await Storage.get(fileKey, { download: true });
    return downloadBlob(result.Body, "filename");
  }
 
  async function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    return a;
  }
  useEffect(() => {
    if(props.data.file===null || props.data.file===undefined){
      console.log("123");  
    }
    else{
      console.log(props.data.file);
      console.log("456");  
      ObjectsFromS3();
    }
  }, []);
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
  // function handleCheck(e){
  //   setcheck(e.target.checked);
  //   console.log(e.target.checked);
  // }
  // console.log(soundURI);

  if (!user) {
    return <Spin></Spin>;
  }
  return (
    <div className={cx("message", isMe ? "rightContainer" : "leftContainer")} >
      <div className={cx("messImg")}>
        <AmplifyS3Image
          imgKey={user?.imageUri || null}
          style={{ "--height": "50px", "--width": "50px" }}
        />
      </div>

      <div className={cx(isMe ? "messright":"messleft")}>
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
          {props.data.file &&(
              <div style={{ marginBottom: props.data.content ? 10 : 0 }}>
                   <a href={linkdownload}  download="">
                    <div className="word">
                      <FileWordOutlined style={{fontSize:50}}/>
                      <h4>{props.data.file}</h4>
                      <DownloadOutlined style={{fontSize:30,marginTop:20}}/>
                    </div>
      
                  </a>
              </div>
          )}
          {props.data.content}
         
        </div>
        <div    className={cx("messdelete_wrap")}>
          {/* <label onClick={props.openDelete} htmlFor="messdel" >
            <input name="messdel" type="checkbox" id="messdel" hidden={true}/>
            <p>...</p>
         </label> */}
         <button onClick={props.openDelete} className={cx("btnOpenDelete")}>...</button>
           
        </div>
        {props.isSelected &&(
              <div className={cx("messdelete")}>
                  <button onClick={props.deleteClick} className={cx("btnXoa")}>Delete Message</button>
                  <button onClick={props.recallClick} className={cx("btnXoa")}>Recall Message</button>
              </div>
            )}
      </div>
    </div>
  );
}
