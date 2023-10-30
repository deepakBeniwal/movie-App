import React from 'react';
import MovieSearch from './MovieSearch';
import Movies from '../components/Movies/Movies';
import TVShows from '../components/TVShows/TVShows';

const Home = () => {
    return (
        <div>
            <MovieSearch />
            <Movies />
            <TVShows />
        </div>
    );
};

export default Home;
