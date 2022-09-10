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
                    <Text style={{ color: '#4d93ff' }}>Đăng Nhập</Text>
                </Title>
                <Divider />
                <div className="form-account">
                    <Formik >
                        {(formikProps) => {
                            return (
                                <Form>
                                    
                                    <Row gutter={[0, 8]}>
                                        <Col span={18}>
                                            <FastField
                                                name="username"
                                                
                                                type="text"
                                                title="Tài khoản"
                                                placeholder="Nhập tài khoản"
                                                maxLength={50}
                                                titleCol={24}
                                                inputCol={18}
                                               
                                            />
                                        </Col>
                                       
                                        <Col span={18}>
                                            <FastField
                                                name="password"
                                               
                                                type="password"
                                                title="Mật khẩu"
                                                placeholder="Nhập mật khẩu"
                                                maxLength={200}
                                                titleCol={24}
                                                inputCol={18}
                                                
                                            />
                                        </Col>                                  

                                        <Col span={18}>
                                            <br />
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                block
                                            >
                                                Đăng nhập
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
                <Divider />
                <div className="addtional-link">
                    <Link to="/">Trang chủ</Link>
                 
                    <Link to="/account/registry">
                        Bạn chưa có tài khoản ?
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login;
