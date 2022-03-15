import { Box } from '@chakra-ui/react';
import './Video.css';

export default function Video() {
  return (
    <Box>
      <h1>
        {`【小烏說案】徐州豐縣事件全網最詳細梳理！八孩母親身份抽絲剝繭，官方5份通告疑點重重，拐賣事件為何屢禁不止？ [Unsolved Mystery Stories | Xiaowu]`}
      </h1>
      <div className='player-wrapper'>
        <video controls>
          <source src='/assets/video/001.mp4' type='video/mp4' />
        </video>
      </div>
    </Box>
  );
}
