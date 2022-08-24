import { LinearProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import './Video.css';

window.HELP_IMPROVE_VIDEOJS = false;

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;

export const NativeVideo = ({ video }) => {

  const thumbnailUrl = `${SERVER_URL}/thumbnail/${encodeURIComponent(video.snippet.thumbnails.medium.url)}`;

  const [format, setFormat] = React.useState();

  React.useEffect(() => {
    (async () => {
      const res = await axios(`${SERVER_URL}/format/${video.id.videoId}`);
      setFormat(res.data);
    })();
  }, [video]);

  return (
    <Paper
      sx={{ p: 1, alignItems: 'center' }}
      style={{ minHeight: 256 }}
    >
      {!(video?.snippet?.title && format) && <LinearProgress />}
      {format && (
        <video style={{ width: '100%' }} controls poster={thumbnailUrl} preload="none">
          <source src={`${SERVER_URL}/watch?v=${video.id.videoId}`} type={format.mimeType} />
          Your browser does not support HTML video.
        </video>
      )}
      <Typography variant='subtitle2' textAlign="left" >{video.snippet.title}</Typography>
    </Paper>

  );
};
