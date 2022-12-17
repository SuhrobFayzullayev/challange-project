import React from "react";
import { Tabs } from 'antd';
import { Box } from "@mui/material";
import TodDoUi from "./Data/ToDoUi/TodDoUi";
import { firstDay, secondDay, thirdDay } from "./Data/Data";




export default function ToDo() {
  const onChange = (key) => {
    console.log(key);
  }
  return (
    <Box> 

<Tabs
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      {
        label: `Tab 1`,
        key: '1',
        children: <TodDoUi dataTabs={firstDay} />,
      },
      {
        label: `Tab 2`,
        key: '2',
        children: <TodDoUi dataTabs={secondDay}/>
      },
      {
        label: `Tab 3`,
        key: '3',
        children: <TodDoUi dataTabs={thirdDay}/>
      },
    ]}
  />

    </Box>

  );
}