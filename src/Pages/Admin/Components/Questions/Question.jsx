import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button, Input, InputNumber, Modal } from "antd";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';


// TabPanel Start

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
          <Typography>{children}</Typography>
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

// Data start
  const initialState = {
    text:"",
    maxRate: "",
    imgUrl:""
  }
// Data end

export default function Questions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [data, setData] = useState(initialState)


//   Modal Function start

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//   Modal Function end

// Image Upload start
const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image',
      status: 'done',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
    },
  ]);
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

// Image Upload end



  return (
    <Box sx={{mt:2}}>
      <Typography sx={{ textAlign: "center" }} variant="h4" component={"h4"}>
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
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
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
              <TabPanel value={value} index={0} >

                <Input.TextArea maxLength={100} rows={10} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ImgCrop rotate>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={() => false}
                  >
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </TabPanel>
              <Box sx={{mt:3}}>
              <Typography>Max Rate</Typography>
              <InputNumber type={"number"} min={1} max={10} style={{width:"100%"}}/>
              </Box>
            
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
}
