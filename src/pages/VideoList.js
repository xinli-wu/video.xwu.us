import { Box } from '@mui/material';
import { NativeVideo } from 'components/NativeVideo';
import React from 'react';

export const VideoList = () => {

  const videos = ['vX6AaW65QJ8', 'vX6AaW65QJ8'];

  return (
    <div>
      <Box>
        {videos.map((x, i) => (
          <NativeVideo key={i} videoId={x} />
        ))}
      </Box>
    </div>
  );
};
