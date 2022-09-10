import React, { Component } from 'react';
import  {MessageOutlined,UserOutlined,SettingOutlined } from '@ant-design/icons';
import logo from '../../assets/images/zelo_icon.png';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from './Menu';
import classNames from 'classnames/bind';
import styles from './slider.modulo.scss';


//const cx = classNames.bind(styles);
function Slider() {
    return (  
       <div className='wrapper'>
            <div className='nav_tabs_user'>
                <img src={logo} alt='anh mau' className='avatar'/>
            </div>
            <div className='nav_tabs_item_top'>
                <Menu>

                    <MenuItem  to={'/chat'} icon={<MessageOutlined />}  />
                    <MenuItem
                 
                    to={'/'}
                    icon={<UserOutlined/>}
                    
                    />
                    
                </Menu>
            </div>
            <div className='nav_tabs_item_bot'>
            <MenuItem  to={'/login'} icon={<SettingOutlined />} />
            </div>
       </div>   
    );
}

export default Slider;