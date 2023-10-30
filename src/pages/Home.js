import React from 'react';
import Cards from '../components/Cards/Cards';
import Videojs from './video.js';
import { Media, Video } from '@vidstack/player-react';
import MovieSearch from './MovieSearch';
const videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    width: 720,
    height: 300,
    controls: true,
    sources: [
        {
            src: 'https://www.imdb.com/video/vi2654062361/?listId=ls053181649&ref_=ext_shr_lnk',
            type: 'video/mp4'
        }
    ]
};

const Home = () => {
    return (
        <div>
          <MovieSearch/>

            <Cards />
        </div>
    );
};

export default Home;
