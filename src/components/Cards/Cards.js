import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { fetchMovieDetails } from '../../services/apiHandler';

const PopularMovies = () => {
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

    const swiperParams = {
        spaceBetween: 20,
        slidesPerView: 3,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    };

    return (
        <div>
            <h2>Popular Movies</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Swiper {...swiperParams}>
                    {popularMovies.map((movie) => (
                        <SwiperSlide key={movie.id} className="movie-card">
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                            {movie.poster_path ? (
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            ) : (
                                <p>No poster available</p>
                            )}
                        </SwiperSlide>
                    ))}
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </Swiper>
            )}
        </div>
    );
};

export default PopularMovies;
