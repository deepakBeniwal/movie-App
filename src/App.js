import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AllMovies from './pages/AllMovies';
import AllTvShows from './pages/AllTvShows';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/movies" element={<AllMovies />} />
                <Route path="/tv-shows" exact element={<AllTvShows />} />
                <Route path="/" exact element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
