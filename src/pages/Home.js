import React from 'react';
import VideoPlayer from './VideoPlayer';
import Movies from '../components/Movies/Movies';
import TVShows from '../components/TVShows/TVShows';

const Home = () => {
    return (
        <div>
            <VideoPlayer />
            <Movies />
            <TVShows />
        </div>
    );
};

export default Home;
