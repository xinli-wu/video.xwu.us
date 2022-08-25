import { Box, Stack } from '@mui/material';
import SearchBox from 'components/SearchBox';
import React from 'react';

export default function Home() {
  return (
    <Stack direction='column' sx={{ height: '100%' }}>
      <div style={{ height: 4 }}></div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ top: '20%', position: 'absolute', width: '100%', maxWidth: 768 }}>
          <SearchBox />
        </Box>
      </div>

    </Stack>
  );
}