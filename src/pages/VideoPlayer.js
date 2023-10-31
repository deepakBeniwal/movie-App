import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { fetchMovieDetails } from '../services/apiHandler';
import MovieInfo from '../components/Movies/MovieInfo';
import SideArrow from '../components/UI/SideArrow';
import './VideoPlayer.css';
function MovieSearch() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [isArrowClicked, setArrowClicked] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieType = 'popular';
                const data = await fetchMovieDetails(movieType);
                setPopularMovies(data.results);
                setLoading(false);
                // Automatically get a random popular movie trailer when the site is loaded
                handleRandomMovie();
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRandomMovie = () => {
        if (popularMovies.length > 0) {
            const randomIndex = Math.floor(Math.random() * popularMovies.length);
            const randomMovie = popularMovies[randomIndex];
            handleViewTrailer(randomMovie.id);
        }
    };

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

    return (
        <div>
            {selectedMovie && (
                <div className="video-container">
                    <ReactPlayer
                        id="youtube-player"
                        loop
                        playing
                        url={`https://www.youtube-nocookie.com/embed/${selectedMovie.trailer.key}?autoplay=1&modestbranding=1&fs=0`}
                        controls={false}
                        width="100%"
                        height="100%"
                    />
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
