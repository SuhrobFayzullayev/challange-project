import { Avatar, Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Home() {
  const userRole = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({});
  const [start, setStart] = useState(false);
  const [data, setData] = useState([]);

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
            if (v.day == JSON.parse(localStorage.getItem("activeDay"))) {
              v?.tasks?.map((val) => {
                if (val.rate && val.feedback) {
                  axios
                    .get(
                      `https://challange.onrender.com/api/v1/users/${val?.userId}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    )
                    .then((response) => {
                      setUser((prev) => ({
                        ...prev,
                        rate: val?.rate,
                        username: response?.data?.data?.userById?.username,
                        place: 0,
                        feedback: val.feedback,
                      }));
                    });
                }
              });
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (start) {
      const copy = [...data];
      copy.push(user);
      let uniq = {};
      let arrFiltered = copy.filter(
        (obj) => !uniq[obj.username] && (uniq[obj.username] = true)
      );

      setData(arrFiltered);
    } else {
      setStart(true);
    }
  }, [user]);

  let newData = [...data];
  newData.sort((first, second) => first?.rate - second?.rate).reverse();
  let maxPoints = new Array();

  function findLargest() {
    maxPoints[0] = 0;
    maxPoints[1] = 0;
    maxPoints[2] = 0;
    maxPoints[3] = 0;
    maxPoints[4] = 0;
    maxPoints[5] = 0;
    maxPoints[6] = 0;
    maxPoints[7] = 0;
    maxPoints[8] = 0;
    maxPoints[9] = 0;

    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[0]) {
        maxPoints[0] = newData[i].rate;
        newData[i].place = 1;
      }

    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[1] && newData[i].rate < maxPoints[0]) {
        maxPoints[1] = newData[i].rate;
        newData[i].place = 2;
      }

    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[2] && newData[i].rate < maxPoints[1]) {
        maxPoints[2] = newData[i].rate;
      }

    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[3] && newData[i].rate < maxPoints[2]) {
        maxPoints[3] = newData[i].rate;
      }

    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[4] && newData[i].rate < maxPoints[3]) {
        maxPoints[4] = newData[i].rate;
      }
    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[5] && newData[i].rate < maxPoints[4]) {
        maxPoints[5] = newData[i].rate;
      }

    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[6] && newData[i].rate < maxPoints[5]) {
        maxPoints[6] = newData[i].rate;
      }

    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[7] && newData[i].rate < maxPoints[6]) {
        maxPoints[7] = newData[i].rate;
      }

    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[8] && newData[i].rate < maxPoints[7]) {
        maxPoints[8] = newData[i].rate;
      }

    for (let i = 0; i < newData.length; i++)
      if (newData[i].rate > maxPoints[9] && newData[i].rate < maxPoints[8]) {
        maxPoints[9] = newData[i].rate;
      }
  }
  findLargest();

  newData?.map(
    (v) =>
      (v.rate == maxPoints[0] && (v.place = "1 st")) ||
      (v.rate == maxPoints[1] && (v.place = "2 nd")) ||
      (v.rate == maxPoints[2] && (v.place = "3 rd")) ||
      (v.rate == maxPoints[3] && (v.place = "4 th")) ||
      (v.rate == maxPoints[4] && (v.place = "5 th")) ||
      (v.rate == maxPoints[5] && (v.place = "6 th")) ||
      (v.rate == maxPoints[6] && (v.place = "7 th")) ||
      (v.rate == maxPoints[7] && (v.place = "8 th")) ||
      (v.rate == maxPoints[8] && (v.place = "9 th")) ||
      (v.rate == maxPoints[9] && (v.place = "10 th"))
  );

  localStorage.setItem("daily", JSON.stringify(newData));

  let daily = JSON.parse(localStorage.getItem("daily"));
  return (
    <Box
      height={250}
      my={2}
      mx={"auto"}
      width={350}
      sx={{ border: "1px solid white", position: "relative" }}
    >
      <Box sx={{ position: "absolute", top: 0, width: "100%" }}>
        <Avatar
          children={userRole.username.slice(0, 1)}
          sx={{
            mx: "auto",
            width: 120,
            height: 120,
          }}
        />
      </Box>

      <Box
        mt={11}
        sx={{
          border: 1,
          borderRadius: 7,
        }}
        p={1}
      >
        <Box mt={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">{userRole.username}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box width={"45%"}>
            <Typography ml={1} variant="p" component="span">
              Tournament
            </Typography>
            <Box
              px={1}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography mt={0.8} variant="p">
                Place
              </Typography>
              <Typography variant="p">
                <span style={{ fontSize: "22px" }}>3</span>rd
              </Typography>
            </Box>
            <Box
              px={1}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography mt={0.8} variant="p">
                Score
              </Typography>
              <Typography variant="p">
                <span style={{ fontSize: "22px" }}>3</span>
              </Typography>
            </Box>
          </Box>
          <Box border={1} height={100} sx={{ backgroundColor: "black" }}></Box>
          <Box width={"45%"}>
            <Typography ml={10.5} variant="p" component="span">
              Today's
            </Typography>
            <Box
              px={1}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography mt={0.8} variant="p">
                Place
              </Typography>
              <Typography variant="p">
                {(daily?.filter((val) => val.username == userRole.username)
                  .length > 0 &&
                  daily?.map((value) => {
                    if (!JSON.parse(localStorage.getItem("removeFeedback")))
                      localStorage.setItem(
                        "feedback",
                        JSON.stringify(value?.feedback)
                      );
                    return (
                      <span style={{ fontSize: "22px" }}>{value.place}</span>
                    );
                  })) ||
                  "siz javob bermagansiz"}
              </Typography>
            </Box>
            <Box
              px={1}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography mt={0.8} variant="p">
                Score
              </Typography>
              <Typography variant="p">
                {(daily?.filter((val) => val.username == userRole.username)
                  .length > 0 &&
                  daily?.map((value) => (
                    <span style={{ fontSize: "22px" }}>{value.rate}</span>
                  ))) ||
                  "siz javob bermagansiz"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
