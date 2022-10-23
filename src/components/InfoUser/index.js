  import { IconButton} from '@mui/material';
  import React from 'react'
  import { useNavigate } from 'react-router-dom';
  import {WechatOutlined, CloudOutlined, MedicineBoxOutlined,ExceptionOutlined ,LogoutOutlined,ContactsOutlined } from "@ant-design/icons"
  import "./InfoUser.css";
  import {AppContext} from '../../context/AppProvider';
  
  
  export default function InfoUser() {
    const navigate = useNavigate();
    const {setIsModalOpen} =  React.useContext(AppContext);
    const handleInfouser = () =>{
      setIsModalOpen(true);
    }

      const handleNavigateChat = () => {
      navigate('/chat',{replace: true});
      }

    return (
      <div className='infouser-item'>
        <IconButton className='btn-photo'>
          <img className="infouser-photo" src="http://www.psdgraphics.com/file/user-icon.jpg" alt="placeholder" />
        </IconButton>
  
        
        <div className='icon-top'>
        <IconButton onClick={handleNavigateChat}>
              <WechatOutlined style={{ fontSize: '35px', color: 'white' }} />
        </IconButton>
        <IconButton >
              <ContactsOutlined style={{ fontSize: '40px', color: 'white' }} />
        </IconButton>
  
        
        <IconButton onClick={handleInfouser} >
        <ExceptionOutlined style={{ fontSize: '35px', color: 'white' }}/>
        </IconButton>
              
        </div>
  
  
        <div className='icon-footer'>
        <IconButton>
              <CloudOutlined style={{ fontSize: '35px', color: 'white' }} />
        </IconButton>
        <IconButton>
              <MedicineBoxOutlined style={{ fontSize: '35px', color: 'white' }} />
        </IconButton>
  
        
        <IconButton>
        
        <LogoutOutlined style={{ fontSize: '30px', color: 'white' }}/>
        </IconButton>
              
        </div>
       
        
        
  
            
      </div>
      
    )
  }
  