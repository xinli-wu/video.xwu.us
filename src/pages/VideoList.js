import { Box, Grid } from '@mui/material';
import { NativeVideo } from 'components/NativeVideo';
import React from 'react';

export const VideoList = ({ videos }) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {videos.map((x, i) => (
          <Grid item xs={1} sm={4} md={4} key={i}>
            <NativeVideo video={x} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
