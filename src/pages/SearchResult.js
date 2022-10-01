import { Stack } from '@mui/system';
import axios from 'axios';
import LoadingProgress from 'components/LoadingProgress';
import SearchBox from 'components/SearchBox';
import { SERVER_URL } from '../config';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { VideoList } from '../components/VideoList';
import { Box } from '@mui/material';


export default function SearchResult() {
  const [videos, setVideos] = React.useState({ data: [], loading: false });
  const [searchParams] = useSearchParams();

  const q = searchParams.get('q');

  React.useEffect(() => {
    (async () => {
      document.title = 'search: ' + q;
      setVideos({ data: [], loading: true });
      const { data } = await axios(`${SERVER_URL}/search`, { params: { q } });
      setVideos({ data, loading: false });
    })();
  }, [q]);

  return (
    <Stack direction='column'>
      <LoadingProgress show={videos.loading} />
      <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <Box sx={{ width: '100%', position: 'absolute', top: 0, zIndex: 10 }}>
          <SearchBox />
        </Box>
      </Box>
      <Box sx={{ width: '100%', position: 'absolute', top: 120, }}>
        <VideoList videos={videos.data} />
      </Box>
    </Stack>
  );
}