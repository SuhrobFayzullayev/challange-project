import { Box } from "@mui/material";
import React from "react";
import Footer from "../../Components/Footer/Footer";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";

export default function InActiveUser() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Navbar />
        <Main />
      </Box>
      <Footer />
    </div>
  );
}
