import React, { useEffect, useState } from "react";
import { Avatar, Button, Table } from "antd";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import axios from "axios";

const Tournament = () => {
  const newData = JSON.parse(localStorage.getItem("daily"));
  return (
    <Box mx={"auto"} mb={2} maxWidth={500} mt={3}>
      {newData.map((v, i) => (
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
            <Avatar>{v?.username.slice(0, 1)}</Avatar>
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
              <Typography variant="p">{v.username}</Typography>
            </Box>
            <Box width={"20%"}>
              <Typography variant="p">{v.rate}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              width={"20%"}
            >
              {v?.place}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default Tournament;
