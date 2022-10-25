import React, {useEffect} from 'react';


import './ContactListItem.css';

export default function ContactListItem(props) {
  // useEffect(() => {
  //   shave('.conversation-snippet', 20);
  // })

    const { imageUri, name, text } = props.data;

    return (
      <div className="conversation-list-item">
        <img className="conversation-photo" src={imageUri} alt="placeholder" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          <p className="conversation-snippet">{ text }</p>
        </div>
      </div>
    );
}