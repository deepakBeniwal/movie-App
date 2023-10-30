import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { fetchMovieDetails } from '../services/apiHandler';

function MovieSearch() {
    const apiKey = process.env.REACT_APP_API_KEY;
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
            // Get a random index to select a random popular movie
            const randomIndex = Math.floor(Math.random() * popularMovies.length);
            const randomMovie = popularMovies[randomIndex];

            // Fetch the trailer for the random movie
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

    return (
        <div>
            {selectedMovie && (
                <div className="video-container">
                    <div
                        style={{
                            position: 'relative',
                            paddingTop: '56.25%' // 16:9 aspect ratio
                        }}
                    >
                        <ReactPlayer
                            playing
                            url={`https://www.youtube.com/watch?v=${selectedMovie.trailer.key}`}
                            controls={false}
                            width="100%"
                            height="100%"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieSearch;
