import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './screens/Home';
import Films from './screens/Films';
import Companies from './screens/Companies';




function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
