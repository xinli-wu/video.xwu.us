import React from 'react';
import './App.css';
import { VideoList } from 'pages/VideoList';
import SearchBox from 'components/SearchBox';
import { Box } from '@mui/material';

function App() {
  return (
    <div className='App'>
      <Box>
        <SearchBox />
        <VideoList />
      </Box>
    </div>
  );
}

export default App;
