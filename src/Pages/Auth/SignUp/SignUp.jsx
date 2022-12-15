import { Box, Grid, Typography } from "@mui/material";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";



export default function SignUp() {

  const [data, setData] = useState({})

  const onFinish = (values) => {
    setData(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log(data);
  return (
    <Box sx={{ backgroundColor: "aqua", height: "100vh", padding:"70px 30px" }}>
      <Typography
        sx={{ textAlign: "center", color: "black", fontWeight: "600" }}
        variant="h4"
        component={"h4"}
      >
        Register  🖊
      </Typography>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid
          item
          lg={4}
          md={6}
          sm={10}
          xs={12}
          sx={{
            p: 4,
            backgroundColor: "white",
            mt: 3,
            borderRadius: "8px",
            boxShadow: "0px 0px 20px 0px grey",
          }}
        >
          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
              style={{width:"100%"}}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              style={{width:"100%"}}

              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

        

         
            <Form.Item style={{ width: "100%" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{width:"100%"}}
              >
                Register
              </Button>
            </Form.Item>
            <NavLink to="/auth/login">
              Do you have an account?
            </NavLink>
          </Form>
        </Grid>
      </Grid>
    </Box>
  );
}
