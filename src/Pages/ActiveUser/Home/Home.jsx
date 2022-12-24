import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

export default function Home() {
  const userRole = JSON.parse(localStorage.getItem("user"));

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
          children="S"
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
          <Typography variant="h6">
            {userRole.username}
          </Typography>
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
        </Box>
      </Box>
    </Box>
  );
}
