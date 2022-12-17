import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form,  Input, InputNumber, message, Space } from "antd";


export default function TodDoUi({ dataTabs }) {
  const [activeUser, setActiveUser] = useState(dataTabs)
  const [rate, setRate] = useState(0)
  const [data, setData] = useState([]);
  // Form start
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  // Form end
  //   Modal Start
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };



  //   Modal End
  const onFinish = (values) => {
    message.success("Success  ")
    setData(values);
    setIsModalOpen(false);
    const copy = [...activeUser]
    copy[rate].rate = values.rate
    copy[rate].feedback = values.feedBack
    setActiveUser(copy)
  };

  console.log(activeUser);
  



  return (
    <Box>
      <Typography sx={{ textAlign: "center" }} variant="h4" component={"h4"}>
        To-Do
      </Typography>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item lg={6} md={8} sm={12} xs={12}>
          {activeUser.filter((v) => v.rate == "" && v.feedBack == "").map((v, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                mt: 2,
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Avatar sx={{ width: "30px", height: "30px" }}>{v.avatar}</Avatar>
              <Box
                sx={{
                  borderRadius: "6px",
                  boxShadow: "0px 0px 10px 3px grey",
                  padding: "4px 15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "30px",
                  width: "90%",
                }}
              >
                <Typography variant="p" component={"p"}>
                  <b>Name: </b> {v.name}
                </Typography>

                <Typography variant="p" component={"p"}>
                  <b>Task Url: </b> {v.taskUrl}
                </Typography>

                <Button
                  type="primary"
                  onClick={() => {
                    showModal()
                    setRate(i)
                  }}
                  style={{
                    padding: "0px 14px !important",
                    height: "30px",
                    lineHeight: "0px",
                  }}
                  
                >
                  show
                </Button>
                <Modal
                  title="Baholash"
                  open={isModalOpen}
                  onCancel={handleCancel}
                  style={{ textAlign: "center" }}
                  footer={null}
                >
                  <Form
                    layout="vertical"
                    initialValues={{
                      size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                    style={{ width: "100%" }}
                    autoComplete="off"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="rate"
                      label="rate"
                      rules={[{ required: true, message: "Please rate now!" }]}
                      style={{width:"100%"}}
                    >
                      <InputNumber type={"number"} min={1} max={10} style={{width:"100%"}}/>
                    </Form.Item>
                    <Form.Item
                      name="feedBack"
                      label="feedBack"
                      rules={[
                        {
                          required: true,
                          message: "Please input feedBack",
                        },
                      ]}
                    >
                      <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                    <Space>
                      <Button htmlType="submit">Submit</Button>
                    </Space>
                  </Form>
                </Modal>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
