import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { Paper } from '@mui/material';
import * as React from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';

export default function SearchBox() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [q, setQ] = React.useState(searchParams.get('q') || '');

  const onSearchButtonClick = (e) => {
    e.preventDefault();
    navigate({ pathname: '/search', search: `?${createSearchParams({ q })}` });
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
