import { Box, Grid, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="div" component={"div"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// TabPanel End

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function Questions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(0);

  const [isQuestionLoaded, setIsQuestionLoaded] = useState(false);

  useEffect(() => {
    try {
      axios
        .get("https://challange.onrender.com/api/v1/question", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          res.data.data.allQuestion.content.map(
            (v) =>
              v.day == JSON.parse(localStorage.getItem("activeDay")) &&
              setIsQuestionLoaded(true)
          );
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //   Modal Function end

  // Image Upload start
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = (value) => {
    const activeDay = JSON.parse(localStorage.getItem("activeDay"));

    if (fileList.length > 0) {
      let formData = new FormData();
      formData.append("avatar", fileList[0].originFileObj);
      try {
        axios
          .post("https://challange.onrender.com/api/v1/attachments", formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            axios
              .post(
                "https://challange.onrender.com/api/v1/question",
                {
                  day: activeDay,
                  text: "",
                  maxBall: value?.maxRate,
                  attachmentId: res?.data?.data.newAttachment?.id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((resp) => window.location.reload());
          });
      } catch (error) {
        console.log(error);
      }
    } else if (value.question) {
      try {
        axios
          .post(
            "https://challange.onrender.com/api/v1/question",
            {
              day: activeDay,
              text: value?.question,
              maxBall: value?.maxRate,
              attachmentId: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((resp) => window.location.reload());
      } catch (error) {
        console.log(error);
      }
    }
  };
  // Image Upload end

  return (
    <>
      {(isQuestionLoaded && <h1>siz savol yuklab bo'lgansiz</h1>) || (
        <Box sx={{ mt: 2 }}>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h4"
            component={"h4"}
          >
            Questions
          </Typography>
          <Grid container justifyContent={"center"} mt={4}>
            <Grid item lg={8}>
              <Box sx={{ textAlign: "center" }}>
                <Button type="primary" onClick={showModal}>
                  Add question
                </Button>
              </Box>

              <Modal
                title="Add question"
                open={isModalOpen}
                footer={null}
                width={700}
                onCancel={handleCancel}
              >
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Add question with text" {...a11yProps(0)} />
                      <Tab label="Add question with image" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <Form
                      layout="vertical"
                      name="basic"
                      onFinish={onFinish}
                      autoComplete="off"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Form.Item
                        label="Add question"
                        name="question"
                        rules={[
                          {
                            message: "Please enter your question",
                            required: true,
                          },
                        ]}
                        style={{ width: "100%" }}
                      >
                        <Input.TextArea maxLength={100} rows={5} />
                      </Form.Item>

                      <Form.Item
                        label="Max rate from 1 to 10"
                        name="maxRate"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your max rate!",
                          },
                        ]}
                        style={{ width: "100%" }}
                      >
                        <InputNumber
                          type={"number"}
                          min={1}
                          max={10}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>

                      <Form.Item style={{ width: "100%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            style={{ marginRight: 2 }}
                            type="primary"
                            htmlType="button"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Box>
                      </Form.Item>
                    </Form>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <Form
                      layout="vertical"
                      name="basic"
                      onFinish={onFinish}
                      autoComplete="off"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Form.Item
                        label="Upload Image"
                        name="img"
                        getValueFromEvent={normFile}
                        style={{ width: "100%" }}
                      >
                        <ImgCrop rotate>
                          <Upload
                            action=""
                            listType="picture-card"
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            beforeUpload={() => false}
                          >
                            {fileList.length <= 0 && "+ Upload"}
                          </Upload>
                        </ImgCrop>
                      </Form.Item>

                      <Form.Item
                        label="Max rate from 1 to 10"
                        name="maxRate"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your max rate!",
                          },
                        ]}
                        style={{ width: "100%" }}
                      >
                        <InputNumber
                          type={"number"}
                          min={1}
                          max={10}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>

                      <Form.Item style={{ width: "100%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            style={{ marginRight: 2 }}
                            type="primary"
                            htmlType="button"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Box>
                      </Form.Item>
                    </Form>
                  </TabPanel>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
