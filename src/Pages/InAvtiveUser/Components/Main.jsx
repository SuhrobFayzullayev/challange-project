import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Timer from "../../../Components/Timer/Timer";
import { NavLink } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
export default function Main() {
  return (
    <Box mb={4}>
      <Timer />
      <Typography
        mx={"auto"}
        mt={3}
        align="center"
        sx={{ maxWidth: 600 }}
        variant="h6"
        component="div"
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa ullam
        magnam consequatur voluptatibus, praesentium minus laudantium neque,
        expedita excepturi ab sed aspernatur sint soluta nemo rem incidunt
        libero. Cum, rerum.
      </Typography>
      <Box
        sx={{
          maxWidth: 400,
          display: "flex",
          justifyContent: "space-between",
        }}
        mx={"auto"}
        mt={4}
      >
        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Typography
            variant="p"
            component="div"
            children="Do you have an account?"
            mb={1}
          />

          <Button variant="contained">
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/auth/login"
              children="Login"
            />
          </Button>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Typography
            variant="p"
            component="div"
            children="Not a member yet?"
            mb={1}
          />
          <Button variant="contained">
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to="/auth/register"
              children="Register"
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
