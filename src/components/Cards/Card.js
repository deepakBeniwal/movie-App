import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../services/apiHandler';
import './Card.css';
import SwiperComponent from '../Swiper/Swiper';

const Card = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieType = 'popular';
                const data = await fetchMovieDetails(movieType);
                setPopularMovies(data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="card-container">
            <h2>Popular Movies</h2>
            {loading ? <p>Loading...</p> : <SwiperComponent movies={popularMovies} />}
        </div>
    );
};

export default Card;
