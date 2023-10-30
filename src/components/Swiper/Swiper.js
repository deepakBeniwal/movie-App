import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import './Swiper.css';
const SwiperComponent = ({ movies }) => {
    return (
        <Swiper spaceBetween={10} slidesPerView={5} navigation={true} modules={[Navigation]}>
            {movies.map((movie) => (
                <SwiperSlide key={movie.id} className="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperComponent;
