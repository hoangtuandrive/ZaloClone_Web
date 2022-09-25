import React  from "react";
import {Link} from "react-router-dom";

function NavBar() {
    return (  
              
            <nav className="navbar">
                <a href="#">Trang chủ</a>
                <a href="#">Tính năng</a>
                <a href="#">Ứng dụng</a>
                <a href="./chat">Team phát triển</a>
                <Link to='./resign'>Đăng ký</Link>
                <Link to='./login'>Đăng nhập</Link>
            </nav>
      
    );
}
export default NavBar;
