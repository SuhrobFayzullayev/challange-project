import * as React from "react";
import { AppBar, Container, Typography, Toolbar, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Box
          py={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 1000,
            mx: "auto",
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
          <NavLink
            style={{
              color: "white",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            to="/auth/login"
          >
            <LoginSharpIcon sx={{ mr: 1 }} />
            Kirish
          </NavLink>
        </Box>
      </Container>
    </AppBar>
  );
}
