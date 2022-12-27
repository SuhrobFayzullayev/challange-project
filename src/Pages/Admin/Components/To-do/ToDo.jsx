import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
export default function ToDo() {
  const [activeDayData, setActiveDayData] = useState([]);
  const [yesterdayData, setYesterdayData] = useState([]);
  const [dayBeforeNightData, setDayBeforeNightData] = useState([]);
  const [start1, setStart1] = useState(false);
  const [start2, setStart2] = useState(false);
  const [star3, setStart3] = useState(false);
  const onChange = (key) => {};

  useEffect(() => {
    try {
      axios
        .get("https://challange.onrender.com/api/v1/question", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          res.data.data.allQuestion.content.map((v) => {
            if (v.day == JSON.parse(localStorage.getItem("activeDay")))
              setActiveDayData(v);
            else if (v.day == JSON.parse(localStorage.getItem("activeDay")) - 1)
              setYesterdayData(v);
            else if (v.day == JSON.parse(localStorage.getItem("activeDay")) - 2)
              setDayBeforeNightData(v);
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Box>
      <Box
        sx={{
          width: 300,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NavLink to="/dashboard/todo/today" children="Today" />
        <NavLink to="/dashboard/todo/yesterday" children="Yesterday" />
        <NavLink
          to="/dashboard/todo/yesterday-before"
          children="Yesterday Before"
        />
      </Box>
      <Outlet />
    </Box>
  );
}
