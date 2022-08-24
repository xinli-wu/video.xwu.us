import React from 'react';
import './App.css';
import { VideoList } from 'pages/VideoList';
import SearchBox from 'components/SearchBox';
import { Box, LinearProgress } from '@mui/material';

function App() {

  const [videos, setVideos] = React.useState({ data: [], loading: false });

  return (
    <div className='App'>
      <Box>
        {videos.loading && <LinearProgress />}
        <SearchBox setVideos={setVideos} />
        <VideoList videos={videos.data} />
      </Box>
    </div>
  );
}

export default App;
