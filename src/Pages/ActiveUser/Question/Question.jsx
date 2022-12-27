import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Form, Upload, Button, message } from "antd";
export default function Question() {
  const [tasks, setTasks] = useState([]);
  const [questionId, setQuestionId] = useState(0);
  const [isQuestionLoaded, setIsQuestionLoaded] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionUrl, setQuestionUrl] = useState("");

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"));

    axios
      .get("https://challange.onrender.com/api/v1/question", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        res.data.data.allQuestion.content.map((v) => {
          if (v.day == JSON.parse(localStorage.getItem("activeDay"))) {
            setQuestionId(v.id);
            v.tasks.filter(
              (value) => value.userId == userId.id && setTasks([value])
            );

            setIsQuestionLoaded(true);

            if (v.text) {
              setQuestionText(v.text);
            } else {
              axios
                .get(
                  `https://challange.onrender.com/api/v1/attachments/${v.attachmentId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                )
                .then((res) =>
                  setQuestionUrl(res.data.data.attachmentById.name)
                );
            }
          }
        });
      });
  }, []);

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

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = () => {
    const userId = JSON.parse(localStorage.getItem("user"));
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
                "https://challange.onrender.com/api/v1/tasks",
                {
                  attachmentId: res?.data?.data.newAttachment?.id,
                  questionId: questionId,
                  userId: userId.id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then(() => {
                messageApi.open({
                  type: "success",
                  content: "Your file has been sent successfully",
                });
                window.location.reload();
              });
          });
      } catch (error) {
        console.log(error);
      }
    } else
      messageApi.open({
        type: "error",
        content: "Please upload zip file",
      });
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Box maxWidth={500} mx={"auto"} p={2}>
      {(isQuestionLoaded && (
        <>
          {tasks.length > 0 ? (
            <h1>Siz javob berdingiz</h1>
          ) : (
            <>
              <Box p={2} border={1} sx={{ borderRadius: 8 }}>
                <Typography>
                  {questionText || (
                    <img
                    style={{width: "100%"}}
                      src={`https://challange.onrender.com/${questionUrl}`}
                    />
                  )}
                </Typography>
              </Box>
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
                  name="zip"
                  getValueFromEvent={normFile}
                  style={{ width: "100%" }}
                >
                  <Box
                    sx={{
                      mt: 2,
                      width: "fit-content",
                      px: 2,
                      border: 1,
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Upload
                      action=""
                      listType="text"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                      beforeUpload={() => false}
                      style={{ display: "flex", alignItems: "center" }}
                      maxCount={1}
                    >
                      {fileList.length <= 0 && "+ Upload"}
                    </Upload>
                  </Box>
                </Form.Item>

                <Form.Item style={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      style={{ marginTop: -70 }}
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                </Form.Item>
              </Form>
            </>
          )}
        </>
      )) || <h1>bugungi savol tez orada yuklanadi</h1>}
    </Box>
  );
}
