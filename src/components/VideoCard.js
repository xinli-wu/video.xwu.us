import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { createSearchParams, matchPath, useLocation, useNavigate } from 'react-router-dom';
import './Video.css';
import { decode } from 'html-entities';

window.HELP_IMPROVE_VIDEOJS = false;

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;

export const VideoCard = ({ v, title, poster }) => {
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
      <Paper onClick={onTitleClick} sx={{ alignItems: 'center', minHeight: 220, cursor: 'pointer' }}>
        {format.data && <img alt='' style={{ width: '100%', borderRadius: '4px 4px 0px 0px' }} src={poster} />}
        <Box sx={{ p: 1 }}>
          {title && <Typography variant='subtitle2' textAlign="left" >{decode(title)}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
};
