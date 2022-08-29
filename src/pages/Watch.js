import { Box, LinearProgress, Stack } from '@mui/material';
import axios from 'axios';
import SearchBox from 'components/SearchBox';
import Video from 'components/Video';
import { decode } from 'html-entities';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;


export default function Watch() {
  const [searchParams] = useSearchParams();
  const v = searchParams.get('v');

  const [info, setInfo] = React.useState({ data: undefined, loading: false });

  React.useEffect(() => {
    (async () => {
      setInfo({ data: undefined, loading: true });
      const { data } = await axios(`${SERVER_URL}/info`, { params: { v } });
      setInfo({ data, loading: false });

      document.title = data.videoDetails.title;

    })();
  }, [v]);

  return (
    <Stack direction='column'>
      <div style={{ height: 4 }}>
        {info.loading && <LinearProgress />}
      </div>
      <SearchBox />
      <Box sx={{ flexGrow: 1, m: 2 }}>
        {info?.data?.error && <p>Video is not available to play</p>}
        {info?.data?.videoDetails &&
          <Video
            v={v}
            title={decode(info.data.videoDetails.title)}
            poster={info.data.videoDetails.thumbnails[2].url}
          />
        }
      </Box>
    </Stack>
  );
}