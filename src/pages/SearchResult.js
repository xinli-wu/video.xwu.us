import { LinearProgress } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import SearchBox from 'components/SearchBox';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { VideoList } from '../components/VideoList';

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;

export default function SearchResult() {
  const [videos, setVideos] = React.useState({ data: [], loading: false });
  const [searchParams] = useSearchParams();

  const q = searchParams.get('q');

  React.useEffect(() => {
    (async () => {
      setVideos({ data: [], loading: true });
      const { data } = await axios(`${SERVER_URL}/search`, { params: { q } });
      setVideos({ data, loading: false });
    })();
  }, [q]);

  return (
    <Stack direction='column'>
      <div style={{ height: 4 }}>
        {videos.loading && <LinearProgress />}
      </div>
      <SearchBox />
      <VideoList videos={videos.data} />
    </Stack>
  );
}