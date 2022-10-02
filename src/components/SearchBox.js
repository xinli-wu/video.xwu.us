import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, Drawer, List, ListItem, ListItemText, Paper, Stack, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import Siriwave from 'react-siriwave';
import VoiceInput from './VoiceInput';

export default function SearchBox() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState(JSON.parse(localStorage.qHistory || '[]'));
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [voiceInput, setVoiceInput] = useState(false);
  const inputElement = useRef(null);

  const setFocus = () => {
    if (inputElement.current) {
      inputElement.current.children[0].focus();
    }
  };

  // useEffect(() => {
  //   console.log('localStorage.qHistory', suggestions);
  //   localStorage.qHistory = JSON.stringify(suggestions);
  // }, [suggestions]);

  const updateSuggestions = (q) => {
    setSuggestions(prev => ([...prev.filter(x => x.q !== q), { q, t: dayjs().unix() }]));
    // localStorage.qHistory = JSON.stringify(suggestions);
    localStorage.setItem('qHistory', JSON.stringify(suggestions));
    navigate({ pathname: '/search', search: `?${createSearchParams({ q })}` }, { state: { q } });
  };

  const onQSubmit = (e) => {
    e.preventDefault();
    updateSuggestions(q);
    setSuggestOpen(false);
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setQ(e.target.value);
  };

  const onSuggestionClick = (e, q) => {
    e.preventDefault();
    if (e.type === 'mousedown') {
      setQ(q);
      updateSuggestions(q);
      navigate({ pathname: '/search', search: `?${createSearchParams({ q })}` });
    }
    setSuggestOpen(false);
  };

  const onSearchBoxBlur = (e) => {
    e.preventDefault();
    setSuggestOpen(false);
  };

  const onSuggestionDeleteClick = (e, q) => {
    e.preventDefault();
    e.stopPropagation();
    setSuggestions(prev => ([...prev.filter(x => x.q !== q)]));
  };

  return (
    <Paper component="form" sx={{ m: 2 }} onSubmit={onQSubmit}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <VoiceInput setQ={setQ} voiceInput={voiceInput} setVoiceInput={setVoiceInput} setFocus={setFocus} />
        <InputBase
          ref={inputElement}
          sx={{ ml: 1 }}
          fullWidth
          placeholder="Search YouTube Videos"
          inputProps={{ 'aria-label': 'search youtube videos' }}
          value={q}
          onChange={onInputChange}
          onBlur={onSearchBoxBlur}
          onClick={() => setSuggestOpen(true)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" disabled={q.length === 0}>
          <SearchIcon />
        </IconButton>
      </Box>
      {suggestions.length > 0 &&
        <Stack sx={{ m: 1, textAlign: 'start', display: suggestOpen ? 'contents' : 'none' }}>
          <Divider />
          <List >
            {suggestions?.sort((a, b) => b.t - a.t).map((x, i) => (
              <Stack direction={'row'} key={i} >
                <ListItem button dense onMouseDown={(e) => onSuggestionClick(e, x.q)}>
                  <ListItemText>{x.q}</ListItemText>
                </ListItem>
                <IconButton aria-label="delete" size='small' onMouseDown={(e) => onSuggestionDeleteClick(e, x.q)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Stack>
            ))}
          </List>
        </Stack>
      }
      <Drawer anchor={'bottom'} open={voiceInput} onClose={() => setVoiceInput(false)}>
        <Siriwave
          color={theme.palette.primary.main}
          cover={true}
          speed={0.075}
          ratio={1}
          amplitude={0.75}
        />
      </Drawer>
    </Paper>
  );
}
