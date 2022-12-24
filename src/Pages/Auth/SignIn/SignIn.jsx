import { Box, Grid, Typography } from "@mui/material";
import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";

export default function SignIn() {
  const onFinish = (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    axios
      .post("https://challange.onrender.com/api/v1/auth/login", data)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          localStorage.setItem("token", res.data.data.jwt);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          window.location.reload();
        } else {
          console.log(res.data.message);
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Box
      sx={{ backgroundColor: "aqua", height: "100vh", padding: "70px 30px" }}
    >
      <Typography
        sx={{ textAlign: "center", color: "black", fontWeight: "600" }}
        variant="h4"
        component={"h4"}
      >
        Sign In 🖊
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
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              style={{ width: "100%" }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ width: "100%" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>

            <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <Typography>Not a member yet? </Typography>
              <NavLink to="/auth/register">Register</NavLink>
            </Box>
          </Form>
        </Grid>
      </Grid>
    </Box>
  );
}