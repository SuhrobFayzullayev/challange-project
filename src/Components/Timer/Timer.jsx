import { Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

try {
  axios
    .get("https://challange.onrender.com/api/v1/calendars/3", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      localStorage.setItem(
        "calendar",
        JSON.stringify(res.data.data.CalendarById)
      );
    });
} catch (error) {
  console.log(error);
}

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalState, setIntervalState] = useState("");

  const { month, day, year, time, totalDay } = JSON.parse(
    localStorage.getItem("calendar")
  );
  const deadline = `${month}, ${day}, ${year}, ${time.slice(0, 2).trim()}:${time
    .slice(3, 5)
    .trim()}`;

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    setIntervalState(setInterval(() => getTime(), 1000));
    return () => clearInterval(intervalState);
  }, []);

  useEffect(() => {
    if (seconds < 1 && minutes < 1 && hours < 1 && days < 1) {
      clearInterval(intervalState);
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  }, [seconds]);

  return (
    <Box mt={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h3" component="div">
          {totalDay - days}
        </Typography>
        <Typography variant="h5" mb={0.7} ml={0.5} component="div">
          /{totalDay}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h5" mb={0.7} ml={0.5} component="div">
          {days < 10 ? "0" + days : days} : {hours < 10 ? "0" + hours : hours} :{" "}
          {minutes < 10 ? "0" + minutes : minutes} :{" "}
          {seconds < 10 ? "0" + seconds : seconds}
        </Typography>
      </Box>
    </Box>
  );
};

export default Timer;
