import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SliderComponent from '../../components/Slider';
import Navbar from '../../components/Menu';

const AllTVShows = () => {
    const [tvShowsByGenre, setTVShowsByGenre] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTVShowsByGenre = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY; // Replace with your TMDb API key

                // Fetch TV show genres
                const genresResponse = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`);
                const genres = genresResponse.data.genres;

                const dataByGenre = {};

                for (const genre of genres) {
                    // Fetch TV shows for each genre
                    const tvShowsResponse = await axios.get(`https://api.themoviedb.org/3/discover/tv`, {
                        params: {
                            api_key: apiKey,
                            with_genres: genre.id,
                            sort_by: 'popularity.desc',
                        },
                    });
                    const tvShows = tvShowsResponse.data.results;

                    dataByGenre[genre.id] = {
                        name: genre.name,
                        tvShows: tvShows.map((show) => (show)),
                    };
                }

                setTVShowsByGenre(dataByGenre);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTVShowsByGenre();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="tv-show-genres-container">
            <Navbar />
            {Object.values(tvShowsByGenre).map((genreData) => (
                
                <div key={genreData.name}>
                    <h2>{genreData.name} TV Shows</h2>
                    <SliderComponent movies={genreData.tvShows} /> {/* Pass the TV shows as a prop to SliderComponent */}
                </div>
            ))}
        </div>
    );
};

export default AllTVShows;
