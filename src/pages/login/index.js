import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Divider, message, Row, Tag, Typography } from 'antd';
import { FastField, Form, Formik } from 'formik';
import IMAGE_ACCOUNT_PAGE from '../../assets/images/accountbg.png';
import './login.scss';
const { Text, Title } = Typography;
function Login() {
    return (  
        <div className="account-common-page">
        <div className="account-wrapper">
            <div className="account_left">
                <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_login" />
            </div>

            <div className="account_right">
                <Title level={2} style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#4d93ff' }}>Đăng nhập</Text>
                </Title>
                <Divider />
                <div className="form-account">
                    <Formik >
                        {(formikProps) => {
                            return (
                                <Form>
                                    
                                    <Row gutter={[0, 8]}>
                                        <Col span={18}>
                                            <div className='box'>
                                                <input type="text" placeholder="Email"></input>
                                            </div>
                                        </Col>
                                       
                                        <Col span={18}>
                                            <input type="password" id="password" placeholder="Mật khẩu"></input>
                                        </Col>                                  

                                        <Col span={18}>
                                            <br />
                                            <Button
                                                className='btnLogin'
                                                type="primary"
                                                htmlType="submit"
                                                block
                                            >Đăng nhập                                                
                                            </Button>
                                        </Col>
                                        <Col span={18}>
                                        <div className="addtional-link">
                                            <Link to="/">Quên mật khẩu?</Link> 
                                            <Link to="/resign">Tạo tài khoản mới</Link>
                                        </div>
                                        </Col>

                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
                <Divider />
                <Col span={18}>
                    <Button
                        className='btnLoginFacebook'
                        htmlType="submit"
                        block> Tiếp tục với Facebook
                    </Button>
                    
                </Col> <br/>
                <Col span={18}>
                    <Button
                        className='btnLoginGoogle'
                        htmlType="submit"
                        block> Tiếp tục với Google
                    </Button>
                </Col>
            </div>
        </div>
    </div>
    );
}

export default Login;
