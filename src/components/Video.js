import { Box } from '@chakra-ui/react';
import { useRef } from 'react';
import './Video.css';
import VideoJS from './VideoJS';

window.HELP_IMPROVE_VIDEOJS = false;

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export default function Video() {

  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: `${SERVER_URL}/video/123`,
      type: 'video/mp4'
    }]
  };

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
      <h1>
        {`【小烏說案】徐州豐縣事件全網最詳細梳理！八孩母親身份抽絲剝繭，官方5份通告疑點重重，拐賣事件為何屢禁不止？ [Unsolved Mystery Stories | Xiaowu]`}
      </h1>
      <div className='player-wrapper'>
        {true &&
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        }
      </div>
    </Box>
  );
}
