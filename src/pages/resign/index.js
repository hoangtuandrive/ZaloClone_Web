import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row, Typography } from "antd";

import IMAGE_ACCOUNT_PAGE from "../../assets/images/accountbg.png";
import "./resign.scss";

import { useForm } from "react-hook-form";
import CustomInput from "../../components/Custom/CustomInput";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";

import { AppContext } from "../../context/AppProvider";

Amplify.configure(awsconfig);
const { Text, Title } = Typography;

function Resign() {
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const navigate = useNavigate();

  const { control, handleSubmit, watch, value } = useForm();

  const pwd = watch("password");
  const passwordContextT=pwd;
  const userContextT = watch("username");
  const { setuserContext,setPassWordContext } = useContext(AppContext);

  //Lấy uerName
  //const userNameContext= {userContext} = useContext(AppContext);

  const onSignUpPressed = async (data) => {
    const { username, password, email, name } = data;

    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: { email, name, preferred_username: username },
      });
      setuserContext(userContextT);
      setPassWordContext(passwordContextT);
      navigate("/authResign", { replace: true });

      console.log("Thanh cong");
    } catch (error) {
      console.log("error signing in", error);
    }
  };
  return (
    <div className="account-common-page-resign">
      <div className="account-wrapper-resign">
        <div className="account_left-resign">
          <img src={IMAGE_ACCOUNT_PAGE} alt="zelo_login" />
        </div>

        <div className="account_right-resign">
          <Title level={2} style={{ textAlign: "center" }}>
            <Text style={{ color: "#4d93ff" }}>Sign Up</Text>
          </Title>
          <div className="form-account-resign">
            <Row gutter={[0, 8]}>
              <Col span={18}>
                <CustomInput
                  name="name"
                  control={control}
                  placeholder="Name"
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 40,
                      message: "Name should be max 24 characters long",
                    },
                  }}
                />
              </Col>
              <Col span={18}>
                <CustomInput
                  name="username"
                  control={control}
                  placeholder="Email"
                  rules={{
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username should be at least 3 characters long",
                    },
                    maxLength: {
                      value: 40,
                      message: "Username should be max 24 characters long",
                    },
                  }}
                />
              </Col>

              <Col span={18}>
                <CustomInput
                  name="password"
                  type="password"
                  control={control}
                  placeholder="Password"
                  secureTextEntry
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should be at least 8 characters long",
                    },
                  }}
                />
              </Col>

              <Col span={18}>
                <CustomInput
                  name="password-repeat"
                  type="password"
                  control={control}
                  placeholder="Repeat Password"
                  secureTextEntry
                  rules={{
                    validate: (value) =>
                      value === pwd || "Password do not match",
                  }}
                />
              </Col>

              <Col span={18}>
                <br />
                <Button
                  onClick={handleSubmit(onSignUpPressed)}
                  className="btnRegister"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Sign Up
                </Button>
              </Col>
              <Col span={18}>
                <div className="addtional-link-resign">
                  <Link to="/login">Already have account?</Link>
                </div>
              </Col>
            </Row>
          </div>
          <Col span={18}>
            <Button className="btnLoginFacebook" htmlType="submit" block>
              {" "}
              Continue with Facebook!
            </Button>
          </Col>{" "}
          <br />
          <Col span={18}>
            <Button className="btnLoginGoogle" htmlType="submit" block>
              {" "}
              Continue with Google!
            </Button>
          </Col>
        </div>
      </div>
    </div>
  );
}

export default Resign;
