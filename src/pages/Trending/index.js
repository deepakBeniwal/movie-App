import React from 'react';
import Movies from '../../components/Movies';
import TVShows from '../../components/TVShows';
import Navbar from '../../components/Menu';

const Trending = () => {
    return (
        <div>
            <Navbar />
            <Movies />
            <TVShows />
        </div>
    );
};

export default Trending;
