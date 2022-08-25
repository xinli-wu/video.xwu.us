import axios from 'axios';
import React, { useRef } from 'react';
import './Video.css';
import VideoJS from './VideoJS';

window.HELP_IMPROVE_VIDEOJS = false;

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;

export default function Video({ videoId }) {

  const [info, setInfo] = React.useState();
  const [format, setFormat] = React.useState();
  const [videoJsOptions, setVideoJsOptions] = React.useState();

  React.useEffect(() => {
    (async () => {
      const res = await axios(`${SERVER_URL}/info`, { params: { v: videoId } });
      setInfo(res.data);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const res = await axios(`${SERVER_URL}/format`, { params: { v: videoId } });
      setFormat(res.data);
    })();
  }, []);

  React.useEffect(() => {
    if (format) {
      setVideoJsOptions({
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: `${SERVER_URL}/${videoId}`,
          type: format.mimeType
        }]
      });
    }
  }, [format]);

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
    <>
      {info && <p>{info?.videoDetails?.title}</p>}
      {videoJsOptions && (
        <div className='player-wrapper'>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
      )}
    </>
  );
};
