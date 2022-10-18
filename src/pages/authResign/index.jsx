import Input from "rc-input";
import React from "react";
import './index.scss';
import { Button } from 'antd';
import IMAGE_ACCOUNT_PAGE from '../../assets/images/accountbg.png';

import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from '../../components/Custom/CustomInput';
import { Controller,useForm} from "react-hook-form";

import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';

import {AppContext} from '../../context/AppProvider';

Amplify.configure(awsconfig);

function AuthResign()  {
   // const route = useRoute();
   //Lấy UserName từ Context;
   const {userContext}=React.useContext(AppContext);


    const navigate = useNavigate();
    const { control, handleSubmit, watch } = useForm({ 
        defaultValues: {username:userContext},
    });


    const onConfirmPressed = async (data) => {
        try {
          await Auth.confirmSignUp(data.username, data.code);
          navigate('/login',{replace: true});
         
            console.log('Thanh cong');
        } catch (error) {
           
            console.log('error confirming sign up', error);
        }
      };
    

    return (   
        <div className="container-authResign">        
          
            <div className="content">
                    

                    <img src={'https://herobot.app/wp-content/uploads/2020/10/virtual-talk-ai-chatbot-1.jpg'} alt="Anh Trang chu" className="AnhXacThuc" />
                  
                    <div className="Auth">
                        <h1>Nhập mã xác thực</h1>
                        <p>Vui lòng nhập mã xác thực được gửi từ Email </p>
                        <div className="Auth_Input">
                        <CustomInput
                                name="username"
                               
                                control={control}
                                placeholder="Username"
                                rules={{
                                    required: "Username code is required",
                                }}
                                className="NhapCode"
                                />
                             <CustomInput
                             name="code"
                          
                             control={control}
                             placeholder="Enter your confirmation code"
                             rules={{
                                 required: "Confirmation code is required",
                             }}
                             className="NhapCode"
                              />
                          
                        <Button   className="Btn"  onClick={handleSubmit(onConfirmPressed)} >Hoàn Thành</Button>
                            {console.log(userContext)}
                        </div>
                
                </div>
            </div>

        </div>
    );
}

export default AuthResign;