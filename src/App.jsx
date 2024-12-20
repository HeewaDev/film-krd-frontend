import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './screens/Home';
import Films from './screens/Films';
import Companies from './screens/Companies';
import Casts from './screens/Casts';
import Crew from './screens/Crew';
import NotFound from './screens/NotFound';
import Film from './screens/Film';
import Cast from './screens/Cast';
import Company from './screens/Company';
import Shootinglocations from './screens/shootinglocations';
import ShootingLocation from './screens/ShootingLocation';
Shootinglocations



function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<Films />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:id" element={<Company />} />
        <Route path="/casts" element={<Casts />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/films/:id" element={<Film  />} />
        <Route path="/casts/:id" element={<Cast  />} />
        <Route path="/shootinglocations" element={<Shootinglocations />} />
        <Route path="/locations/:id" element={<ShootingLocation  />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
