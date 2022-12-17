import React, { useState } from "react";
import { Avatar, Button, Table } from "antd";
import { Box, Grid, Pagination, Typography } from "@mui/material";
const data = [
  { name: "Suhrob", score: 20 },
  { name: "Jasur", score: 30 },
  { name: "Ali", score: 50 },
  { name: "Ali", score: 50 },
  { name: "Alijon", score: 50 },
  { name: "Vali", score: 5 },
  { name: "Vali", score: 5 },
  { name: "Vali", score: 5 },
  { name: "Aziz", score: 10 },
  { name: "Aziz", score: 10 },
  { name: "Aziz", score: 10 },
  { name: "Umid", score: 20 },
  { name: "Umid", score: 20 },
];

data.sort((first, second) => first.score - second.score).reverse();

let maxIndex = new Array();
let maxPoints = new Array();

function findLargest3() {
  maxPoints[0] = 0;
  maxPoints[1] = 0;
  maxPoints[3] = 0;
  maxPoints[4] = 0;
  maxPoints[5] = 0;
  maxPoints[6] = 0;
  maxPoints[7] = 0;
  maxPoints[8] = 0;
  maxPoints[9] = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[0]) {
      maxPoints[0] = data[i].score;
      maxIndex[0] = i;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[1] && data[i].score < maxPoints[0]) {
      maxPoints[1] = data[i].score;
      maxIndex[1] = i;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[2] && data[i].score < maxPoints[1]) {
      maxPoints[2] = data[i].score;
      maxIndex[2] = i;
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[2] && data[i].score < maxPoints[1]) {
      maxPoints[3] = data[i].score;
      maxIndex[3] = i;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[2] && data[i].score < maxPoints[1]) {
      maxPoints[4] = data[i].score;
      maxIndex[4] = i;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[2] && data[i].score < maxPoints[1]) {
      maxPoints[5] = data[i].score;
      maxIndex[5] = i;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[2] && data[i].score < maxPoints[1]) {
      maxPoints[6] = data[i].score;
      maxIndex[6] = i;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[2] && data[i].score < maxPoints[1]) {
      maxPoints[7] = data[i].score;
      maxIndex[7] = i;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[2] && data[i].score < maxPoints[1]) {
      maxPoints[8] = data[i].score;
      maxIndex[8] = i;
    }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].score > maxPoints[2] && data[i].score < maxPoints[1]) {
      maxPoints[9] = data[i].score;
      maxIndex[9] = i;
    }
  }
}

findLargest3();

const Tournament = () => {
  return (
    <Box mx={"auto"} maxWidth={500} mt={3}>
      {data.map((v, i) => (
        <Box
          key={i}
          my={0.5}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            width={"10%"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar>S</Avatar>
          </Box>
          <Box
            width={"90%"}
            px={2}
            py={0.5}
            sx={{
              boxShadow: 1,
              borderRadius: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box width={"55%"} sx={{ overflow: "hidden" }}>
              <Typography variant="p">{v.name}</Typography>
            </Box>
            <Box width={"20%"}>
              <Typography variant="p">{v.score}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              width={"20%"}
            >
              {i + 1 == 1 ? (
                <Typography variant="p">{i + 1} st</Typography>
              ) : i + 1 == 2 ? (
                <Typography variant="p">{i + 1} nd</Typography>
              ) : i + 1 == 3 ? (
                <Typography variant="p">{i + 1} rd</Typography>
              ) : (
                <Typography variant="p">{i + 1} th</Typography>
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default Tournament;
