import { Box, Stack } from '@mui/material';
import LoadingProgress from 'components/LoadingProgress';
import SearchBox from 'components/SearchBox';
import React from 'react';
import Logo from '../components/Logo';

export default function Home() {
  document.title = 'uTube';

  return (
    <>
      <LoadingProgress show={false} />
      <Stack sx={{ mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ height: 90 }}>
          <Logo />
        </Box>
        <Box sx={{ mt: 4, width: '90%', maxWidth: 768 }}>
          <SearchBox />
        </Box>
      </Stack>
    </>
  );
}