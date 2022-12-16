import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Timer from "../Timer/Timer";
export default function Layout() {
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
        <Header />
        <Timer />
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}
