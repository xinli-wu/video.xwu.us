import { Box } from "@mui/material";
import React from "react";
import BackBtn from "./BackBtn";
import ColorModeSwitch from "./ColorModeSwitch";

function TopBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <BackBtn />
      <ColorModeSwitch />
    </Box>
  );
}

export default TopBar;