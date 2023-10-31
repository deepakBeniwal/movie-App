import React, { useEffect, useState } from 'react';
import { fetchMovieGenres } from '../../services/apiHandler';
import axios from 'axios';
import SliderComponent from '../../components/Slider';
import Navbar from '../../components/Menu';


const AllMovies = () => {
    const [moviesByGenre, setMoviesByGenre] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataByGenre = async () => {
            try {
                const genresResponse = await fetchMovieGenres(); // Fetch movie genres
                const genres = genresResponse.genres;

                const dataByGenre = {};

                for (const genre of genres) {
                    const moviesResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
                        params: {
                            api_key: process.env.REACT_APP_API_KEY, // Replace with your TMDb API key
                            with_genres: genre.id,
                            sort_by: 'popularity.desc',
                        },
                    });
                    const movies = moviesResponse.data.results;

                    dataByGenre[genre.id] = {
                        name: genre.name,
                        movies: movies.map((movie) => ({
                            id: movie.id,
                            title: movie.title,
                            posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                        })),
                    };
                }

                setMoviesByGenre(dataByGenre);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDataByGenre();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="movie-genres-container">
            <Navbar></Navbar>
            {Object.values(moviesByGenre).map((genreData) => (
                <div key={genreData.name}>
                    <h2>{genreData.name} Movies</h2>
                    <SliderComponent movies={genreData.movies} /> {/* Pass the movies as a prop to SliderComponent */}
                </div>
            ))}
        </div>
    );
};

export default AllMovies;
