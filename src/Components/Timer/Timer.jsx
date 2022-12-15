import { Typography, Box } from "@mui/material";
import React from "react";

export default function Timer() {
  return (
    <Box mt={2}> 
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h2" component="div">
          2
        </Typography>
        <Typography variant="h4" mb={0.7} ml={0.5} component="div">
          /10
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h4" mb={0.7} ml={0.5} component="div">
          19 : 13 : 47 : 45
        </Typography>
      </Box>
    </Box>
  );
}