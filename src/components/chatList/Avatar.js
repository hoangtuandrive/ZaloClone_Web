import React, { Component } from "react";
import classNames from 'classnames/bind';
import styles from './chatList.module.scss';
const cx = classNames.bind(styles);

class Avatar extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div className={cx("avatar")}>
        <div className={cx("avatar-img")}>
          <img src={this.props.image} alt="#" />
        </div>
        <span className={cx(`isOnline ${this.props.isOnline}`)}></span>
      </div>
    );
  }
}

export default Avatar;