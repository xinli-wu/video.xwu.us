import Home from 'pages/Home';
import SearchResult from 'pages/SearchResult';
import Watch from 'pages/Watch';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </div>
  );
}

export default App;
