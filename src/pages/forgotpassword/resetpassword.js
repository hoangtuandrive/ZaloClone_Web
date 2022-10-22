
import React, { useContext, useState } from 'react';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { Button, Col, Row,Typography } from 'antd';

import IMAGE_ACCOUNT_PAGE from '../../assets/images/accountbg.png';
import './resetpassword.scss';

import { useForm} from "react-hook-form";
import CustomInput from '../../components/Custom/CustomInput';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';

import {AppContext} from '../../context/AppProvider';

Amplify.configure(awsconfig);
const { Text, Title } = Typography;

function ResetPassword() {
    return (  
        <div className="account-common-page-resetpassword">
        <div className="account-wrapper-resetpassword">
            <div className="account_left-resetpassword">
                <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_login" />
            </div>

            <div className="account_right-resetpassword">
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#4d93ff' }}>Thay đổi mật khẩu</Text>
                </Title>
        
                <div className="form-account-resetpassword">
                                                
                                    <Row gutter={[0, 8]}>
                                        <Col span={18}>                                    
                                            <div className='box'>
                                                <input type="text" placeholder="Email"></input>
                                            </div>
                                        </Col>
                                        <Col span={18}>
                                            <div className='box'>                                        
                                            <input type="text" id="verificationcode" placeholder="Mã xác minh"></input></div>
                                        </Col>
                                        <Col span={18}>                                        
                                            <input type="password" id="password" placeholder="Mật khẩu"></input>
                                        </Col>
                                        <Col span={18}>
                                        <br />
                                            <Button
                                                
                                                className='btnContinue'
                                                type="primary"
                                                htmlType="submit"
                                                block
                                            >
                                                Xác nhận
                                            </Button>

                                        </Col>
                                    </Row>                                    
                </div>
            </div>
        </div>
    </div>
    );
}

export default ResetPassword;
