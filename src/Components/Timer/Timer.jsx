import { Typography, Box } from "@mui/material";
import React from "react";

export default function Timer() {
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
          2
        </Typography>
        <Typography variant="h5" mb={0.7} ml={0.5} component="div">
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
        <Typography variant="h5" mb={0.7} ml={0.5} component="div">
          18 : 13 : 47 : 45
        </Typography>
      </Box>
    </Box>
  );
}
