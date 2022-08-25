import { LinearProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { createSearchParams, matchPath, useLocation, useNavigate } from 'react-router-dom';
import './Video.css';

window.HELP_IMPROVE_VIDEOJS = false;

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;

export const NativeVideo = ({ v, title, poster }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [format, setFormat] = React.useState();

  React.useEffect(() => {
    (async () => {
      const res = await axios(`${SERVER_URL}/format`, { params: { v } });
      setFormat(res.data);
    })();
  }, [v]);

  const onTitleClick = (e) => {
    e.preventDefault();

    if (!matchPath(pathname, '/watch')?.pathname) {
      navigate({ pathname: '/watch', search: `?${createSearchParams({ v })}` });
    }
  };

  return (
    <Paper
      sx={{ p: 1, alignItems: 'center' }}
      style={{ minHeight: 256 }}
    >
      {!(title && format) && <LinearProgress />}
      {format && (
        <video style={{ width: '100%' }} controls poster={poster} preload="none" controlsList="nodownload">
          <source src={`${SERVER_URL}/watch?v=${v}`} type={format.mimeType} />
          Your browser does not support HTML video.
        </video>
      )}
      <div onClick={onTitleClick} style={{ cursor: 'pointer' }}>
        <Typography variant='subtitle2' textAlign="left" >{title}</Typography>
      </div>
    </Paper>
  );
};
