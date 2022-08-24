import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { Paper } from '@mui/material';
import * as React from 'react';
import axios from 'axios';

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/yt`;

export default function SearchBox({ setVideos }) {

  const [q, setQ] = React.useState(``);

  const onSearchButtonClick = async (e) => {
    e.preventDefault();
    setVideos({ data: [], loading: true });
    const res = await axios(`${SERVER_URL}/search/${q}`);
    setVideos({ data: res.data, loading: false });
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setQ(e.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{ m: 2, display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search YouTube Videos"
        inputProps={{ 'aria-label': 'search youtube videos' }}
        value={q}
        onChange={onInputChange}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={onSearchButtonClick}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
