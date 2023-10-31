import React from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import Movies from '../../components/Movies';
import TVShows from '../../components/TVShows';
import Navbar from '../../components/Menu';

const Home = () => {
    return (
        <div>
            <Navbar />
            <VideoPlayer />
            <Movies />
            <TVShows />
        </div>
    );
};

export default Home;
