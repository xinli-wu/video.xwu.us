import { Box, LinearProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { decode } from 'html-entities';
import React, { useRef } from 'react';
import { useNavigate, useLocation, matchPath, createSearchParams } from 'react-router-dom';
import './Video.css';
import VideoJS from './VideoJS';

window.HELP_IMPROVE_VIDEOJS = false;

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;

export default function Video({ v, title, poster }) {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [format, setFormat] = React.useState({ data: undefined, loading: false });
  const [videoJsOptions, setVideoJsOptions] = React.useState({});

  React.useEffect(() => {
    (async () => {
      setFormat({ data: undefined, loading: true });
      const { data } = await axios(`${SERVER_URL}/format`, { params: { v } });

      setVideoJsOptions({
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: `${SERVER_URL}/watch?v=${v}`,
          type: data?.mimeType
        }]
      });

      setFormat({ data, loading: false });
    })();
  }, [v]);

  const onTitleClick = (e) => {
    e.preventDefault();

    if (!matchPath(pathname, '/watch')?.pathname) {
      navigate({ pathname: '/watch', search: `?${createSearchParams({ v })}` });
    }
  };

  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      player.log('player is waiting');
    });

    player.on('dispose', () => {
      player.log('player will dispose');
    });
  };

  return (
    <Box>
      <Box sx={{ height: 4 }}>
        {format.loading && <LinearProgress />}
      </Box>
      <Paper sx={{ alignItems: 'center', minHeight: 220, width: '100%', borderRadius: '4px 4px 0px 0px', overflow: 'hidden' }} >
        {format.data && (
          <div className='player-wrapper' >
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
        )}
        <Box onClick={onTitleClick} sx={{ cursor: 'pointer', p: 1 }}>
          {title && <Typography variant='subtitle2' textAlign="left" >{decode(title)}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
};
