import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import JsFileDownloader from "js-file-downloader";
import { Box } from "@mui/material";
import axios from "axios";
const AnswerModal = ({ isModalOpen, setIsModalOpen, value }) => {
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (newValue) => {
    const data = {
      rate: newValue?.rate,
      feedback: newValue?.feedback,
    };
    try {
      axios
        .patch(
          `https://challange.onrender.com/api/v1/tasks/${value.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        footer={false} 
        title={value?.username}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <button
          onClick={() =>
            new JsFileDownloader({
              url: `https://challange.onrender.com/${value.fileUrl}`,
            })
          }
        >
          file
        </button>

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
            label="Feedback"
            name="feedback"
            rules={[
              {
                message: "Please enter your feedback",
                required: true,
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input.TextArea maxLength={100} rows={5} />
          </Form.Item>

          <Form.Item
            label={`Max rate from 1 to ${value?.maxRate}`}
            name="rate"
            rules={[
              {
                required: true,
                message: "Please enter your rate!",
              },
            ]}
            style={{ width: "100%" }}
          >
            <InputNumber
              type={"number"}
              min={1}
              max={value?.maxRate}
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
              <Button type="ghost" htmlType="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Box>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AnswerModal;
