import React from "react";
import NavBar from "../navbar";
import Logo from "../../../../assets/images/logomoi.jpg";


function Header() {
    return ( 
        <div className="wrap">
         <div className="inner">
            <div className="logo-link" >
                     <img src={Logo} alt="Zalo"/>
                    <span name='Ten San Pham'>MessoLa</span>            
            </div>
                    <NavBar />                      
         </div>
          
        </div>
     );
}

export default Header;