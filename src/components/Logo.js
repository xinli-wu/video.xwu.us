import { useTheme } from '@mui/material';
import React from 'react';
import LogoHubDarkH from '../assets/images/logo/logoHubDarkH.png';
import LogoHubLightH from '../assets/images/logo/logoHubLightH.png';
import LogoTubeDarkH from '../assets/images/logo/logoTubeDarkH.png';
import LogoTubeLightH from '../assets/images/logo/logoTubeLightH.png';
import LogoHubDarkV from '../assets/images/logo/logoHubDarkV.png';
import LogoHubLightV from '../assets/images/logo/logoHubLightV.png';
import LogoTubeDarkV from '../assets/images/logo/logoTubeDarkV.png';
import LogoTubeLightV from '../assets/images/logo/logoTubeLightV.png';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();
  const location = useLocation();

  const altLogo = 0;// Math.floor(Math.random() * 2);
  const theme = useTheme();
  const mode = theme.palette.mode;

  const logoH = {
    'dark': [LogoHubDarkH, LogoTubeDarkH],
    'light': [LogoHubLightH, LogoTubeLightH]
  };

  const logoV = {
    'dark': [LogoHubDarkV, LogoTubeDarkV],
    'light': [LogoHubLightV, LogoTubeLightV]
  };

  const favicon = document.getElementById("favicon");
  if (favicon) favicon.href = logoV[mode][altLogo];

  const onLogoClick = (e) => {
    if (location.pathname !== '/') navigate({ pathname: '/' });
  };

  return (
    <img src={logoH[mode][altLogo]} alt='Logo' onClick={onLogoClick} style={{ cursor: 'pointer', height: '100%' }} />
  );
}
