import { Box, Grid } from '@mui/material';
import { NativeVideo } from 'components/NativeVideo';
import React from 'react';

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;


export const VideoList = ({ videos }) => {

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {videos.map((video, i) => {
          const { id, snippet } = video;
          const thumbnailUrl = `${SERVER_URL}/thumbnail?url=${encodeURIComponent(snippet.thumbnails.medium.url)}`;

          return (
            <Grid item xs={1} sm={4} md={4} key={i}>
              <NativeVideo v={id.videoId} title={snippet.title} poster={thumbnailUrl} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};