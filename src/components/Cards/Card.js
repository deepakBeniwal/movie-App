import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../services/apiHandler';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import './Card.css';

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
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Swiper spaceBetween={10} slidesPerView={5} navigation={true} modules={[Navigation]}>
                    {popularMovies.map((movie) => (
                        <SwiperSlide key={movie.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default Card;
