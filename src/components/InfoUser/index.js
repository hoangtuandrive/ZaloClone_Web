import { Button, IconButton } from "@mui/material";
import React, { useEffect ,useState} from "react";
import {
  WechatOutlined,
  CloudOutlined,
  MedicineBoxOutlined,
  ExceptionOutlined,
  LogoutOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import "./InfoUser.css";
import { AppContext } from "../../context/AppProvider";

import { useNavigate } from "react-router-dom";
import { Auth, DataStore } from "aws-amplify";
import InfoUserModal from "../Modals/InfoUserModal";
import { User } from "../../models";

export default function InfoUser() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUsers] = useState();
  const { setIsModalOpen,setSelectedRoomId } = React.useContext(AppContext);
  const handleInfouser = () => {
    setIsModalOpen(true);
  };
  const handelChat = () => {
    navigate("/chat", { replace: true });
  };
  const handelContact = () => {
    navigate("/contact", { replace: true });
  };

  const fetchUser = async () => {
    const currentUserCognito = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(
      User,
      currentUserCognito.attributes.sub
    );
    setCurrentUsers(dbUser);
  };
 
  useEffect(() => {
  fetchUser();
  }, []);

  async function signOut() {
    try {
      setSelectedRoomId(null);
      await Auth.signOut();
      navigate("/", { replace: true });
    DataStore.clear();
      setIsModalOpen(false);
     
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <div className="infouser-item">
      <Button className="btn-photo">
        <img
          className="infouser-photo"
          src={currentUser?.imageUri}
          alt="placeholder"
        />
      </Button>

      <div className="icon-top">
        <Button onClick={handelChat}>
          <WechatOutlined style={{ fontSize: "35px", color: "white" }} />
        </Button>
        <Button onClick={handelContact}>
          <ContactsOutlined style={{ fontSize: "40px", color: "white" }} />
        </Button>

        <Button onClick={handleInfouser}>
          <ExceptionOutlined style={{ fontSize: "35px", color: "white" }} />
        </Button>
      </div>

      <div className="icon-footer">
        <Button>
          <CloudOutlined style={{ fontSize: "35px", color: "white" }} />
        </Button>
        <Button>
          <MedicineBoxOutlined style={{ fontSize: "35px", color: "white" }} />
        </Button>

        <Button onClick={signOut}>
          <LogoutOutlined style={{ fontSize: "30px", color: "white" }} />
        </Button>
      </div>
    </div>
  );
}
