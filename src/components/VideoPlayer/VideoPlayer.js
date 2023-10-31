import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { fetchMovieDetails } from '../../services/apiHandler';
import MovieInfo from '../Movies/MovieInfo';
import SideArrow from '../UI/SideArrow';
import './VideoPlayer.css'
import Button from 'react-bootstrap/Button';

function MovieSearch() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [isArrowClicked, setArrowClicked] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieType = 'popular';
                const data = await fetchMovieDetails(movieType);
                setPopularMovies(data.results);
                setLoading(false);
                // Automatically get a random popular movie trailer when the site is loaded
                // handleRandomMovie();
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Consolidate handleRandomMovie and handleViewTrailer into a single useEffect
        if (popularMovies.length > 0) {
            const randomIndex = Math.floor(Math.random() * popularMovies.length);
            const randomMovie = popularMovies[randomIndex];
            if (randomMovie) {
                handleViewTrailer(randomMovie?.id);
            }
        }
    }, [popularMovies, apiKey]);

    const handleViewTrailer = async (movieId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`);
            const videos = response.data.videos.results;
            const trailer = videos.find((video) => video.type === 'Trailer');
            if (trailer) {
                setSelectedMovie({ ...response.data, trailer });
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    const handleArrowClick = () => {
        setArrowClicked(!isArrowClicked);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <div>
            {selectedMovie?.trailer && (
                <div className="video-container" style={{ position: 'relative' }}>
                    <ReactPlayer
                        id="youtube-player"
                        loop
                        playing={true}
                        muted={isMuted}
                        url={`https://www.youtube-nocookie.com/embed/${selectedMovie?.trailer.key}&modestbranding=1&fs=0`}
                        controls={false}
                        width="100%"
                        height="100%"
                    />
                    <Button
                        variant="primary"
                        onClick={toggleMute}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: '#fff',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <i className={`fa fa-${isMuted ? 'volume-off' : 'volume-up'}`} />
                    </Button>

                    <div onClick={handleArrowClick}>
                        <SideArrow />
                    </div>
                    {isArrowClicked && (
                        <MovieInfo
                            title={selectedMovie.title}
                            description={selectedMovie.overview}
                            rating={selectedMovie.vote_average}
                            year={selectedMovie.release_date}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default MovieSearch;
