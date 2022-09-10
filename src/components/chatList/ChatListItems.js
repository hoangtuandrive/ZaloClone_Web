import React, { Component } from "react";
import Avatar from "./Avatar";
import classNames from 'classnames/bind';
import styles from './chatList.module.scss';
const cx = classNames.bind(styles);
export default class ChatListItems extends Component {
  constructor(props) {
    super(props);
  }
  selectChat = (e) => {
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  render() {
    return (
      <div
        style={{ animationDelay: `0.${this.props.animationDelay}s` }}
        onClick={this.selectChat}
        className={cx(`chatlist__item ${
          this.props.active ? this.props.active : ""
        } `)}
      >
        <Avatar
          image={
            this.props.image ? this.props.image : "https://demobucket-809328739865.s3.ap-southeast-1.amazonaws.com/takagi.jpg"
          }
          isOnline={this.props.isOnline}
        />

        <div className={cx("userMeta")}>
          <p>{this.props.name}</p>
          <span className={cx("activeTime")}>1 phút trước</span>
        </div>
      </div>
    );
  }
}
