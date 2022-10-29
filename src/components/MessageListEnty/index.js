import React from "react";
import {Alert} from 'antd'
function MessageListEnty() {
    return ( 
        <Alert
           message='Hãy chọn phòng'
           type='info'
           showIcon
           style={{ margin: 5 }}
           closable
         />
     );
}

export default MessageListEnty;