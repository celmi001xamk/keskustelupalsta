import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Etusivu } from "./components/Etusivu";
import { UusiKeskustelu } from "./components/UusiKeskustelu";
import { TiettyKeskustelu } from './components/TiettyKeskustelu';

const App: React.FC = (): React.ReactElement => {

  return (
    <Container maxWidth="md">

      <Typography variant="h3" align="center">Keskustelupalsta</Typography>

      <Routes>
        <Route path="/" element={<Etusivu />} />
        <Route path="/uusiKeskustelu" element={<UusiKeskustelu />} />
        <Route path="/tiettyKeskustelu" element={<TiettyKeskustelu />} />
      </Routes>


    </Container>
  );
}

export default App;
