import { Box, Stack } from '@mui/material';
import LoadingProgress from 'components/LoadingProgress';
import SearchBox from 'components/SearchBox';
import React from 'react';

export default function Home() {
  return (
    <Stack direction='column' sx={{ height: '100%' }}>
      <LoadingProgress show={false} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ top: '20%', position: 'absolute', width: '100%', maxWidth: 768 }}>
          <SearchBox />
        </Box>
      </Box>

    </Stack>
  );
}