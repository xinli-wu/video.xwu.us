import { Box, Stack } from '@mui/material';
import axios from 'axios';
import { NativeVideo } from 'components/NativeVideo';
import SearchBox from 'components/SearchBox';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;


export default function Watch() {
  const [searchParams] = useSearchParams();
  const v = searchParams.get('v');

  const [info, setInfo] = React.useState();

  React.useEffect(() => {
    (async () => {
      const res = await axios(`${SERVER_URL}/info`, { params: { v } });
      setInfo(res.data);
    })();
  }, [info, v]);

  return (
    <Stack direction='column'>
      <div style={{ height: 4 }}></div>
      <SearchBox />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        {info?.error && <p>Video is not available to play</p>}
        {info?.videoDetails &&
          <NativeVideo
            v={v}
            title={info.videoDetails.title}
            poster={info.videoDetails.thumbnails[2].url}
          />
        }
      </Box>
    </Stack>
  );
}