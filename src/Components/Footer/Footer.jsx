import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box
      py={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "aqua",
      }}
    >
      <Typography variant="p" component="div">
        CHALLENGE ©2022-2023 
      </Typography>
      <Typography variant="p" component="div" mb={0.5} mx={1}>
        |
      </Typography>
      <Typography variant="p" component="div">
        Made with Perfect Result Group ❤️
      </Typography>
    </Box>
  );
}
