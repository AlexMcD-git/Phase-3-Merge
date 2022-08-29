import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './NavBar';
import HeroList from './HeroList';
import Graveyard from './Graveyard';
import HeroForm from './HeroForm';

function App() {


  return (
  <>
    <NavBar/>
      <Routes>
        <Route exact path = '/' element={<HeroList/>}/>
        <Route exact path = '/graveyard' element={<Graveyard/>}/>
        <Route exact path = '/custom' element={<HeroForm/>}/>
      </Routes>

  </>
  )
}

export default App;
