import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Home from 'pages/Home';
import SearchResult from 'pages/SearchResult';
import Watch from 'pages/Watch';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import ColorModeSwitch from 'components/ColorModeSwitch';
import { ColorModeContext } from 'contexts/utilContext';
import './App.css';
import BackBtn from 'components/BackBtn';

function App() {

  const preferedMode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';

  const [mode, setMode] = React.useState(preferedMode);

  React.useEffect(() => setMode(preferedMode), [preferedMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          // @ts-ignore
          mode
        },
      }),
    [mode],
  );

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <ColorModeContext.Provider value={colorMode}>
          <CssBaseline />
          <BackBtn />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="/watch" element={<Watch />} />
          </Routes>
          <ColorModeSwitch />
        </ColorModeContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
