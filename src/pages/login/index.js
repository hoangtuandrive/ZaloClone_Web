import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Alert, Button, Col,   Row,  Typography} from 'antd';

import IMAGE_ACCOUNT_PAGE from '../../assets/images/accountbg.png';
import './login.scss';
import CustomInput from '../../components/Custom/CustomInput';
import { Controller,useForm} from "react-hook-form";

import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);
const { Text, Title } = Typography;
function Login() {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,  
      } = useForm();
       const onSignInPressed= async (data)=> {
    try {
        const user = await Auth.signIn(data.username, data.password);
        navigate('/chat',{replace: true});
        console.log('Thanh cong');
        
        } catch (error) {      
        console.log('error signing in', error);  
    }
}
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
                <div className="form-account">
                                  <Row gutter={[0, 8]}>
                                        <Col span={18}>                                          
                                            <CustomInput
                                                type="text" name="username" 
                                                placeholder="UserName"
                                                 control={control} 
                                                rules={{ required: "Email is required" }}
                                               
                                                maxLength={50}
                                                titleCol={24}
                                                inputCol={18}
                                               
                                            />                                     
                                        </Col>                                      
                                        <Col span={18}>
                                          
                                            <CustomInput
                                               type="password" name="password"                                    
                                                control={control}
                                                placeholder="Nhập mật khẩu"
                                                rules={{
                                                    required: "Password is required",
                                                    minLength: {
                                                      value: 8,
                                                      message: "Password should be minimum 8 characters long",
                                                    },
                                                  }}
                                                maxLength={200}
                                                titleCol={24}
                                                inputCol={18}
                                                
                                            />                 
                                                                                                              
                                        </Col>                                  
                                        
                                        <Col span={18}>
                                            <br />
                                            <Button
                                            onClick={handleSubmit(onSignInPressed)}
                                                type="primary"
                                                htmlType="submit"
                                                block
                                            >
                                               
                                                Đăng nhập
                                            </Button>
                                        </Col>
                                    </Row>                     
                   
                </div>
              
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
