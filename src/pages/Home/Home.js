import React from 'react';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Movies from '../../components/Movies/Movies';
import TVShows from '../../components/TVShows/TVShows';
import Navbar from '../../components/Menu/Navbar';

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
