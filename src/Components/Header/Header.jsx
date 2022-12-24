import React, { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import NotificationsIcon from "@mui/icons-material/Notifications";

const userRole = JSON.parse(localStorage.getItem("user"));
export default function Header() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserName(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  console.log(userName);
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Box
          py={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CHALLENGE
            </Typography>
          </Box>
          <Box
            sx={{
              width: 450,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              children="Home"
              to="/user"
            />
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              children="Question"
              to="/user/question"
            />
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              children="Tournament"
              to="/user/tournament"
            />
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              children="Daily Tournament"
              to="/user/daily-tournament"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              mr={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton size="large" color="inherit" sx={{ mr: 2 }}>
                <Badge badgeContent={7} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Avatar src="" children="S" />
              <Typography variant="h6" component="div" mx={1}>
                {userName[0]?.user?.username}
                {userRole.username}
              </Typography>
            </Box>
            <NavLink
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
              to="/"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              <LoginSharpIcon sx={{ mr: 1 }} />
            </NavLink>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
