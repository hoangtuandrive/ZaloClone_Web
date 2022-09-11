import React, {useEffect} from 'react';
import shave from 'shave';

import './ConversationListItem.css';

export default function ConversationListItem(props) {
  // useEffect(() => {
  //   shave('.conversation-snippet', 20);
  // })

    const { image, name, text } = props.data;

    return (
      <div className="conversation-list-item">
        <img className="conversation-photo" src={image} alt="placeholder" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          <p className="conversation-snippet">{ text }</p>
        </div>
      </div>
    );
}