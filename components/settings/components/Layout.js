import React from "react";
import SideBar from "./SideBar";
import { Container, Box } from "@mui/material";
function Settings({ children }) {
  return (
    <Container sx={{ width: "100%", height: "100vh" }}>
      <SideBar />
      <Box sx={{ width: "100%", height: "100vh", mt: 10 }}>{children}</Box>
    </Container>
  );
}

export default Settings;
