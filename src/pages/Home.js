import { Stack } from '@mui/material';
import SearchBox from 'components/SearchBox';
import React from 'react';

export default function Home() {
  return (
    <Stack direction='column'>
      <div style={{ height: 4 }}></div>
      <SearchBox />
    </Stack>
  );
}