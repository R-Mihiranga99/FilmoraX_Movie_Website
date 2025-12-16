import React from 'react';
import {Routes, Route} from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar/navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { MovieProvider } from './contexts/MovieContext';
import MovieDetails from './components/MovieList/MovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import SettingsPage from './pages/Settings';
import ProfilePage from './pages/Profile';

function App() {
  return (
    <MovieProvider>
      
      <main className='app'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
