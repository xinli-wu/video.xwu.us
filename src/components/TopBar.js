import { Box } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import BackBtn from './BackBtn';
import ColorModeSwitch from './ColorModeSwitch';
import Logo from './Logo';

export default function TopBar() {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: 40,
        justifyContent: 'space-between',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <BackBtn />
      {pathname !== '/' && <Logo />}
      <ColorModeSwitch />
    </Box>
  );
}
