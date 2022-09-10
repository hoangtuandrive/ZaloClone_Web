import React from "react";
import NavBar from "../navbar";
import Logo from "../../../../assets/images/zelo_icon.png";


function Header() {
    return ( 
        <header className="wrap">
         <div className="inner">
            <div className="logo-link" >
                     <img src={Logo} alt="Zalo"/>
            </div>
                    <NavBar />                      
         </div>
          
        </header>
     );
}

export default Header;