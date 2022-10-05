import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Collapse, Divider, List, ListItem, ListItemText, Paper, Stack, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import Siriwave from 'react-siriwave';
import { TransitionGroup } from 'react-transition-group';
import VoiceInputIconBtn from './VoiceInputIconBtn';

export default function SearchBox() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [suggestions, setSuggestions] = useState(JSON.parse(localStorage.qHistory || '[]'));
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [voiceInput, setVoiceInput] = useState(false);
  const inputElement = useRef(null);

  const setFocus = () => {
    if (inputElement.current) {
      inputElement.current.children[0].focus();
    }
  };

  useEffect(() => {
    localStorage.qHistory = JSON.stringify(suggestions);
  }, [suggestions]);

  const updateSuggestions = (q) => {
    setSuggestions(prev => ([...prev.filter(x => x.q !== q), { q, t: dayjs().unix() }]));
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
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" disabled={q.length === 0}>
          <SearchIcon />
        </IconButton>
        <InputBase
          ref={inputElement}
          sx={{ ml: 1 }}
          fullWidth
          placeholder="Search YouTube Videos"
          inputProps={{ 'aria-label': 'search youtube videos' }}
          value={voiceInput ? interimTranscript : q}
          onChange={onInputChange}
          onBlur={onSearchBoxBlur}
          onClick={() => setSuggestOpen(true)}
          componentsProps={{
            input: {
              style: { fontStyle: voiceInput ? 'italic' : 'normal', color: voiceInput ? theme.palette.grey[400] : theme.palette.text.primary },
            }
          }}
        />
        <VoiceInputIconBtn setQ={setQ} setInterimTranscript={setInterimTranscript} voiceInput={voiceInput} setVoiceInput={setVoiceInput} setFocus={setFocus} />
      </Box>
      <Collapse in={voiceInput}>
        <Divider />
        {/* <Typography sx={{ textAlign: 'center', minHeight: 25, visibility: interimTranscript ? 'visible' : 'hidden' }}><i>{interimTranscript}</i></Typography> */}
        <Siriwave
          color={theme.palette.primary.main}
          cover={true}
          speed={0.075}
          ratio={1}
          amplitude={0.5}
        />
      </Collapse>
      {suggestions.length > 0 &&
        <Collapse in={suggestOpen}>
          <Stack sx={{ m: 0.25, textAlign: 'start' }}>
            <Divider />
            <List >
              <TransitionGroup>
                {suggestions?.sort((a, b) => b.t - a.t).map(({ q }) => (
                  <Collapse key={q}>
                    <Stack direction={'row'} >
                      <ListItem button dense onMouseDown={(e) => onSuggestionClick(e, q)}>
                        <ListItemText>{q}</ListItemText>
                      </ListItem>
                      <IconButton aria-label="delete" size='small' onMouseDown={(e) => onSuggestionDeleteClick(e, q)}>
                        <ClearIcon />
                      </IconButton>
                    </Stack>
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </Stack>
        </Collapse>
      }
      {/* <Drawer PaperProps={{ sx: { height: '30vh', justifyContent: 'center' } }} anchor={'bottom'} open={voiceInput} onClose={() => setVoiceInput(false)}>
        <Typography sx={{ textAlign: 'center' }}><i>{interimTranscript}</i></Typography>
        <Siriwave
          color={theme.palette.primary.main}
          cover={true}
          speed={0.075}
          ratio={1}
          amplitude={0.5}
        />
      </Drawer> */}
    </Paper >
  );
}
