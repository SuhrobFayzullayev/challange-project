import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
export default function Question() {
  return (
    <Box maxWidth={500} mx={"auto"} p={2}>
      <Box p={2} border={1} sx={{ borderRadius: 8 }}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, ut
          officia sequi debitis fugit maiores hic error excepturi sint est vero
          obcaecati molestiae. Repudiandae iste cum, quibusdam quidem provident
          commodi.
        </Typography>
      </Box>
      <Box mt={1} sx={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
        <Typography>Homework.png</Typography>
        <IconButton ml={2}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box
        mt={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button sx={{ width: "40%" }} variant="contained">
          Upload
        </Button>
        <Button sx={{ width: "40%" }} variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
