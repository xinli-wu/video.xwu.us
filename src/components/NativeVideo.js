import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { createSearchParams, matchPath, useLocation, useNavigate } from 'react-router-dom';
import './Video.css';
import { decode } from 'html-entities';

window.HELP_IMPROVE_VIDEOJS = false;

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;

export const NativeVideo = ({ v, title, poster }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [format, setFormat] = React.useState({ data: undefined, loading: false });

  React.useEffect(() => {
    (async () => {
      setFormat({ data: undefined, loading: true });
      const { data } = await axios(`${SERVER_URL}/format`, { params: { v } });
      setFormat({ data, loading: false });
    })();
  }, [v]);

  const onTitleClick = (e) => {
    e.preventDefault();

    if (!matchPath(pathname, '/watch')?.pathname) {
      navigate({ pathname: '/watch', search: `?${createSearchParams({ v })}` });
    }
  };

  return (
    <Box>
      <Box sx={{ height: 4 }}>
        {format.loading && <LinearProgress />}
      </Box>
      <Paper sx={{ alignItems: 'center', minHeight: 220 }}>
        {format.data && (
          <video style={{ width: '100%', borderRadius: '4px 4px 0px 0px' }} controls poster={poster} preload="none" controlsList="nodownload">
            <source src={`${SERVER_URL}/watch?v=${v}`} type={format.data.mimeType} />
            Your browser does not support HTML video.
          </video>
        )}
        <Box onClick={onTitleClick} sx={{ cursor: 'pointer', p: 1 }}>
          {title && <Typography variant='subtitle2' textAlign="left" >{decode(title)}</Typography>}
        </Box>
      </Paper>
    </Box>

  );
};
